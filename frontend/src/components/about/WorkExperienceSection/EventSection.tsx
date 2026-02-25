const events = [
  {
    date: "2023.11.25",
    title: "セキュリティ・ミニキャンプ in 広島 2023",
    type: "参加",
    desc: "広島で開催されたセキュリティの勉強イベントに参加し、実践的な講義や演習を体験しました。",
  },
  {
    date: "2024.02.03",
    title: "塩尻サイバーセキュリティ勉強会2024年冬 in 塩尻",
    type: "参加",
  },
  {
    date: "2025.03.15",
    title: "P3NFEST 2025 Winter",
    type: "参加",
  },
  {
    date: "2025.03.16",
    title: "第2回 セキュリティ若手の会（LT&交流会）",
    type: "参加",
  },
  { date: "2025.03.22", title: "Setory", type: "参加" },
  {
    date: "2025.05.03",
    title: "第2回広島ITイノベーションフェスタ",
    type: "登壇",
  },
  {
    date: "2025.05.29",
    title: "のみぞうさんと2時間でハッキングをはじめよう",
    type: "参加",
  },
  { date: "2025.06.07", title: "Mini P3NFEST", type: "参加" },
  {
    date: "2025.06.26",
    title: "NFLabs. Purple Flair Workshop #1",
    type: "参加",
  },
  {
    date: "2025.10.25",
    title: "セキュリティミニキャンプ in Hiroshima 2025",
    type: "参加",
  },
  {
    date: "2025.12.06",
    title: "Setory vol.3",
    type: "運営",
  },
  {
    date: "2026.02.11 ~ 02.13",
    title: "JANOG 57 in OSAKA",
    type: "参加",
  },
  {
    date: "2026.02.22",
    title: "KC3Hack 2026",
    type: "メンター",
  },
];

export default function EventSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
        イベント参加歴
      </h2>
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white transition-all"
          >
            <div className="flex items-start gap-4">
              <span
                className={`inline-block text-white text-xs px-3 py-1 rounded-full font-semibold shrink-0 ${
                  event.type === "登壇"
                    ? "bg-red-500"
                    : event.type === "運営"
                      ? "bg-purple-500"
                      : event.type === "メンター"
                        ? "bg-blue-500"
                        : "bg-green-500"
                }`}
              >
                {event.type}
              </span>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-1">{event.date}</p>
                <h3 className="text-gray-900 font-bold text-lg">
                  {event.title}
                </h3>
                {event.desc && (
                  <p className="text-gray-800 text-sm">{event.desc}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
