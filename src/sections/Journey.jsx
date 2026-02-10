import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimelineCard = ({ title, subtitle, period, description, type }) => (
  <motion.div
    className="group relative p-6 rounded-2xl transition-all duration-300"
    style={{
      background: "rgba(15, 23, 42, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(12px)"
    }}
    variants={fadeUp}
    whileHover={{
      y: -5,
      borderColor: type === "edu" ? "#22d3ee" : "#a855f7",
      boxShadow: type === "edu"
        ? "0 0 10px #22d3ee, 0 0 30px rgba(6, 182, 212, 0.3)"
        : "0 0 10px #a855f7, 0 0 30px rgba(168, 85, 247, 0.3)"
    }}
  >
    {/* Icon Badge */}
    <motion.div
      className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all"
      style={{
        background: type === "edu"
          ? "rgba(34, 211, 238, 0.1)"
          : "rgba(168, 85, 247, 0.1)",
        border: `1px solid ${type === "edu"
          ? "rgba(34, 211, 238, 0.3)"
          : "rgba(168, 85, 247, 0.3)"}`,
        color: type === "edu" ? "#22d3ee" : "#a855f7"
      }}
      whileHover={{
        scale: 1.1,
        background: type === "edu"
          ? "linear-gradient(135deg, #22d3ee, #2563eb)"
          : "linear-gradient(135deg, #a855f7, #6366f1)",
        color: "#fff"
      }}
    >
      {type === "edu" ? <GraduationCap size={20} /> : <Briefcase size={20} />}
    </motion.div>

    <div className="relative z-10 ml-4 flex flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-xl font-bold text-txt-primary group-hover:text-cyan-400 transition-colors">
            {title}
          </h4>
          <p
            className="font-semibold"
            style={{ color: type === "edu" ? "#22d3ee" : "#a855f7" }}
          >
            {subtitle}
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "var(--color-text-tertiary)"
          }}
        >
          <Calendar size={14} />
          {period}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-txt-secondary">
        {description}
      </p>
    </div>
  </motion.div>
);

const EducationExperience = () => {
  const { t } = useTranslation();

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
    <section className="relative py-24 px-6 overflow-visible">
      {/* Background Glows */}
      <div
        className="absolute top-0 left-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(34, 211, 238, 0.08)",
          filter: "blur(100px)"
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(168, 85, 247, 0.08)",
          filter: "blur(100px)"
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div className="mb-16 text-center" variants={fadeUp}>
          <p className="heading-accent">{t("journey.label")}</p>
          <h2 className="mt-3 text-4xl font-bold text-txt-primary md:text-5xl tracking-tight">
            {t("journey.title")} <span className="text-cyan-400">{t("journey.titleAnd")}</span> {t("journey.titleExperience")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Column */}
          <div className="space-y-12">
            <motion.div className="flex items-center gap-4" variants={fadeUp}>
              <div
                className="h-10 w-1 rounded-full"
                style={{ background: "linear-gradient(180deg, #22d3ee, transparent)" }}
              />
              <h3 className="text-2xl font-bold text-txt-primary uppercase tracking-wider">
                {t("journey.educationLabel")}
              </h3>
            </motion.div>

            {/* Timeline Line */}
            <div
              className="relative grid gap-10 pl-6"
              style={{ borderLeft: "2px solid rgba(34, 211, 238, 0.2)" }}
            >
              {/* Glowing timeline dot */}
              <div
                className="absolute top-0 -left-[5px] w-2 h-2 rounded-full"
                style={{
                  background: "#22d3ee",
                  boxShadow: "0 0 10px #22d3ee, 0 0 20px rgba(34, 211, 238, 0.5)"
                }}
              />

              {education.map((edu, i) => (
                <TimelineCard
                  key={i}
                  title={edu.degree}
                  subtitle={edu.university}
                  period={edu.year}
                  description={edu.description}
                  type="edu"
                />
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="space-y-12">
            <motion.div className="flex items-center gap-4" variants={fadeUp}>
              <div
                className="h-10 w-1 rounded-full"
                style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
              />
              <h3 className="text-2xl font-bold text-txt-primary uppercase tracking-wider">
                {t("journey.experienceLabel")}
              </h3>
            </motion.div>

            {/* Timeline Line */}
            <div
              className="relative grid gap-10 pl-6"
              style={{ borderLeft: "2px solid rgba(168, 85, 247, 0.2)" }}
            >
              {/* Glowing timeline dot */}
              <div
                className="absolute top-0 -left-[5px] w-2 h-2 rounded-full"
                style={{
                  background: "#a855f7",
                  boxShadow: "0 0 10px #a855f7, 0 0 20px rgba(168, 85, 247, 0.5)"
                }}
              />

              {experience.map((exp, i) => (
                <TimelineCard
                  key={i}
                  title={exp.role}
                  subtitle={exp.place}
                  period={exp.period}
                  description={exp.description}
                  type="exp"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EducationExperience;