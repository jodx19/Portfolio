import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

const VP = { once: true, amount: 0.05 };
const EXP_COLOR = "#a855f7";

const fadeUp   = { hidden: { opacity: 0, y: 35, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const fromLeft = { hidden: { opacity: 0, x: -50, rotateY: -12 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const fromRight= { hidden: { opacity: 0, x: 50,  rotateY:  12 }, visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const lineGrow = { hidden: { scaleY: 0, originY: 0 }, visible: { scaleY: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } };
const dotPop   = { hidden: { scale: 0 }, visible: { scale: [0, 1.5, 1], transition: { duration: 0.5, delay: 0.4 } } };

// ── Timeline Card ─────────────────────────────────────────────────────────────
function TimelineCard({ title, subtitle, period, description, type, tc, slideVariant }) {
  const isEdu = type === "edu";
  const hoverBorder = isEdu ? tc.accent : EXP_COLOR;
  const hoverShadow = isEdu
    ? `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`
    : `0 0 10px ${EXP_COLOR}, 0 0 30px ${EXP_COLOR}4D`;

  return (
    <motion.div
      className="group relative p-6 rounded-2xl"
      style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
      variants={slideVariant}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      whileHover={{ scale: 1.02, borderColor: hoverBorder, boxShadow: hoverShadow, zIndex: 5 }}
    >
      {/* Icon badge */}
      <motion.div
        className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
        style={{
          background: isEdu ? tc.iconBg : "rgba(168,85,247,0.10)",
          border: `1px solid ${isEdu ? tc.iconBorder : "rgba(168,85,247,0.30)"}`,
          color: isEdu ? tc.accent : EXP_COLOR,
        }}
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={VP}
        transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.25 }}
        whileHover={{
          scale: 1.15,
          background: isEdu ? tc.primaryGradient : "linear-gradient(135deg, #a855f7, #6366f1)",
          color: "#fff",
        }}
      >
        {isEdu ? <GraduationCap size={20} /> : <Briefcase size={20} />}
      </motion.div>

      <div className="relative z-10 ml-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 className="text-xl font-bold text-txt-primary group-hover:text-accent transition-colors">{title}</h4>
            <p className="font-semibold" style={{ color: isEdu ? tc.accent : EXP_COLOR }}>{subtitle}</p>
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

// ── Timeline Column ───────────────────────────────────────────────────────────
function TimelineColumn({ label, borderColor, dotColor, dotGlow, gradientBg, items, type, tc, slideVariant, headerVariant }) {
  return (
    <div className="space-y-12">
      <motion.div
        className="flex items-center gap-4"
        variants={headerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {/* Animated gradient bar — continuous */}
        <motion.div
          className="h-10 w-1 rounded-full"
          style={{ background: gradientBg }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <h3 className="text-2xl font-bold text-txt-primary uppercase tracking-wider">{label}</h3>
      </motion.div>

      <div className="relative pl-6">
        {/* Timeline line — draws in */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: borderColor, originY: 0 }}
          variants={lineGrow}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        />

        {/* Dot — pops then pulses */}
        <motion.div
          className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full"
          style={{ background: dotColor }}
          variants={dotPop}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          animate={{ boxShadow: [dotGlow, `0 0 0px transparent`, dotGlow] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
        />

        <div className="grid gap-10">
          {items.map((item, i) => (
            <TimelineCard key={i} {...item} type={type} tc={tc} slideVariant={slideVariant} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function EducationExperience() {
  const { t } = useTranslation();
  const tc = useThemeColors();

  const education = [
    { title: t("journey.edu1Degree"), subtitle: t("journey.edu1University"), period: t("journey.edu1Year"), description: t("journey.edu1Desc") },
    { title: t("journey.edu2Degree"), subtitle: t("journey.edu2University"), period: t("journey.edu2Year"), description: t("journey.edu2Desc") },
  ];
  const experience = [
    { title: t("journey.exp1Role"), subtitle: t("journey.exp1Place"), period: t("journey.exp1Period"), description: t("journey.exp1Desc") },
    { title: t("journey.exp2Role"), subtitle: t("journey.exp2Place"), period: t("journey.exp2Period"), description: t("journey.exp2Desc") },
    { title: t("journey.exp3Role"), subtitle: t("journey.exp3Place"), period: t("journey.exp3Period"), description: t("journey.exp3Desc") },
    { title: t("journey.exp4Role"), subtitle: t("journey.exp4Place"), period: t("journey.exp4Period"), description: t("journey.exp4Desc") },
  ];

  const splitLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
  const splitRight = { hidden: { opacity: 0, x: 50  }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="journey" className="relative py-12 md:py-16 px-6 overflow-visible scroll-mt-24">
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: tc.orbPrimary, filter: "blur(100px)" }} />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: "rgba(168,85,247,0.08)", filter: "blur(100px)" }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header — split left/right */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p className="heading-accent tracking-[0.25em]" variants={fadeUp}>{t("journey.label")}</motion.p>
          <div className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-txt-primary tracking-tight leading-tight flex flex-wrap justify-center gap-x-3">
            <motion.span variants={splitLeft}>{t("journey.title")}</motion.span>
            <motion.span style={{ color: tc.accent }} variants={fadeUp}>{t("journey.titleAnd")}</motion.span>
            <motion.span variants={splitRight}>{t("journey.titleExperience")}</motion.span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 [perspective:1000px]">
          <TimelineColumn
            label={t("journey.educationLabel")}
            borderColor={tc.timelineEduBorder}
            dotColor={tc.timelineEduDot}
            dotGlow={tc.timelineEduDotGlow}
            gradientBg={tc.timelineEduGrad}
            items={education}
            type="edu"
            tc={tc}
            slideVariant={fromLeft}
            headerVariant={splitLeft}
          />
          <TimelineColumn
            label={t("journey.experienceLabel")}
            borderColor="rgba(168,85,247,0.20)"
            dotColor={EXP_COLOR}
            dotGlow={`0 0 10px ${EXP_COLOR}, 0 0 20px ${EXP_COLOR}80`}
            gradientBg="linear-gradient(180deg, #a855f7, transparent)"
            items={experience}
            type="exp"
            tc={tc}
            slideVariant={fromRight}
            headerVariant={splitRight}
          />
        </div>
      </div>
    </section>
  );
}

export default EducationExperience;