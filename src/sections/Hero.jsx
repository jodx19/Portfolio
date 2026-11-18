import { motion } from "framer-motion";
import { ArrowDown, FileText, MessageCircle, Terminal, CheckCircle2, Cpu, Activity, Sparkles } from "lucide-react";
import { socialLinks, contactInfo } from "../constants";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";
import useTypewriter from "../hooks/useTypewriter";

// ─── AnimatedLetters: letter cascade ──────────────────────────────────────────
function AnimatedLetters({ text, variant, staggerDelay = 0, className = "" }) {
  const isArabic = /[\u0600-\u06FF]/.test(text);

  if (isArabic) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{ delay: staggerDelay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: "400px" }}
      >
        {text}
      </motion.span>
    );
  }

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

// ─── Interactive Code Terminal Component ──────────────────────────────────────
function CodeTerminal({ tc, isRtl, isDark }) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl transition-all duration-300 w-full"
      style={{
        background: isDark ? "rgba(10, 15, 30, 0.88)" : "rgba(15, 23, 42, 0.96)",
        borderColor: isDark ? "rgba(34, 211, 238, 0.30)" : "rgba(15, 23, 42, 0.38)",
        boxShadow: isDark
          ? "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(34, 211, 238, 0.15)"
          : "0 25px 50px -12px rgba(15, 23, 42, 0.35), 0 0 20px rgba(37, 99, 235, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.25)",
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      whileHover={{ y: -4 }}
    >
      {/* Window Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b text-xs font-mono"
        style={{
          background: isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(30, 41, 59, 0.95)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        dir="ltr"
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 font-semibold text-slate-200 flex items-center gap-1.5 text-[11px]">
            <Terminal size={13} className="text-cyan-400" /> Program.cs — CleanArchitecture.API
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-400">.NET 8 Active</span>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-left" dir="ltr">
        <div className="text-slate-500 italic">// Mahmoud Al-Safi — Clean Architecture Pipeline</div>
        <div className="mt-2 text-slate-100">
          <span className="text-purple-400 font-semibold">var</span> builder = WebApplication.<span className="text-blue-400 font-semibold">CreateBuilder</span>(args);
        </div>
        <div className="mt-1 pl-4 text-slate-100">
          builder.Services.<span className="text-cyan-400 font-semibold">AddCleanArchitecture</span>()
        </div>
        <div className="pl-8 text-slate-300">
          .<span className="text-amber-400 font-semibold">AddPostgreSQL</span>(connString)
        </div>
        <div className="pl-8 text-slate-300">
          .<span className="text-amber-400 font-semibold">AddRealtimeQueue</span>&lt;<span className="text-emerald-400 font-semibold">MediQueueHub</span>&gt;()
        </div>
        <div className="pl-8 text-slate-300">
          .<span className="text-amber-400 font-semibold">AddJwtAuthorization</span>(rbacOptions);
        </div>
        <div className="mt-2 pl-4 text-slate-100">
          app.<span className="text-cyan-400 font-semibold">UseObservability</span>(serilog =&gt; serilog.<span className="text-blue-400 font-semibold">EnrichWithUserId</span>());
        </div>
        <div className="mt-1 pl-4 text-slate-100">
          app.<span className="text-cyan-400 font-semibold">MapProductionEndpoints</span>(); <span className="text-slate-500 italic">// 91 Verified Routes</span>
        </div>
        <div className="mt-1 text-slate-100">
          app.<span className="text-blue-400 font-semibold">Run</span>();
        </div>
      </div>

      {/* Terminal Footer Metrics */}
      <div
        className="px-5 py-3 border-t grid grid-cols-3 gap-2 text-center text-xs font-mono"
        style={{
          background: "rgba(10, 15, 26, 0.90)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        dir="ltr"
      >
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Latency</span>
          <span className="font-bold text-cyan-400">14ms</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Reliability</span>
          <span className="font-bold text-emerald-400">99.98%</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Pattern</span>
          <span className="font-bold text-slate-200">Clean Arch</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
function Hero() {
  const { t, i18n } = useTranslation();
  const tc = useThemeColors();
  const isRtl = i18n.language === "ar";

  const firstName = t("hero.firstName");
  const lastName = t("hero.lastName");
  const roleText = t("hero.role");
  const specText = t("hero.specialization");

  // WhatsApp CTA URL
  const whatsappNumber = `20${contactInfo.phone.replace(/^0/, "")}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("hero.whatsappMessage"))}`;

  // Typewriter
  const { displayed: roleDisplayed } = useTypewriter({ text: roleText, speed: 45, delay: 600 });
  const { displayed: specDisplayed } = useTypewriter({ text: specText, speed: 35, delay: 1100 });

  // Title glow — animated neon in Dark Mode, razor-sharp clean typography in Light Mode
  const titleGlow = tc.isDark
    ? {
        textShadow: ["0 0 0px transparent", tc.titleGlowShadow, "0 0 0px transparent"],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Ambient orbs */}
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

      {/* ── Main Split Container (Full Width 2-Column Grid) ── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── Column 1: Identity, Role, Bio & CTA (7 cols) ── */}
          <div className={`lg:col-span-7 flex flex-col ${isRtl ? "text-right items-start" : "text-left items-start"}`}>

            {/* ── Status Badge — pops in ── */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
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
              className="text-base sm:text-lg text-txt-tertiary font-medium mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {t("hero.greeting")}
            </motion.p>

            {/* ── Name: Letters Cascade ── */}
            <div className="mb-4" style={{ perspective: "800px" }}>
              <motion.h1
                className={`text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[1.08] ${isRtl ? "tracking-normal py-1" : "tracking-tighter"
                  }`}
                animate={titleGlow}
              >
                <AnimatedLetters
                  text={firstName}
                  variant={dropDown}
                  staggerDelay={0.25}
                  className="hero-title inline-block mr-3 rtl:ml-3"
                />
                <AnimatedLetters
                  text={lastName}
                  variant={riseUp}
                  staggerDelay={0.45}
                  className="hero-title inline-block"
                />
              </motion.h1>
            </div>

            {/* ── Role — Typewriter ── */}
            <div className="space-y-1 mb-6 min-h-[3.5rem]">
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-bold text-txt-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: roleDisplayed.length > 0 ? 1 : 0 }}
              >
                {roleDisplayed}
                {roleDisplayed.length < roleText.length && (
                  <span className="inline-block w-0.5 h-6 ml-1 align-middle bg-current animate-blink-cursor" />
                )}
              </motion.p>

              <motion.p
                className="text-base sm:text-lg md:text-xl font-medium tracking-wide"
                style={{ color: `${tc.accent}EE` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: specDisplayed.length > 0 ? 1 : 0 }}
              >
                {specDisplayed}
                {specDisplayed.length > 0 && specDisplayed.length < specText.length && (
                  <span className="inline-block w-0.5 h-4 ml-1 align-middle animate-blink-cursor" style={{ background: tc.accent }} />
                )}
              </motion.p>
            </div>

            {/* ── Description ── */}
            <motion.p
              className="text-base sm:text-lg text-txt-secondary max-w-xl leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {t("hero.description")}
            </motion.p>

            {/* ── CTA Buttons Row ── */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25 }}
            >
              {/* Primary WhatsApp CTA */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 overflow-hidden text-base shadow-lg"
                style={{ background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff", boxShadow: tc.heroBtnShadow }}
                whileHover={{ scale: 1.04, boxShadow: tc.heroBtnHoverShadow }}
                whileTap={{ scale: 0.96 }}
              >
                {t("hero.ctaWhatsapp")}
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </motion.a>

              {/* Secondary Download CV */}
              <motion.a
                href="/Mahmoud_Mostafa_CV.pdf?v=20260919"
                className="btn-secondary px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-base border"
                style={{ borderColor: tc.cardBorder }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {t("hero.ctaSecondary")}
                <FileText className="h-5 w-5" />
              </motion.a>

              {/* View Work Link */}
              <motion.a
                href="#work"
                className="group inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-txt-secondary hover:text-accent transition-colors"
                whileHover={{ x: isRtl ? -3 : 3 }}
              >
                {t("hero.ctaPrimary")}
                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>

            {/* ── Quick Stats Badges Strip ── */}
            <motion.div
              className="w-full grid grid-cols-3 gap-3 pt-6 border-t"
              style={{ borderColor: tc.cardBorder }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
            >
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-txt-primary">91+</span>
                <span className="text-xs text-txt-tertiary">REST Endpoints</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-txt-primary">ITI</span>
                <span className="text-xs text-txt-tertiary">Full-Stack Track</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-txt-primary" style={{ color: tc.accent }}>SOLID</span>
                <span className="text-xs text-txt-tertiary">Clean Architecture</span>
              </div>
            </motion.div>

          </div>

          {/* ── Column 2: Interactive Code Terminal (5 cols) ── */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <CodeTerminal tc={tc} isRtl={isRtl} isDark={tc.isDark} />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
