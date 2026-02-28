import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tech from "./pages/Tech";
import Connect from "./pages/Connect";

function App() {
  return (
    <div className="bg-gradient-to-b from-cyan-200 via-sky-300 to-blue-400 min-h-screen w-full flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
