import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../motion/motion";
import { ArrowDown, FileText } from "lucide-react";
import { socialLinks } from "../constants";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useThemeColors from "../hooks/useThemeColors";

function Hero() {
  const { t } = useTranslation();
  const tc = useThemeColors();
  const { ref: heroRef, controls: heroControls } = useScrollAnimation({ once: true, margin: "0px" });

  // Computed title glow — theme-aware, subtle
  const titleGlowAnimate = {
    textShadow: [
      "0 0 0px transparent",
      tc.titleGlowShadow,
      "0 0 0px transparent",
    ],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center pt-20 overflow-visible"
      style={{ background: "transparent" }}
    >
      {/* === AMBIENT ORBS === */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: tc.orbPrimary, filter: "blur(120px)", animation: "orb-pulse 4s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: tc.orbSecondary, filter: "blur(120px)", animation: "orb-pulse 4s ease-in-out infinite 2s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Status Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ background: `${tc.accent}18`, borderColor: `${tc.accent}30` }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: tc.accent }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: tc.accent }} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: tc.accent }}>
              {t("hero.status")}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg md:text-xl text-txt-tertiary font-medium">{t("hero.greeting")}</p>

            {/* Pulsating name — uses theme-aware textShadow */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1] tracking-tighter"
              animate={titleGlowAnimate}
            >
              <span className="hero-title">{t("hero.firstName")}</span>
              <br />
              <span className="hero-title">{t("hero.lastName")}</span>
            </motion.h1>

            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-txt-primary">{t("hero.role")}</p>
              <p className="text-lg md:text-xl font-medium tracking-wide" style={{ color: `${tc.accent}CC` }}>
                {t("hero.specialization")}
              </p>
            </div>
          </motion.div>

          <motion.p
            className="text-lg md:text-2xl text-txt-secondary max-w-2xl mx-auto leading-relaxed mt-10"
            variants={fadeUp}
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mt-14" variants={fadeUp}>
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

          {/* Social Links */}
          <motion.div className="flex items-center justify-center gap-4 mt-16" variants={fadeUp}>
            {socialLinks.map((social) => {
              const Icon = LucideIcons[social.icon];
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-brd-light bg-surface-1 text-txt-secondary transition-all"
                  whileHover={{ borderColor: tc.accent, color: tc.accent, boxShadow: `0 0 15px ${tc.accent}4D` }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.platform}
                >
                  {Icon && <Icon size={24} />}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-8 w-8" style={{ color: `${tc.accent}4D` }} />
      </motion.div>
    </section>
  );
}

export default Hero;