/**
 * ProjectsGrid — Enhanced with:
 *  - Responsive grid: 1 col (mobile) → 2 cols (md) → 3 cols (xl)
 *  - useScrollAnimation hook for smooth viewport-triggered entry
 */

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import ProjectCard from "../components/ProjectCard";
import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useThemeColors from "../hooks/useThemeColors";

function ProjectsGrid({ projects, onSelect }) {
  const { t } = useTranslation();
  const tc = useThemeColors();

  // Hook for the header
  const { ref: headerRef, controls: headerControls } = useScrollAnimation();
  // Hook for the grid
  const { ref: gridRef, controls: gridControls } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="relative px-6 overflow-visible">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${tc.orbPrimary} 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          className="mb-16 text-center"
          variants={fadeUp}
          initial="initial"
          animate={headerControls}
        >
          <p className="heading-accent flex items-center justify-center gap-2 tracking-[0.25em]">
            <Layers className="h-4 w-4" />
            {t("projects.label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-txt-primary mt-4 tracking-tight leading-tight">
            {t("projects.title")}{" "}
            <span style={{ color: tc.accent }}>{t("projects.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-txt-secondary mt-6 max-w-2xl mx-auto leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/*
          ── Projects Grid ────────────────────────────────────────────────
          Responsive breakpoints:
            - Mobile  (< md)  : 1 column — stacked, touch-friendly
            - Tablet  (md)    : 2 columns
            - Desktop (xl)    : 3 columns — maximum information density
        */}
        <motion.div
          ref={gridRef}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 [perspective:1000px]"
          variants={staggerContainer}
          initial="initial"
          animate={gridControls}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsGrid;