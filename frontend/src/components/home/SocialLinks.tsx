export default function SocialLinks() {
  const githubMark = new URL("../../assets/github-mark.svg", import.meta.url)
    .href;
  const xIcon = new URL("../../assets/x-icon.svg", import.meta.url).href;
  const qiitaIcon = new URL("../../assets/qiita-icon.svg", import.meta.url)
    .href;
  const zennIcon = new URL("../../assets/zenn-icon.svg", import.meta.url).href;

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          SNSでつながる
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* GitHub */}
          <a
            href="https://github.com/niyu07"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-gradient-to-br hover:from-sky-700 hover:to-sky-900 transition-all hover:scale-105">
              <img
                src={githubMark}
                alt="GitHub"
                className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <p className="text-white text-center font-semibold">GitHub</p>
            </div>
          </a>
          {/* X (Twitter) */}
          <a
            href="https://x.com/niyu98194"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-900 transition-all hover:scale-105">
              <img
                src={xIcon}
                alt="X"
                className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <p className="text-white text-center font-semibold">
                X (Twitter)
              </p>
            </div>
          </a>
          {/* Qiita */}
          <a
            href="https://qiita.com/niyu"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-gradient-to-br hover:from-green-700 hover:to-green-900 transition-all hover:scale-105">
              <img
                src={qiitaIcon}
                alt="Qiita"
                className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <p className="text-white text-center font-semibold">Qiita</p>
            </div>
          </a>
          {/* Zenn */}
          <a
            href="https://zenn.dev/niyu"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-900 transition-all hover:scale-105">
              <img
                src={zennIcon}
                alt="Zenn"
                className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <p className="text-white text-center font-semibold">Zenn</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
