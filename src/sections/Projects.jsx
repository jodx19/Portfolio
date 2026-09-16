import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

const VP = { once: true, amount: 0.05 };

const flip3D = {
  hidden:  { opacity: 0, rotateY: 90, z: -80, scale: 0.88 },
  visible: { opacity: 1, rotateY:  0, z:   0, scale: 1,    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y:  0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const glitch = {
  hidden:  { opacity: 0, x: -10, skewX: -8 },
  visible: { opacity: 1, x:   0, skewX:  0, transition: { duration: 0.45, ease: "easeOut" } },
};

function ProjectsGrid({ projects, onSelect }) {
  const { t } = useTranslation();
  const tc = useThemeColors();

  return (
    <section className="relative px-6 overflow-visible py-12 md:py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${tc.orbPrimary} 0%, transparent 50%)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            className="heading-accent flex items-center justify-center gap-2 tracking-[0.25em]"
            variants={fadeUp}
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Layers className="h-4 w-4" />
            </motion.span>
            {t("projects.label")}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-txt-primary mt-4 tracking-tight leading-tight"
            variants={glitch}
          >
            {t("projects.title")}{" "}
            <span style={{ color: tc.accent }}>{t("projects.titleHighlight")}</span>
          </motion.h2>
          <motion.p
            className="text-xl text-txt-secondary mt-6 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        {/* 3D Flip Grid */}
        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 [perspective:1200px]"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={flip3D}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ProjectCard project={project} onSelect={onSelect} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsGrid;