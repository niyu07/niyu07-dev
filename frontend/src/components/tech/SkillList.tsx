import { FaHtml5, FaJs, FaPython, FaJava } from "react-icons/fa";
import { SiKotlin, SiTypescript, SiCplusplus } from "react-icons/si";
import { BsTerminalFill } from "react-icons/bs";

export default function SkillList() {
  const skills = [
    {
      name: "HTML5/CSS",
      years: 3,
      scene: "個人開発・アルバイト",
      icon: <FaHtml5 className="text-orange-500 text-5xl" aria-hidden="true" />,
    },
    {
      name: "JavaScript",
      years: 2,
      scene: "個人開発・アルバイト",
      icon: <FaJs className="text-yellow-400 text-5xl" aria-hidden="true" />,
    },
    {
      name: "Kotlin",
      years: 1,
      scene: "業務委託・インターンシップ",
      icon: (
        <SiKotlin className="text-purple-500 text-5xl" aria-hidden="true" />
      ),
    },
    {
      name: "Python",
      years: 3,
      scene: "個人開発・授業",
      icon: <FaPython className="text-blue-500 text-5xl" aria-hidden="true" />,
    },
    {
      name: "Java",
      years: 2,
      scene: "個人開発・授業",
      icon: <FaJava className="text-red-500 text-5xl" aria-hidden="true" />,
    },
    {
      name: "TypeScript",
      years: 1,
      scene: "個人開発",
      icon: (
        <SiTypescript className="text-blue-600 text-5xl" aria-hidden="true" />
      ),
    },
    {
      name: "C/C++",
      years: 1,
      scene: "授業",
      icon: (
        <SiCplusplus className="text-blue-700 text-5xl" aria-hidden="true" />
      ),
    },
    {
      name: "ShellScript",
      years: 1,
      scene: "個人開発",
      icon: (
        <BsTerminalFill className="text-gray-700 text-5xl" aria-hidden="true" />
      ),
    },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">言語</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-white/80 rounded-2xl p-6 flex items-center gap-4"
          >
            {skill.icon}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {skill.name}
              </h3>
              <p className="text-gray-700 text-sm mb-1">
                経験年数: {skill.years}年
              </p>
              <p className="text-gray-700 text-sm">{skill.scene}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
