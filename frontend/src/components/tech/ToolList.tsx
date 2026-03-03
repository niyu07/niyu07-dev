import { FaReact, FaGitAlt, FaGithub, FaDocker, FaLinux } from "react-icons/fa";
import {
  SiVite,
  SiTailwindcss,
  SiAndroidstudio,
  SiMarkdown,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export default function ToolList() {
  const tools = [
    {
      name: "React",
      years: 1,
      scene: "個人開発",
      icon: (
        <FaReact
          className="text-sky-400 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Vite",
      years: 1,
      scene: "個人開発",
      icon: (
        <SiVite
          className="text-purple-500 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Tailwind CSS",
      years: 1,
      scene: "個人開発",
      icon: (
        <SiTailwindcss
          className="text-cyan-400 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Git",
      years: 3,
      scene: "個人開発・チーム開発・業務委託・インターンシップ",
      icon: (
        <FaGitAlt
          className="text-orange-600 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    // 他ツールも追加可能
    {
      name: "GitHub",
      years: 3,
      scene: "個人開発・チーム開発・業務委託・インターンシップ",
      icon: (
        <FaGithub
          className="text-gray-800 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "VSCode",
      years: 3,
      scene: "個人開発・授業・アルバイト",
      icon: (
        <VscVscode
          className="text-blue-500 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Android Studio",
      years: 2,
      scene: "業務委託・授業・個人開発",
      icon: (
        <SiAndroidstudio
          className="text-green-500 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Docker",
      years: 1,
      scene: "個人開発",
      icon: (
        <FaDocker
          className="text-blue-400 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Linux",
      years: 2,
      scene: "授業・個人開発",
      icon: (
        <FaLinux
          className="text-gray-700 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
    {
      name: "Markdown",
      years: 3,
      scene: "個人開発・ドキュメント作成",
      icon: (
        <SiMarkdown
          className="text-gray-800 text-5xl"
          aria-hidden="true"
          focusable={false}
        />
      ),
    },
  ];
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">ツール</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white/80 rounded-2xl p-6 flex items-center gap-4"
          >
            {tool.icon}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-700 text-sm mb-1">
                経験年数: {tool.years}年
              </p>
              <p className="text-gray-700 text-sm">{tool.scene}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
