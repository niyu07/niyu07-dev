import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tech from "./pages/Tech";
import Connect from "./pages/Connect";

function App() {
  return (
    <div className="bg-gradient-to-b from-cyan-200 via-sky-300 to-blue-400 min-h-screen w-full flex flex-col">
      <BrowserRouter>
        <header className="w-full px-8 py-4 flex justify-end">
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className="text-white hover:text-gray-200 font-semibold transition-colors"
            >
              ホーム
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-200 font-semibold transition-colors"
            >
              私について
            </Link>
            <Link
              to="/tech"
              className="text-white hover:text-gray-200 font-semibold transition-colors"
            >
              技術
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-200 font-semibold transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>
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
