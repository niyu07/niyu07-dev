import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";

const siteverifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const emailjsUrl = "https://api.emailjs.com/api/v1.0/email/send";

function createEnv(rateLimitSuccess = true) {
  return {
    ALLOWED_ORIGIN: "https://niyu07.com",
    CONTACT_RATE_LIMITER: {
      limit: vi.fn(async () => ({ success: rateLimitSuccess })),
    },
    TURNSTILE_SECRET_KEY: "test-turnstile-secret",
    EMAILJS_SERVICE_ID: "test-service",
    EMAILJS_TEMPLATE_ID: "test-template",
    EMAILJS_PUBLIC_KEY: "test-public-key",
    EMAILJS_PRIVATE_KEY: "test-private-key",
  } as never;
}

function createRequest(
  overrides: Partial<{
    origin: string;
    body: Record<string, unknown>;
    contentType: string;
  }> = {},
) {
  const body = {
    name: "テスト利用者",
    email: "visitor@example.com",
    message: "お問い合わせ本文です。",
    website: "",
    turnstileToken: "test-turnstile-token",
    ...overrides.body,
  };

  return new Request("https://niyu07-contact-api.example.workers.dev/api/contact", {
    method: "POST",
    headers: {
      Origin: overrides.origin ?? "https://niyu07.com",
      "Content-Type": overrides.contentType ?? "application/json",
      "CF-Connecting-IP": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

describe("contact Worker", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) === siteverifyUrl) {
        return Response.json({
          success: true,
          hostname: "niyu07.com",
          action: "contact",
        });
      }
      if (String(input) === emailjsUrl) return new Response("OK", { status: 200 });
      throw new Error(`Unexpected outgoing request: ${String(input)}`);
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("verifies Turnstile before sending only the fixed EmailJS template", async () => {
    const response = await worker.fetch(createRequest(), createEnv());

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][0])).toBe(siteverifyUrl);
    expect(String(fetchMock.mock.calls[1][0])).toBe(emailjsUrl);
    expect(fetchMock.mock.calls[1][1]?.headers).toMatchObject({
      Origin: "https://niyu07.com",
    });

    const payload = JSON.parse(String(fetchMock.mock.calls[1][1]?.body));
    expect(payload).toMatchObject({
      service_id: "test-service",
      template_id: "test-template",
      user_id: "test-public-key",
      accessToken: "test-private-key",
      template_params: {
        name: "テスト利用者",
        email: "visitor@example.com",
        message: "お問い合わせ本文です。",
        reply_to: "visitor@example.com",
      },
    });
    expect(payload).not.toHaveProperty("to_email");
  });

  it("rejects a request from a different origin before outbound calls", async () => {
    const response = await worker.fetch(
      createRequest({ origin: "https://attacker.example" }),
      createEnv(),
    );

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects failed Turnstile verification without sending email", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ success: false, hostname: "niyu07.com", action: "contact" }),
    );

    const response = await worker.fetch(createRequest(), createEnv());

    expect(response.status).toBe(403);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toBe(siteverifyUrl);
  });

  it("rejects requests when the account rate limit is reached", async () => {
    const response = await worker.fetch(createRequest(), createEnv(false));

    expect(response.status).toBe(429);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when EmailJS authorization is not configured", async () => {
    const env = {
      ...(createEnv() as object),
      EMAILJS_PRIVATE_KEY: undefined,
    } as never;

    const response = await worker.fetch(createRequest(), env);

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not expose provider errors to the visitor", async () => {
    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      if (String(input) === siteverifyUrl) {
        return Response.json({
          success: true,
          hostname: "niyu07.com",
          action: "contact",
        });
      }
      return new Response("account secret in provider error", { status: 403 });
    });
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await worker.fetch(createRequest(), createEnv());

    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("account secret");
    expect(logSpy).toHaveBeenCalledWith("Contact email provider rejected request", 403);
    expect(logSpy).toHaveBeenCalledWith("Contact email delivery failed", "Error");
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain("account secret");
  });
});
