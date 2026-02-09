import { motion } from "framer-motion";
import { Code2, Database, Cpu, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "../motion/motion";

const iconMap = {
  frontend: <Code2 className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  devops: <Cpu className="h-5 w-5" />,
};

function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="relative overflow-visible">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
        }}
      />

      <motion.div
        className="relative z-10"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Header */}
        <motion.div className="mb-12 text-center" variants={fadeUp}>
          <p className="heading-accent flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Core Competencies
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight">
            My Technical <span className="text-cyan-400">Skills</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              className="group relative rounded-xl p-5 cursor-default transition-all duration-300"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)"
              }}
              variants={fadeUp}
              whileHover={{
                y: -6,
                rotateX: 2,
                rotateY: index % 2 === 0 ? 2 : -2,
                borderColor: "#22d3ee",
                boxShadow: "0 0 10px #22d3ee, 0 0 30px rgba(6, 182, 212, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <motion.span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all"
                    style={{
                      background: "rgba(34, 211, 238, 0.1)",
                      border: "1px solid rgba(34, 211, 238, 0.2)",
                      color: "#22d3ee"
                    }}
                    whileHover={{
                      boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)"
                    }}
                  >
                    {iconMap[skill.category] || <Sparkles className="h-5 w-5" />}
                  </motion.span>

                  <div>
                    <p className="text-base font-semibold text-txt-primary group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </p>
                    <p className="text-xs text-txt-tertiary">
                      {skill.categoryLabel}
                    </p>
                  </div>
                </div>

                {/* Skill Level Badge */}
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: skill.level === "Expert"
                      ? "rgba(34, 211, 238, 0.1)"
                      : "rgba(37, 99, 235, 0.1)",
                    border: `1px solid ${skill.level === "Expert"
                      ? "rgba(34, 211, 238, 0.3)"
                      : "rgba(37, 99, 235, 0.3)"}`,
                    color: skill.level === "Expert" ? "#22d3ee" : "#60a5fa"
                  }}
                >
                  {skill.level}
                </span>
              </div>

              <p className="mt-4 text-sm text-txt-secondary leading-relaxed">
                {skill.description}
              </p>

              {/* Subtle glow line at bottom */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, transparent, #22d3ee, transparent)"
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;