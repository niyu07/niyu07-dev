export default function SkillList() {
  const skills = [
    { name: "HTML5/CSS", years: 3, scene: "個人開発・アルバイト" },
    { name: "JavaScript", years: 2, scene: "個人開発・アルバイト" },
    { name: "Kotlin", years: 1, scene: "業務委託・インターンシップ" },
    { name: "Python", years: 3, scene: "個人開発・授業" },
    { name: "Java", years: 2, scene: "個人開発・授業" },
    { name: "TypeScript", years: 1, scene: "個人開発" },
    { name: "C/C++", years: 1, scene: "授業" },
    { name: "ShellScript", years: 1, scene: "個人開発" },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">スキル</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-white/80 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {skill.name}
            </h3>
            <p className="text-gray-700 text-sm mb-1">
              経験年数: {skill.years}年
            </p>
            <p className="text-gray-700 text-sm">{skill.scene}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
