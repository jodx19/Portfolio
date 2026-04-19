import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import useThemeColors from "../hooks/useThemeColors";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const tc = useThemeColors();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-xl cursor-pointer"
          style={{
            background: tc.scrollBtnBg,
            border: `1px solid ${tc.scrollBtnBorder}`,
            backdropFilter: "blur(12px)",
            color: tc.accent,
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ borderColor: tc.accent, boxShadow: tc.scrollBtnHoverShadow, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
