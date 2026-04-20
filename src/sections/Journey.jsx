import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

// Journey uses two accent colours:
//   Education  → primary accent (cyan / orange)
//   Experience → purple (kept in both modes — adds visual variety)
const EXP_COLOR = "#a855f7"; // purple stays consistent across themes

function TimelineCard({ title, subtitle, period, description, type, tc }) {
  const isEdu = type === "edu";
  const hoverBorder = isEdu ? tc.accent : EXP_COLOR;
  const hoverShadow = isEdu
    ? `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`
    : `0 0 10px ${EXP_COLOR}, 0 0 30px ${EXP_COLOR}4D`;

  return (
    <motion.div
      className="group relative p-6 rounded-2xl transition-all duration-300 ease-in-out"
      style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
      variants={fadeUp}
      whileHover={{ scale: 1.02, borderColor: hoverBorder, boxShadow: hoverShadow, zIndex: 5 }}
    >
      {/* Icon Badge */}
      <motion.div
        className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
        style={{
          background: isEdu ? tc.iconBg : "rgba(168,85,247,0.10)",
          border: `1px solid ${isEdu ? tc.iconBorder : "rgba(168,85,247,0.30)"}`,
          color: isEdu ? tc.accent : EXP_COLOR,
        }}
        whileHover={{
          scale: 1.1,
          background: isEdu
            ? tc.primaryGradient
            : "linear-gradient(135deg, #a855f7, #6366f1)",
          color: "#fff",
        }}
      >
        {isEdu ? <GraduationCap size={20} /> : <Briefcase size={20} />}
      </motion.div>

      <div className="relative z-10 ml-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 className="text-xl font-bold text-txt-primary group-hover:text-accent transition-colors">
              {title}
            </h4>
            <p className="font-semibold" style={{ color: isEdu ? tc.accent : EXP_COLOR }}>
              {subtitle}
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: tc.cardBorder, border: `1px solid ${tc.cardBorder}`, color: "var(--color-text-tertiary)" }}
          >
            <Calendar size={14} />
            {period}
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-txt-secondary">{description}</p>
      </div>
    </motion.div>
  );
}

function EducationExperience() {
  const { t } = useTranslation();
  const tc = useThemeColors();

  const education = [
    { degree: t("journey.edu1Degree"), university: t("journey.edu1University"), year: t("journey.edu1Year"), description: t("journey.edu1Desc") },
    { degree: t("journey.edu2Degree"), university: t("journey.edu2University"), year: t("journey.edu2Year"), description: t("journey.edu2Desc") },
  ];
  const experience = [
    { role: t("journey.exp1Role"), place: t("journey.exp1Place"), period: t("journey.exp1Period"), description: t("journey.exp1Desc") },
    { role: t("journey.exp2Role"), place: t("journey.exp2Place"), period: t("journey.exp2Period"), description: t("journey.exp2Desc") },
    { role: t("journey.exp3Role"), place: t("journey.exp3Place"), period: t("journey.exp3Period"), description: t("journey.exp3Desc") },
    { role: t("journey.exp4Role"), place: t("journey.exp4Place"), period: t("journey.exp4Period"), description: t("journey.exp4Desc") },
  ];

  return (
    <section className="relative py-16 md:py-24 px-6 overflow-visible">
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: tc.orbPrimary, filter: "blur(100px)" }} />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: "rgba(168,85,247,0.08)", filter: "blur(100px)" }} />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div className="mb-12 text-center" variants={fadeUp}>
          <p className="heading-accent tracking-[0.25em]">{t("journey.label")}</p>
          <h2 className="mt-4 text-4xl font-bold text-txt-primary md:text-6xl tracking-tight leading-tight">
            {t("journey.title")}{" "}
            <span style={{ color: tc.accent }}>{t("journey.titleAnd")}</span>{" "}
            {t("journey.titleExperience")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 [perspective:1000px]">
          {/* Education Column */}
          <div className="space-y-12">
            <motion.div className="flex items-center gap-4" variants={fadeUp}>
              <div className="h-10 w-1 rounded-full" style={{ background: tc.timelineEduGrad }} />
              <h3 className="text-2xl font-bold text-txt-primary uppercase tracking-wider">
                {t("journey.educationLabel")}
              </h3>
            </motion.div>
            <div className="relative grid gap-10 pl-6" style={{ borderLeft: `2px solid ${tc.timelineEduBorder}` }}>
              <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full"
                style={{ background: tc.timelineEduDot, boxShadow: tc.timelineEduDotGlow }} />
              {education.map((edu, i) => (
                <TimelineCard key={i} title={edu.degree} subtitle={edu.university}
                  period={edu.year} description={edu.description} type="edu" tc={tc} />
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="space-y-12">
            <motion.div className="flex items-center gap-4" variants={fadeUp}>
              <div className="h-10 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }} />
              <h3 className="text-2xl font-bold text-txt-primary uppercase tracking-wider">
                {t("journey.experienceLabel")}
              </h3>
            </motion.div>
            <div className="relative grid gap-10 pl-6" style={{ borderLeft: "2px solid rgba(168,85,247,0.20)" }}>
              <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full"
                style={{ background: EXP_COLOR, boxShadow: `0 0 10px ${EXP_COLOR}, 0 0 20px ${EXP_COLOR}80` }} />
              {experience.map((exp, i) => (
                <TimelineCard key={i} title={exp.role} subtitle={exp.place}
                  period={exp.period} description={exp.description} type="exp" tc={tc} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default EducationExperience;