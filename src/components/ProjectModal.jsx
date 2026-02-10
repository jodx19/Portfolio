import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
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
            {/* Dark overlay with blur */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(10, 15, 26, 0.9)",
                backdropFilter: "blur(8px)"
              }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.15), 0 25px 50px rgba(0, 0, 0, 0.5)"
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
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
                whileHover={{
                  borderColor: "#22d3ee",
                  boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
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
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 50%)"
                  }}
                />

                {/* Stack Badge */}
                <span
                  className="absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, #22d3ee, #2563eb)",
                    color: "#0a0f1a",
                    boxShadow: "0 4px 15px rgba(34, 211, 238, 0.4)"
                  }}
                >
                  {project.stackBadge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-txt-primary">{project.title}</h2>
                  <p className="text-txt-secondary mt-2 leading-relaxed">{project.description}</p>
                </div>

                {/* Detailed description */}
                {project.details && (
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(34, 211, 238, 0.05)",
                      border: "1px solid rgba(34, 211, 238, 0.1)"
                    }}
                  >
                    <p className="text-sm text-txt-secondary leading-relaxed">
                      {project.details}
                    </p>
                  </div>
                )}

                {/* Tech Tags */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                    {t("projects.techStack")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          background: "rgba(34, 211, 238, 0.1)",
                          border: "1px solid rgba(34, 211, 238, 0.2)",
                          color: "var(--color-text-secondary)"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{
                        background: "linear-gradient(135deg, #22d3ee, #2563eb)",
                        color: "#0a0f1a"
                      }}
                      whileHover={{
                        boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      {t("projects.liveDemo")}
                    </motion.a>
                  )}
                  {project.repo && (
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "var(--color-text-primary)"
                      }}
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)"
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