import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Tech from "./pages/Tech";
import Connect from "./pages/Connect";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // メニューを開いてから5秒後に自動で閉じる
  useEffect(() => {
    if (!menuOpen) return;
    const timer = setTimeout(() => setMenuOpen(false), 5000);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "ホーム" },
    { to: "/about", label: "私について" },
    { to: "/tech", label: "技術" },
    { to: "/contact", label: "お問い合わせ" },
  ];

  return (
    <div className="bg-gradient-to-b from-cyan-200 via-sky-300 to-blue-400 min-h-screen w-full flex flex-col">
      <BrowserRouter>
        {/* スクロールで現れるfixedヘッダー */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/20 backdrop-blur-md shadow-md translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="px-6 py-3 flex justify-end items-center">
            {/* PC用ナビ */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white hover:text-gray-200 font-semibold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* ハンバーガーボタン（スマホ） */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="メニューを開く"
            >
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
          {/* モバイルメニュー（ヘッダー直下に隔間なし） */}
          {menuOpen && (
            <nav className="md:hidden flex flex-col items-end gap-4 px-6 py-4 bg-gradient-to-b from-black/50 to-transparent">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white hover:text-gray-200 font-semibold transition-colors text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/contact" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
