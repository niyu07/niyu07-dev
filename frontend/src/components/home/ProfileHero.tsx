import { Link } from "react-router-dom";

const profileIcon = new URL("../../assets/profile-icon.JPG", import.meta.url)
  .href;

export default function ProfileHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center max-w-4xl">
        <img
          className="w-36 h-36 md:w-52 md:h-52 rounded-full object-cover mx-auto mb-8 border-4 border-white/30 shadow-xl"
          src={profileIcon}
          alt="niyu"
        />
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 text-6xl md:text-7xl font-extrabold mb-8 drop-shadow-lg">
          Hi, I'm niyu!
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-6 font-mono">
          @niyu98194
        </p>
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          大学生エンジニアです。ネットワーク、セキュリティ、アプリ開発に興味があります。
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/about">
            <button className="px-8 py-3 bg-gradient-to-r from-white/90 to-white/70 text-black rounded-full font-semibold shadow-md hover:bg-white transition-all hover:scale-105 border-2 border-white/80">
              About Me
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-8 py-3 bg-gradient-to-r from-white/80 to-white/60 text-black rounded-full font-semibold shadow-md hover:bg-white transition-all hover:scale-105 border-2 border-white/80">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
