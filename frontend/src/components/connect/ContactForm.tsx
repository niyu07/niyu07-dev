import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, [PUBLIC_KEY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMessage(null);

    emailjs
      .send(SERVICE_ID!, TEMPLATE_ID!, {
        name,
        email,
        message,
        from_name: name,
        from_email: email,
        reply_to: email,
      })
      .then(() => {
        alert("送信しました！");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => {
        setErrorMessage("送信に失敗しました");
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
        メッセージを送る
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-white font-semibold mb-2"
            htmlFor="contact-name"
          >
            お名前
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-xl p-4 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
            placeholder="山田 太郎"
            required
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-xl p-4 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
            placeholder="example@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            メッセージ
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-xl p-4 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
            placeholder="お問い合わせ内容"
            rows={6}
            required
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="px-8 py-3 bg-white/90 text-black rounded-full font-semibold hover:bg-white transition-all hover:scale-105 border-2 border-white/80"
        >
          {sending ? "送信中..." : "送信"}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
}
