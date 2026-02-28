import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-sky-400 hover:bg-sky-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="トップへ戻る"
    >
      <FaArrowUp className="text-xl" />
    </button>
  );
}
