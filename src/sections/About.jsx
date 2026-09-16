import { useState } from "react";
import { motion } from "framer-motion";
import { aboutData } from "../constants";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

// ── Reusable viewport config ──────────────────────────────────────────────────
const VP = { once: true, amount: 0.15 };

// ── Shared variants ───────────────────────────────────────────────────────────
const fadeUp   = { hidden: { opacity: 0, y: 40, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const fromLeft = { hidden: { opacity: 0, x: -60, rotate: -4, scale: 0.88 }, visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const cardVariants = [
  { hidden: { opacity: 0, x: -50, rotate: -5, scale: 0.85 }, visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } },
  { hidden: { opacity: 0, y: 60, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } },
  { hidden: { opacity: 0, x: 50, rotate: 5, scale: 0.85 }, visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } },
];

// ── HTML Tag decoration ───────────────────────────────────────────────────────
function HtmlTagReveal({ tc }) {
  return (
    <motion.div
      className="absolute -top-10 -left-4 text-xs font-mono select-none pointer-events-none"
      style={{ color: `${tc.accent}60` }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <span style={{ color: `${tc.accent}99` }}>&lt;</span>
      <span style={{ color: "#f9a8d4" }}>img</span>
      <br />
      <span className="ml-3" style={{ color: `${tc.accentSec}99` }}>src</span>
      <span style={{ color: `${tc.accent}60` }}>=</span>
      <span style={{ color: "#86efac" }}>"portrait.jpg"</span>
      <br />
      <span className="ml-3" style={{ color: `${tc.accentSec}99` }}>alt</span>
      <span style={{ color: `${tc.accent}60` }}>=</span>
      <span style={{ color: "#86efac" }}>"Mahmoud"</span>
      <br />
      <span style={{ color: `${tc.accent}99` }}>/&gt;</span>
    </motion.div>
  );
}

// ── Corner Frame ──────────────────────────────────────────────────────────────
function CornerFrame({ position, tc }) {
  const styles = {
    tl: { top: "-1rem", left: "-1rem", borderTop: `2px solid ${tc.accent}`, borderLeft: `2px solid ${tc.accent}`, borderRadius: "0.5rem 0 0 0" },
    br: { bottom: "-1rem", right: "-1rem", borderBottom: `2px solid ${tc.accent}`, borderRight: `2px solid ${tc.accent}`, borderRadius: "0 0 0.5rem 0" },
  };
  return (
    <motion.div
      className="absolute w-16 h-16"
      style={styles[position]}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VP}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
    />
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
function About() {
  const { image } = aboutData;
  const { t } = useTranslation();
  const tc = useThemeColors();

  const titleWords = t("about.title").split(" ");
  const description = [t("about.description1"), t("about.description2")];
  const stats = [
    { title: t("about.stat1Title"), desc: t("about.stat1Desc"), icon: "🏢" },
    { title: t("about.stat2Title"), desc: t("about.stat2Desc"), icon: "🏗️" },
    { title: t("about.stat3Title"), desc: t("about.stat3Desc"), icon: "⚡" },
  ];

  return (
    <section id="about" className="relative px-6 overflow-visible py-12 md:py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${tc.orbPrimary} 0%, transparent 50%)` }}
      />

      <div className="relative z-10 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center">

        {/* ── Left: Photo ── */}
        <motion.div
          className="relative mx-auto lg:mx-0"
          variants={fromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <HtmlTagReveal tc={tc} />

          {/* Pulsing glow blob — continuous */}
          <motion.div
            className="absolute -inset-6 rounded-3xl"
            style={{ background: tc.photoBlobBg, filter: "blur(30px)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative overflow-hidden rounded-3xl border-2"
            style={{ borderColor: tc.photoBorderColor, boxShadow: tc.photoBorderGlow }}
            whileHover={{ scale: 1.02, boxShadow: tc.photoHoverGlow }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={image}
              alt="Mahmoud Al-Safi"
              className="w-72 h-72 md:w-96 md:h-96 object-cover"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              loading="lazy"
            />
          </motion.div>

          <CornerFrame position="tl" tc={tc} />
          <CornerFrame position="br" tc={tc} />
        </motion.div>

        {/* ── Right: Content ── */}
        <div className="space-y-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p className="heading-accent" variants={fadeUp}>{t("about.label")}</motion.p>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-txt-primary mt-4 leading-tight tracking-tight"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{ hidden: { opacity: 0, y: 30, rotateX: -60 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {description.map((para, i) => (
              <motion.p
                key={i}
                className={`text-xl leading-relaxed ${i === 1 ? "text-txt-tertiary italic pl-6" : "text-txt-secondary"}`}
                style={i === 1 ? { borderLeft: `3px solid ${tc.accent}80` } : {}}
                variants={fadeUp}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Value Cards — different directions */}
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative rounded-3xl p-5 sm:p-6 cursor-default overflow-visible"
                style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
                variants={cardVariants[i]}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                whileHover={{ scale: 1.02, zIndex: 5, borderColor: tc.cardHoverBorder, boxShadow: tc.cardHoverShadow, background: tc.cardHoverBg }}
              >
                {/* Icon — continuous subtle bounce */}
                <motion.div
                  className="text-4xl mb-6"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold text-txt-primary text-xl">
                  <span className="group-hover:text-accent transition-colors">{item.title}</span>
                </h3>
                <p className="text-txt-tertiary text-base mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;