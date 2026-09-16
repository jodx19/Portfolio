import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { socialLinks } from "../constants";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";
import useTypewriter from "../hooks/useTypewriter";

// ─── AnimatedLetters: each letter animates independently ─────────────────────
function AnimatedLetters({ text, variant, staggerDelay = 0, className = "" }) {
  const letters = text.split("");
  return (
    <motion.span
      className={`inline-flex ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: staggerDelay } },
      }}
      style={{ perspective: "400px" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={variant}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Letter variants ───────────────────────────────────────────────────────────
const dropDown = {
  hidden: { opacity: 0, y: -60, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const riseUp = {
  hidden: { opacity: 0, y: 60, rotateX: 90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main Hero ────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation();
  const tc = useThemeColors();

  const firstName = t("hero.firstName");
  const lastName  = t("hero.lastName");
  const roleText  = t("hero.role");
  const specText  = t("hero.specialization");

  // Typewriter starts immediately (component mounts AFTER loading screen)
  const { displayed: roleDisplayed } = useTypewriter({ text: roleText,  speed: 45, delay: 600  });
  const { displayed: specDisplayed  } = useTypewriter({ text: specText,  speed: 35, delay: 1100 });

  // Continuous title glow
  const titleGlow = {
    textShadow: ["0 0 0px transparent", tc.titleGlowShadow, "0 0 0px transparent"],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center pt-20 overflow-visible"
      style={{ background: "transparent" }}
    >
      {/* Ambient orbs — continuous float */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: tc.orbPrimary, filter: "blur(120px)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: tc.orbSecondary, filter: "blur(120px)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-4xl text-center">

          {/* ── Status Badge — pops in ── */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ background: `${tc.accent}18`, borderColor: `${tc.accent}30` }}
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: tc.accent }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: tc.accent }} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: tc.accent }}>
              {t("hero.status")}
            </span>
          </motion.div>

          {/* ── Greeting ── */}
          <motion.p
            className="text-lg md:text-xl text-txt-tertiary font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t("hero.greeting")}
          </motion.p>

          {/* ── Name: Letters Cascade ── */}
          <div className="mb-6" style={{ perspective: "800px" }}>
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1] tracking-tighter"
              animate={titleGlow}
            >
              {/* First name drops from above — stagger starts at 0.25s */}
              <AnimatedLetters
                text={firstName}
                variant={dropDown}
                staggerDelay={0.25}
                className="hero-title"
              />
              <br />
              {/* Last name rises from below — stagger starts at 0.45s */}
              <AnimatedLetters
                text={lastName}
                variant={riseUp}
                staggerDelay={0.45}
                className="hero-title"
              />
            </motion.h1>
          </div>

          {/* ── Role — typewriter (starts at 600ms) ── */}
          <div className="space-y-1 mb-8 min-h-[4rem]">
            <motion.p
              className="text-2xl md:text-3xl font-bold text-txt-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: roleDisplayed.length > 0 ? 1 : 0 }}
            >
              {roleDisplayed}
              {roleDisplayed.length < roleText.length && (
                <span className="inline-block w-0.5 h-7 ml-1 align-middle bg-current animate-blink-cursor" />
              )}
            </motion.p>

            <motion.p
              className="text-lg md:text-xl font-medium tracking-wide"
              style={{ color: `${tc.accent}CC` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: specDisplayed.length > 0 ? 1 : 0 }}
            >
              {specDisplayed}
              {specDisplayed.length > 0 && specDisplayed.length < specText.length && (
                <span className="inline-block w-0.5 h-5 ml-1 align-middle animate-blink-cursor" style={{ background: tc.accent }} />
              )}
            </motion.p>
          </div>

          {/* ── Description — fades in ── */}
          <motion.p
            className="text-lg md:text-2xl text-txt-secondary max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 overflow-hidden text-lg"
              style={{ background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff", boxShadow: tc.heroBtnShadow }}
              whileHover={{ scale: 1.05, boxShadow: tc.heroBtnHoverShadow }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.ctaPrimary")}
              <ArrowDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/Mahmoud_Mostafa_CV.pdf"
              className="btn-secondary px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.ctaSecondary")}
              <FileText className="h-6 w-6" />
            </motion.a>
          </motion.div>

          {/* ── Social Icons — bounce up ── */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } },
            }}
          >
            {socialLinks.map((social) => {
              const Icon = LucideIcons[social.icon];
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-brd-light bg-surface-1 text-txt-secondary transition-all"
                  variants={{
                    hidden:   { opacity: 0, y: 30, scale: 0.6 },
                    visible:  { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } },
                  }}
                  whileHover={{ borderColor: tc.accent, color: tc.accent, boxShadow: `0 0 15px ${tc.accent}4D` }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.platform}
                >
                  {Icon && <Icon size={24} />}
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.5 }, y: { duration: 2, repeat: Infinity, delay: 1.8 } }}
      >
        <ArrowDown className="h-8 w-8" style={{ color: `${tc.accent}66` }} />
      </motion.div>
    </section>
  );
}

export default Hero;