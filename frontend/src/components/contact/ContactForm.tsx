import { useEffect, useRef, useState } from "react";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

type ContactResponse = {
  error?: string;
};

type TurnstileApi = {
  render: (
    selector: string,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();

  useEffect(() => {
    const container = turnstileContainer.current;
    if (!container || !turnstileSiteKey) return;

    let cancelled = false;
    let script = document.getElementById(
      "cloudflare-turnstile-script",
    ) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (cancelled || !window.turnstile || turnstileWidgetId.current) return;

      try {
        turnstileWidgetId.current = window.turnstile.render(
          "#contact-turnstile",
          {
            sitekey: turnstileSiteKey,
            action: "contact",
            callback: (token) => {
              setTurnstileToken(token);
              setTurnstileError(false);
            },
            "expired-callback": () => setTurnstileToken(""),
            "error-callback": () => {
              setTurnstileToken("");
              setTurnstileError(true);
            },
          },
        );
        setTurnstileReady(true);
      } catch {
        setTurnstileError(true);
      }
    };

    const handleScriptError = () => setTurnstileError(true);
    if (!script) {
      script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", renderWidget);
    script.addEventListener("error", handleScriptError);
    if (window.turnstile) renderWidget();

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
      script?.removeEventListener("error", handleScriptError);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    const apiUrl = import.meta.env.VITE_CONTACT_API_URL?.trim();
    if (!apiUrl) {
      setErrorMessage(
        "送信機能の設定が完了していません。時間をおいて再度お試しください。",
      );
      return;
    }
    if (!turnstileSiteKey || !turnstileToken || !turnstileReady) {
      setErrorMessage("送信前にボット対策の認証を完了してください。");
      return;
    }

    setSending(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website, turnstileToken }),
      });

      if (!response.ok) {
        let body: ContactResponse = {};
        try {
          body = (await response.json()) as ContactResponse;
        } catch {
          // Use a generic message if the API does not return JSON.
        }
        throw new Error(
          body.error ?? "送信に失敗しました。時間をおいて再度お試しください。",
        );
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setStatusMessage("送信しました。お問い合わせありがとうございます。");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      );
    } finally {
      if (turnstileToken) {
        setTurnstileToken("");
        if (turnstileWidgetId.current) {
          window.turnstile?.reset(turnstileWidgetId.current);
        }
      }
      setSending(false);
    }
  };

  return (
    <div className="bg-white border rounded-3xl p-8 md:p-12 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        メッセージを送る
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="contact-name"
          >
            お名前
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            placeholder="山田 太郎"
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="contact-email"
          >
            メールアドレス
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            placeholder="example@example.com"
            autoComplete="email"
            maxLength={MAX_EMAIL_LENGTH}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="contact-message"
          >
            メッセージ
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            placeholder="お問い合わせ内容"
            rows={6}
            maxLength={MAX_MESSAGE_LENGTH}
            required
          />
        </div>

        <div
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="contact-website">
            この欄には入力しないでください
          </label>
          <input
            id="contact-website"
            name="website"
            type="text"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <p className="block text-gray-700 font-semibold mb-2">
            ボット対策の確認
          </p>
          {turnstileSiteKey ? (
            <div id="contact-turnstile" ref={turnstileContainer} />
          ) : (
            <p className="text-sm text-gray-600">
              認証機能の設定が完了していません。
            </p>
          )}
          {turnstileError && (
            <p className="text-sm text-red-600" role="alert">
              認証を読み込めません。ページを再読み込みしてください。
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending || !turnstileReady || !turnstileToken}
          className="px-8 py-3 bg-sky-400 hover:bg-sky-500 text-white rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "送信中..." : "送信"}
        </button>
        {statusMessage && (
          <p className="text-green-700" role="status" aria-live="polite">
            {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
