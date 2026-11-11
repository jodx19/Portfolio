import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";
import { contactInfo } from "../constants";

export default function StickyWhatsApp() {
  const { t, i18n } = useTranslation();
  const tc = useThemeColors();
  const [visible, setVisible] = useState(false);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phone = `20${(contactInfo?.phone || "01118286088").replace(/^0/, "")}`;
  const prefilled = encodeURIComponent(
    isRtl
      ? "مرحباً محمود! تصفحت معرض أعمالك وأود مناقشة مشروع جديد معك."
      : "Hi Mahmoud! I viewed your portfolio and would like to discuss a project with you."
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${prefilled}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed bottom-6 z-50 flex items-center gap-3 ${
            isRtl ? "left-6" : "right-6"
          }`}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        >
          {/* Subtle tooltip on hover */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative flex items-center justify-center p-3.5 sm:px-5 sm:py-3.5 rounded-full font-bold shadow-2xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "#ffffff",
              boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4)",
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 15px 35px rgba(37, 211, 102, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ping animation effect */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 blur-sm group-hover:opacity-60 transition-opacity animate-pulse" />

            <MessageCircle className="relative z-10 w-6 h-6 sm:w-5 sm:h-5" />
            <span className="relative z-10 hidden sm:inline ml-2 text-sm font-semibold tracking-wide">
              {isRtl ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

