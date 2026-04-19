import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronRight, Play } from "lucide-react";
import { fadeUp } from "../motion/motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import useThemeColors from "../hooks/useThemeColors";

// Floating action overlay — slides up from image bottom on hover
const overlayVariants = {
  hidden:  { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
  exit:    { opacity: 0, y: "100%", transition: { duration: 0.25, ease: "easeIn" } },
};

function ProjectCard({ project, onSelect }) {
  const { t } = useTranslation();
  const tc = useThemeColors();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = project.images && project.images.length > 1;
  const currentImage = hasMultipleImages ? project.images[currentImageIndex] : project.image;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev === project.images.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, project.images]);

  const projectLink = project.liveLink || project.githubLink || "#";

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: tc.cardBg,
        border: `1px solid ${tc.cardBorder}`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      variants={fadeUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        borderColor: tc.cardHoverBorder,
        boxShadow: tc.cardHoverShadow,
        background: tc.cardHoverBg,
      }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Image Container ─────────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        {project.stackBadge && (
          <span
            className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-xl"
            style={{ background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff" }}
          >
            {project.stackBadge}
          </span>
        )}

        {/* Image — scales on hover */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage}
            srcSet={project.srcSet}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 1, scale: isHovered ? 1.12 : 1.04 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: isHovered ? 0.55 : 1, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Gradient overlay darkens on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: tc.isDark
            ? "linear-gradient(to top, rgba(10,15,26,0.95) 0%, rgba(10,15,26,0.4) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(255,247,237,0.92) 0%, rgba(255,247,237,0.3) 50%, transparent 100%)"
          }}
        />

        {/* ── Floating Action Buttons ─────────────────────────── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-3 px-4 pb-4"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
            >
              {/* View Demo */}
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold"
                  style={{
                    background: tc.primaryGradient,
                    color: tc.isDark ? "#0a0f1a" : "#fff",
                    boxShadow: `0 4px 12px ${tc.accent}66`,
                  }}
                  whileHover={{ scale: 1.06, boxShadow: `0 0 16px ${tc.accent}` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Play size={12} />
                  {t("projects.viewDemo") || "View Demo"}
                </motion.a>
              )}

              {/* Source Code */}
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold"
                  style={{
                    background: tc.isDark ? "rgba(255,255,255,0.12)" : `${tc.accent}18`,
                    border: `1px solid ${tc.isDark ? "rgba(255,255,255,0.20)" : `${tc.accent}40`}`,
                    color: tc.isDark ? "#fff" : tc.accent,
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    background: tc.isDark ? "rgba(255,255,255,0.22)" : `${tc.accent}28`,
                    borderColor: tc.accent,
                    scale: 1.06,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={12} />
                  {t("projects.sourceCode") || "Source Code"}
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card Content ─────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-txt-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.githubLink && (
              <motion.a href={project.githubLink} target="_blank" rel="noreferrer"
                className="text-txt-tertiary hover:text-txt-primary transition-colors"
                whileHover={{ scale: 1.1 }}>
                <Github size={20} />
              </motion.a>
            )}
          </div>
          <p className="text-sm text-txt-secondary line-clamp-3 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag}
              className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md transition-all tracking-wider"
              style={{
                background: `${tc.accent}0D`,
                border: `1px solid ${tc.accent}26`,
                color: `${tc.accent}CC`,
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom action row */}
        <div className="mt-auto flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${tc.cardBorder}` }}>
          <motion.a href={projectLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold group/link"
            style={{ color: tc.accent }}
            whileHover={{ x: 5 }}>
            <span>{t("projects.viewProject")}</span>
            <ExternalLink size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </motion.a>

          <motion.button onClick={() => onSelect(project)}
            className="flex items-center gap-1 text-xs font-bold text-txt-tertiary hover:text-accent transition-colors">
            <span>{t("projects.learnMore")}</span>
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-2/3 transition-all duration-700 ease-out"
        style={{ background: tc.glowLine, boxShadow: `0 0 10px ${tc.accent}` }}
      />
    </motion.article>
  );
}

export default ProjectCard;