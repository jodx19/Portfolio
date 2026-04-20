import { motion } from "framer-motion";
import { Code2, Database, Cpu, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "../motion/motion";
import { useTranslation } from "react-i18next";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useThemeColors from "../hooks/useThemeColors";

const iconMap = {
  frontend: <Code2 className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  devops: <Cpu className="h-5 w-5" />,
};

function Skills({ skills }) {
  const { t } = useTranslation();
  const tc = useThemeColors();
  const { ref: headerRef, controls: headerControls } = useScrollAnimation();
  const { ref: gridRef, controls: gridControls } = useScrollAnimation({ threshold: 0.05 });

  if (!skills || skills.length === 0) return null;

  const skillKeys = ["skill1","skill2","skill3","skill4","skill5","skill6","skill7","skill8","skill9"];

  return (
    <section className="relative overflow-visible">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 70% 30%, ${tc.orbPrimary} 0%, transparent 50%)` }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.div ref={headerRef} className="mb-16 text-center"
          variants={fadeUp} initial="initial" animate={headerControls}>
          <p className="heading-accent flex items-center justify-center gap-2 tracking-[0.25em]">
            <Sparkles className="h-4 w-4" /> {t("skills.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-txt-primary mt-4 tracking-tight leading-tight">
            {t("skills.title")} <span style={{ color: tc.accent }}>{t("skills.titleHighlight")}</span>
          </h2>
        </motion.div>

        {/* Grid — 1 → 2 → 3 cols */}
        <motion.div ref={gridRef} className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]"
          variants={staggerContainer} initial="initial" animate={gridControls}>
          {skills.map((skill, index) => {
            const key = skillKeys[index];
            const name     = key ? t(`skills.${key}Name`)     : skill.name;
            const catLabel = key ? t(`skills.${key}CatLabel`) : skill.categoryLabel;
            const desc     = key ? t(`skills.${key}Desc`)     : skill.description;
            const isExpert = skill.level === "Expert";
            const level    = isExpert ? t("skills.levelExpert") : t("skills.levelAdvanced");

            return (
              <motion.article
                key={skill.name}
                className="group relative rounded-xl p-5 cursor-default transition-all duration-300 ease-in-out"
                style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
                variants={fadeUp}
                whileHover={{
                  scale: 1.02,
                  zIndex: 5,
                  borderColor: tc.accent,
                  boxShadow: `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <motion.span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all"
                      style={{ background: tc.iconBg, border: `1px solid ${tc.iconBorder}`, color: tc.iconColor }}
                      whileHover={{ boxShadow: `0 0 15px ${tc.accent}66` }}
                    >
                      {iconMap[skill.category] || <Sparkles className="h-5 w-5" />}
                    </motion.span>
                    <div>
                      <p className="text-base font-semibold text-txt-primary group-hover:text-accent transition-colors">{name}</p>
                      <p className="text-xs text-txt-tertiary">{catLabel}</p>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold shrink-0"
                    style={{
                      background: isExpert ? `${tc.accent}1A` : `${tc.accentSec}1A`,
                      border: `1px solid ${isExpert ? `${tc.accent}4D` : `${tc.accentSec}4D`}`,
                      color: isExpert ? tc.accent : tc.accentSec,
                    }}
                  >
                    {level}
                  </span>
                </div>

                <p className="mt-4 text-sm text-txt-secondary leading-relaxed">{desc}</p>

                {/* Bottom glow line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: tc.glowLine || `linear-gradient(90deg, transparent, ${tc.accent}, transparent)` }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;