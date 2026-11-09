import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Layers, ExternalLink } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("client"); // Default = "Client Work"

  const visibleProjects = projects.filter((p) => p.categories && p.categories.includes(activeTab));

  return (
    <section id="work" className="relative px-6 overflow-visible py-12 md:py-16 scroll-mt-24">
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-txt-primary mt-3 tracking-tight"
            variants={fadeUp}
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

        {/* ── Tab switcher — Client Work (default) / Engineering ── */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={fadeUp}
        >
          {["client", "engineering"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${isActive ? "shadow-lg" : "text-txt-secondary border bg-surface-1 hover:text-txt-primary"}`}
                style={isActive
                  ? { background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff" }
                  : { borderColor: tc.cardBorder }}
              >
                {t(`projects.tab${tab === "client" ? "Client" : "Engineering"}`)}
              </button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 [perspective:1200px]"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {visibleProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={flip3D}
              style={{ transformStyle: "preserve-3d" }}
            >
              {activeTab === "engineering" ? (
                /* Engineering tab — identical cards to before (tags, Learn More, API Docs if present) */
                <ProjectCard project={project} onSelect={onSelect} />
              ) : (
                /* Client tab — simple client-facing card */
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl"
                  style={{
                    background: tc.cardBg,
                    border: `1px solid ${tc.cardBorder}`,
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  {/* Screenshot — largest available image, fixed aspect container to avoid layout shift */}
                  <div className="aspect-video w-full overflow-hidden shrink-0">
                    <img
                      src={project.clientImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={project.clientImageW}
                      height={project.clientImageH}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-bold text-txt-primary">{project.title}</h3>
                    <p className="mt-2 text-sm text-txt-secondary leading-relaxed">
                      {t(`projects.clientDesc.${project.clientKey}`)}
                    </p>

                    <div className="mt-auto pt-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold"
                        style={{
                          background: tc.primaryGradient,
                          color: tc.isDark ? "#0a0f1a" : "#fff",
                          boxShadow: `0 4px 12px ${tc.accent}66`,
                        }}
                      >
                        <ExternalLink size={12} />
                        {t("projects.viewSite")}
                      </a>
                    </div>
                  </div>
                </article>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsGrid;