import { Link } from "react-router-dom";

const profileIcon = new URL("../../assets/profile-icon.JPG", import.meta.url)
  .href;

export default function ProfileHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8">
      <div className="text-center max-w-4xl">
        <img
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mx-auto mb-8 border-4 border-white/20"
          src={profileIcon}
          alt="niyu"
        />
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r text-6xl mb-8">
          <span className="text-white">Hi, I'm niyu!</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-6">@niyu98194</p>
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          大学生エンジニアです。ネットワーク、セキュリティ、アプリ開発に興味があります。
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/about">
            <button className="px-8 py-3 bg-white/90 text-black rounded-full font-semibold hover:bg-white transition-all hover:scale-105 border-2 border-white/80">
              About Me
            </button>
          </Link>

          <Link to="/contact">
            <button className="px-8 py-3 bg-white/80 text-black rounded-full font-semibold hover:bg-white transition-all hover:scale-105 border-2 border-white/80">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
