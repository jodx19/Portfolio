import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const navKeys = ["home", "about", "journey", "stack", "work", "certifications", "contact"];

const NavLink = ({ href, children, onClick, isActive }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative group px-3 py-2 text-sm font-medium transition-colors duration-200"
  >
    <span className={`relative z-10 ${isActive ? "text-accent" : "text-txt-secondary group-hover:text-accent"}`}>
      {children}
    </span>
    {/* Animated underline on hover */}
    <motion.span
      className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </a>
);

const ThemeToggler = ({ theme, setTheme }) => (
  <motion.button
    type="button"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label="Toggle theme"
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-brd-light bg-surface-1 transition-all hover:border-accent/50 hover:shadow-glow"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {theme === "dark" ? (
      <Sun size={18} className="text-yellow-400" />
    ) : (
      <Moon size={18} className="text-accent" />
    )}
  </motion.button>
);

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const nextLang = currentLang === "ar" ? "en" : "ar";
  const label = currentLang === "ar" ? "EN" : "AR";

  const toggleLang = () => {
    i18n.changeLanguage(nextLang);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      aria-label={`Switch to ${nextLang === "ar" ? "Arabic" : "English"}`}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-brd-light bg-surface-1 text-xs font-bold text-txt-primary transition-all hover:border-accent/50 hover:shadow-glow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
};

const MobileNav = ({ sections, isOpen, setOpen, theme, setTheme, activeSection, handleLinkClick }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute left-0 top-full w-full overflow-hidden md:hidden"
          style={{
            background: "rgba(10, 15, 26, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(34, 211, 238, 0.1)"
          }}
        >
          <nav className="flex flex-col gap-2 p-6" aria-label="Mobile primary">
            {sections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleLinkClick(e, section.id)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${activeSection === section.id
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-txt-secondary hover:bg-surface-1 hover:text-accent"
                  }`}
              >
                {t(`nav.${navKeys[idx]}`)}
              </a>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-brd-light pt-4">
              <span className="text-sm text-txt-tertiary">{t("nav.switchTheme")}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggler theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Navbar({ sections }) {
  const [isOpen, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${scrolled ? "py-3" : "py-4"
        }`}
      style={{
        background: scrolled ? "rgba(10, 15, 26, 0.9)" : "rgba(10, 15, 26, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(34, 211, 238, 0.1)" : "1px solid transparent"
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
          className="group flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(37, 99, 235, 0.15))",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              color: "#22d3ee"
            }}
            whileHover={{
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
              borderColor: "#22d3ee"
            }}
          >
            MM
          </motion.span>
          <div className="hidden sm:block leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Dev</p>
            <p className="text-lg font-bold text-txt-primary tracking-tight">Mahmoud Mostafa</p>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((section, idx) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleLinkClick(e, section.id)}
              isActive={activeSection === section.id}
            >
              {t(`nav.${navKeys[idx]}`)}
            </NavLink>
          ))}
          <div className="ml-4 flex items-center gap-2 border-l border-brd-light pl-4">
            <LanguageToggle />
            <ThemeToggler theme={theme} setTheme={setTheme} />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-brd-light bg-surface-1 text-txt-primary"
            whileHover={{ borderColor: "rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <MobileNav
          sections={sections}
          isOpen={isOpen}
          setOpen={setOpen}
          theme={theme}
          setTheme={setTheme}
          activeSection={activeSection}
          handleLinkClick={handleLinkClick}
        />
      </div>
    </header>
  );
}

export default Navbar;