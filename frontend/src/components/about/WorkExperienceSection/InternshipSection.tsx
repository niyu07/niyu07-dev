const internships = [
  {
    date: "2025.05.31",
    company: "Docomo",
    desc: "ドコモグループのセキュリティ業務と、フィッシングサイトの仕組みについて学びました。",
  },
  {
    date: "2025.07.05",
    company: "CyberAgent",
    desc: "データセンタの見学や実際にサーバーやスイッチを触ってネットワークについて学びました。",
  },
  {
    date: "2025.08.16 ~ 08.29",
    company: "チームラボ株式会社",
    desc: "スマホアプリエンジニアとしてサマーインターンに参加させていただきました。",
  },
  {
    date: "2025.08.30",
    company: "株式会社ジーニー",
    desc: "Webアプリケーションの実装課題に取り組みました。",
  },
  {
    date: "2025.09.04 ~ 09.05",
    company: "株式会社エネコム",
    desc: "二日間でネットワーク部門とシステム部門の仕事体験をしました。",
    type: "仕事体験",
  },
  {
    date: "2025.09.17",
    company: "株式会社インターネットイニシアティブ",
    desc: "オンラインのセキュリティ概論に参加しました。",
  },
  {
    date: "2025.10.27",
    company: "株式会社インターネットイニシアティブ",
    desc: "SOCの見学とエンジニアの方と交流しました。",
  },
  {
    date: "2025.11.09",
    company: "株式会社エヌ・ティ・ティエムイー",
    desc: "ネットワークをゲーム形式で学びました。",
  },
  {
    date: "2026.02.15 ~ 02.17, 02.18 ~ 02.20",
    company: "株式会社エヌ・ティ・ティエムイー",
    desc: "いろいろなネットワークに関することを学びました。",
  },
];

export default function InternshipSection() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
        インターンシップ
      </h2>
      <div className="space-y-4">
        {internships.map((intern, idx) => (
          <div
            key={idx}
            className="bg-white border border-white rounded-2xl p-6 transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shrink-0">
                {intern.type || "インターン"}
              </span>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">{intern.date}</p>
                <h3 className="text-gray-900 font-bold text-lg mb-2">
                  {intern.company}
                </h3>
                {intern.desc && (
                  <p className="text-gray-800 text-sm">{intern.desc}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
