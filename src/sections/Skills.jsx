import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Cpu, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

const VP = { once: true, amount: 0.05 };

const cardIn = {
  hidden:   { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.92 },
  visible:  { opacity: 1, y: 0,  filter: "blur(0px)", scale: 1,    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden:   { opacity: 0, y: 30, filter: "blur(4px)" },
  visible:  { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const iconMap = {
  frontend: <Code2    className="h-5 w-5" />,
  backend:  <Database className="h-5 w-5" />,
  devops:   <Cpu      className="h-5 w-5" />,
};

// ── Scan Line — fires each time grid enters viewport ─────────────────────────
function ScanLine({ tc }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {isInView && (
        <motion.div
          key={Date.now()} // re-key forces re-animation each time
          className="absolute left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${tc.accent}, transparent)`,
            boxShadow: `0 0 12px ${tc.accent}, 0 0 24px ${tc.accent}66`,
          }}
          initial={{ top: "-2px", opacity: 1 }}
          animate={{ top: "100%", opacity: 0 }}
          transition={{ duration: 1.1, ease: "linear", delay: 0.05 }}
        />
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function Skills({ skills }) {
  const { t } = useTranslation();
  const tc = useThemeColors();

  if (!skills || skills.length === 0) return null;

  const skillKeys = ["skill1","skill2","skill3","skill4","skill5","skill6","skill7","skill8","skill9"];

  return (
    <section id="stack" className="relative py-12 md:py-16 px-6 overflow-visible scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 70% 30%, ${tc.orbPrimary} 0%, transparent 50%)` }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            className="heading-accent flex items-center justify-center gap-2 tracking-[0.25em]"
            variants={fadeUp}
          >
            {/* Sparkles with continuous rotate */}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            {t("skills.label")}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-txt-primary mt-2 tracking-tight"
            variants={fadeUp}
          >
            {t("skills.title")} <span style={{ color: tc.accent }}>{t("skills.titleHighlight")}</span>
          </motion.h2>
        </motion.div>

        {/* Grid with scan line */}
        <div className="relative">
          <ScanLine tc={tc} />

          <motion.div
            className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          >
            {skills.map((skill, index) => {
              const key      = skillKeys[index];
              const name     = key ? t(`skills.${key}Name`)     : skill.name;
              const catLabel = key ? t(`skills.${key}CatLabel`) : skill.categoryLabel;
              const desc     = key ? t(`skills.${key}Desc`)     : skill.description;
              const isExpert = skill.level === "Expert";
              const level    = isExpert ? t("skills.levelExpert") : t("skills.levelAdvanced");

              return (
                <motion.article
                  key={skill.name}
                  className="group relative rounded-2xl p-6 cursor-default"
                  style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
                  variants={cardIn}
                  whileHover={{
                    scale: 1.02, zIndex: 5,
                    borderColor: tc.accent,
                    boxShadow: `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Icon — spins in on viewport enter */}
                      <motion.span
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: tc.iconBg, border: `1px solid ${tc.iconBorder}`, color: tc.iconColor }}
                        initial={{ rotate: -180, scale: 0, opacity: 0 }}
                        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                        viewport={VP}
                        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.15 + index * 0.03 }}
                        whileHover={{ boxShadow: `0 0 15px ${tc.accent}66` }}
                      >
                        {iconMap[skill.category] || <Sparkles className="h-5 w-5" />}
                      </motion.span>
                      <div>
                        <p className="text-base font-semibold text-txt-primary group-hover:text-accent transition-colors">{name}</p>
                        <p className="text-xs text-txt-tertiary">{catLabel}</p>
                      </div>
                    </div>

                    {/* Badge */}
                    <motion.span
                      className="rounded-full px-3 py-1 text-xs font-semibold shrink-0"
                      style={{
                        background: isExpert ? `${tc.accent}1A` : `${tc.accentSec}1A`,
                        border: `1px solid ${isExpert ? `${tc.accent}4D` : `${tc.accentSec}4D`}`,
                        color: isExpert ? tc.accent : tc.accentSec,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={VP}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.25 + index * 0.04 }}
                    >
                      {level}
                    </motion.span>
                  </div>

                  <p className="mt-4 text-sm text-txt-secondary leading-relaxed">{desc}</p>

                  {/* Glow line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: tc.glowLine || `linear-gradient(90deg, transparent, ${tc.accent}, transparent)` }}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;