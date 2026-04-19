import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  const tc = useThemeColors();

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Dark/Warm overlay with blur */}
            <div
              className="absolute inset-0"
              style={{
                background: tc.navBgTrans,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: tc.cardBgDeep,
                border: `1px solid ${tc.cardBorder}`,
                boxShadow: tc.cardHoverShadow,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl transition-all"
                style={{
                  background: tc.iconBg,
                  border: `1px solid ${tc.iconBorder}`,
                }}
                whileHover={{
                  borderColor: tc.accent,
                  boxShadow: `0 0 15px ${tc.accent}66`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} className="text-txt-secondary" />
              </motion.button>

              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: tc.isDark
                      ? "linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 50%)"
                      : "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, transparent 50%)",
                  }}
                />

                {/* Stack Badge */}
                {project.stackBadge && (
                  <span
                    className="absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: tc.primaryGradient,
                      color: tc.isDark ? "#0a0f1a" : "#fff",
                      boxShadow: `0 4px 15px ${tc.accent}66`,
                    }}
                  >
                    {project.stackBadge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-txt-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-txt-secondary mt-2 leading-relaxed">{project.description}</p>
                </div>

                {/* Detailed description */}
                {project.details && (
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: tc.iconBg,
                      border: `1px solid ${tc.iconBorder}`,
                    }}
                  >
                    <p className="text-sm text-txt-secondary leading-relaxed">
                      {project.details}
                    </p>
                  </div>
                )}

                {/* Tech Tags */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: tc.accent }}>
                    {t("projects.techStack")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          background: `${tc.accent}1A`,
                          border: `1px solid ${tc.accent}33`,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional Screenshots Gallery */}
                {project.images && project.images.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: tc.accent }}>
                      {t("projects.screenshots")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {project.images.map((img, index) => (
                        <motion.div
                          key={index}
                          className="relative aspect-video rounded-xl overflow-hidden group/img"
                          style={{ border: `1px solid ${tc.cardBorder}` }}
                          whileHover={{ scale: 1.02, borderColor: tc.accent }}
                        >
                          <img
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  className="flex gap-3 pt-4"
                  style={{ borderTop: `1px solid ${tc.cardBorder}` }}
                >
                  {(project.liveLink || project.demo) && (
                    <motion.a
                      href={project.liveLink || project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm"
                      style={{
                        background: tc.primaryGradient,
                        color: tc.isDark ? "#0a0f1a" : "#ffffff",
                      }}
                      whileHover={{
                        boxShadow: `0 0 20px ${tc.accent}66`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      {t("projects.liveDemo")}
                    </motion.a>
                  )}
                  {project.backendLink && (
                    <motion.a
                      href={project.backendLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm"
                      style={{
                        background: tc.iconBg,
                        border: `1px solid ${tc.iconBorder}`,
                        color: tc.accent,
                      }}
                      whileHover={{
                        background: `${tc.accent}33`,
                        borderColor: tc.accent,
                        boxShadow: `0 0 15px ${tc.accent}33`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      {t("projects.backendApi")}
                    </motion.a>
                  )}
                  {(project.githubLink || project.repo) && (
                    <motion.a
                      href={project.githubLink || project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${tc.cardBorder}`,
                        color: "var(--color-text-primary)",
                      }}
                      whileHover={{
                        borderColor: tc.accent,
                        boxShadow: `0 0 15px ${tc.accent}33`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      {t("projects.sourceCode")}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;