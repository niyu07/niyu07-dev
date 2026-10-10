const MAX_REQUEST_BYTES = 24 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

type Env = Cloudflare.Env & {
  TURNSTILE_SECRET_KEY?: string;
  EMAILJS_SERVICE_ID?: string;
  EMAILJS_TEMPLATE_ID?: string;
  EMAILJS_PUBLIC_KEY?: string;
  EMAILJS_PRIVATE_KEY?: string;
};

interface ContactInput {
  name: string;
  email: string;
  message: string;
  website: string;
  turnstileToken: string;
}

const BASE_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function response(
  status: number,
  body: Record<string, string>,
  origin?: string,
): Response {
  const headers = new Headers(BASE_HEADERS);
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "600");
    headers.set("Vary", "Origin");
  }
  return new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers,
  });
}

function allowedRequestOrigin(request: Request, env: Env): string | null {
  const requestOrigin = request.headers.get("Origin");
  const configuredOrigin = env.ALLOWED_ORIGIN?.trim();
  if (!requestOrigin || !configuredOrigin) return null;

  try {
    const parsed = new URL(configuredOrigin);
    const isLocalDevelopment =
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");
    if (
      parsed.origin !== configuredOrigin ||
      (parsed.protocol !== "https:" && !isLocalDevelopment) ||
      requestOrigin !== configuredOrigin
    ) {
      return null;
    }
    return configuredOrigin;
  } catch {
    return null;
  }
}

async function readBoundedJson(
  request: Request,
): Promise<{ kind: "ok"; value: unknown } | { kind: "invalid" | "too-large" }> {
  const contentLength = Number(request.headers.get("Content-Length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return { kind: "too-large" };
  }

  if (!request.body) return { kind: "invalid" };
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { kind: "too-large" };
      }
      chunks.push(value.slice());
    }
  } catch {
    return { kind: "invalid" };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: false,
    }).decode(bytes);
    return { kind: "ok", value: JSON.parse(text) as unknown };
  } catch {
    return { kind: "invalid" };
  }
}

async function verifyTurnstile(
  token: string,
  secret: string | undefined,
  expectedHostname: string,
  remoteIp: string | undefined,
): Promise<boolean> {
  if (!secret || !token || token.length > 2_048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!verificationResponse.ok) return false;

    const result = (await verificationResponse.json()) as {
      success?: unknown;
      hostname?: unknown;
      action?: unknown;
    };
    return (
      result.success === true &&
      result.hostname === expectedHostname &&
      result.action === "contact"
    );
  } catch {
    return false;
  }
}

function validateContactInput(value: unknown): ContactInput | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const fields = value as Record<string, unknown>;
  if (
    typeof fields.name !== "string" ||
    typeof fields.email !== "string" ||
    typeof fields.message !== "string" ||
    typeof fields.website !== "string" ||
    typeof fields.turnstileToken !== "string"
  ) {
    return null;
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim().replace(/\r\n?/g, "\n");
  if (
    name.length === 0 ||
    name.length > MAX_NAME_LENGTH ||
    /[\u0000-\u001f\u007f]/.test(name) ||
    email.length === 0 ||
    email.length > MAX_EMAIL_LENGTH ||
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(
      email,
    ) ||
    message.length === 0 ||
    message.length > MAX_MESSAGE_LENGTH ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message) ||
    fields.turnstileToken.length > 2_048
  ) {
    return null;
  }

  return {
    name,
    email,
    message,
    website: fields.website.trim(),
    turnstileToken: fields.turnstileToken,
  };
}

async function handleContactRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname !== "/api/contact") {
    return response(404, { error: "Not found" });
  }

  if (request.method !== "POST" && request.method !== "OPTIONS") {
    return response(405, { error: "Method not allowed" });
  }

  const origin = allowedRequestOrigin(request, env);
  if (!origin) return response(403, { error: "Forbidden" });

  if (request.method === "OPTIONS") {
    return response(204, {}, origin);
  }

  if (
    !env.EMAILJS_SERVICE_ID?.trim() ||
    !env.EMAILJS_TEMPLATE_ID?.trim() ||
    !env.EMAILJS_PUBLIC_KEY?.trim() ||
    !env.EMAILJS_PRIVATE_KEY?.trim()
  ) {
    return response(503, { error: "Service unavailable" }, origin);
  }

  if (
    request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return response(
      415,
      { error: "Content type must be application/json" },
      origin,
    );
  }

  const clientIp = request.headers.get("CF-Connecting-IP")?.trim();
  const isLocalDevelopment =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (!clientIp && !isLocalDevelopment) {
    return response(503, { error: "Service unavailable" }, origin);
  }

  try {
    const { success } = await env.CONTACT_RATE_LIMITER.limit({
      key: `contact:${clientIp || "local-development"}`,
    });
    if (!success) {
      return response(
        429,
        { error: "送信回数の上限に達しました。時間をおいてお試しください。" },
        origin,
      );
    }
  } catch {
    // Fail closed if the anti-abuse binding is unavailable.
    return response(503, { error: "Service unavailable" }, origin);
  }

  const parsedBody = await readBoundedJson(request);
  if (parsedBody.kind === "too-large") {
    return response(413, { error: "Request is too large" }, origin);
  }
  if (parsedBody.kind !== "ok") {
    return response(400, { error: "Invalid request" }, origin);
  }

  const input = validateContactInput(parsedBody.value);
  if (!input) return response(400, { error: "Invalid request" }, origin);

  // Silently accept honeypot submissions without sending an email.
  if (input.website) return response(200, { ok: "true" }, origin);

  const expectedHostname = new URL(origin).hostname;
  const tokenIsValid = await verifyTurnstile(
    input.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    expectedHostname,
    clientIp,
  );
  if (!tokenIsValid) {
    return response(
      403,
      { error: "認証を確認できませんでした。再度お試しください。" },
      origin,
    );
  }

  try {
    const emailResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Match the EmailJS domain allowlist to the only accepted web origin.
          Origin: origin,
        },
        body: JSON.stringify({
          service_id: env.EMAILJS_SERVICE_ID,
          template_id: env.EMAILJS_TEMPLATE_ID,
          user_id: env.EMAILJS_PUBLIC_KEY,
          accessToken: env.EMAILJS_PRIVATE_KEY,
          // The recipient is fixed in EmailJS; never accept it from the request.
          template_params: {
            name: input.name,
            email: input.email,
            message: input.message,
            from_name: input.name,
            from_email: input.email,
            reply_to: input.email,
          },
        }),
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!emailResponse.ok) {
      // Record only the status, never the provider body or submitted fields.
      console.error("Contact email provider rejected request", emailResponse.status);
      throw new Error("Email provider rejected the request");
    }
    return response(200, { ok: "true" }, origin);
  } catch (error) {
    // Do not log submitted personal information or provider error details.
    console.error(
      "Contact email delivery failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return response(
      502,
      {
        error: "メールを送信できませんでした。時間をおいて再度お試しください。",
      },
      origin,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleContactRequest(request, env);
  },
};
