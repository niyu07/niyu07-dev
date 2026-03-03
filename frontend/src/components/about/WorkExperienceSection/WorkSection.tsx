const works = [
  {
    type: "アルバイト",
    title: "スタートプログラミング",
    period: "2023年10月〜現在",
    desc: "プログラミングスクールで講師のアルバイトをしています。",
    color: "orange",
  },
  {
    type: "業務委託",
    title: "教材開発",
    period: "2025年06月〜現在",
    desc: "スタートプログラミングの業務委託として、プログラミングスクールの教材開発に携わっています。",
    color: "blue",
  },
  {
    type: "業務委託",
    title: "Androidアプリ開発",
    period: "2025年02月〜現在",
    desc: "Androidアプリの開発に携わっています。主にKotlinとJetpack Composeを用いてUIを開発しています。",
    color: "purple",
  },
];

const colorMap: Record<
  string,
  { gradient: string; border: string; badge: string }
> = {
  orange: {
    gradient: "from-orange-500/20 to-orange-600/20",
    border: "border-orange-500/30",
    badge: "bg-orange-500",
  },
  blue: {
    gradient: "from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/30",
    badge: "bg-blue-500",
  },
  purple: {
    gradient: "from-purple-500/20 to-purple-600/20",
    border: "border-purple-500/30",
    badge: "bg-purple-500",
  },
};

export default function WorkSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
        職歴・活動
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => {
          const c = colorMap[work.color];
          return (
            <div
              key={`${work.title}-${work.period}`}
              className={`bg-gradient-to-br ${c.gradient} border ${c.border} rounded-2xl p-6 hover:scale-105 transition-transform`}
            >
              <span
                className={`inline-block ${c.badge} text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold`}
              >
                {work.type}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                {work.title}
              </h3>
              <p className="text-white/70 text-sm mb-3">{work.period}</p>
              <p className="text-white/80 text-sm leading-relaxed">
                {work.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
