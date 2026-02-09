import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { fadeUp, badgeReveal } from "../motion/motion";

function ProjectCard({ project, onSelect }) {
  // Use liveLink if available, otherwise fallback to githubLink
  const projectLink = project.liveLink || project.githubLink || "#";

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-visible rounded-2xl transition-all duration-500"
      style={{
        background: "rgba(15, 23, 42, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)"
      }}
      variants={fadeUp}
      whileHover={{
        y: -10,
        borderColor: "rgba(34, 211, 238, 0.4)",
        boxShadow: "0 0 40px rgba(34, 211, 238, 0.15)",
        background: "rgba(15, 23, 42, 0.6)"
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        {/* Stack Badge */}
        {project.stackBadge && (
          <span
            className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-xl"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #2563eb)",
              color: "#0a0f1a"
            }}
          >
            {project.stackBadge}
          </span>
        )}

        {/* Project Image with zoom effect */}
        <motion.img
          src={project.image}
          srcSet={project.srcSet}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to top, rgba(10, 15, 26, 0.9) 0%, transparent 60%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-txt-primary group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-txt-tertiary hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={20} />
              </motion.a>
            )}
          </div>
          <p className="text-sm text-txt-secondary line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md transition-all tracking-wider"
              style={{
                background: "rgba(34, 211, 238, 0.05)",
                border: "1px solid rgba(34, 211, 238, 0.15)",
                color: "rgba(34, 211, 238, 0.8)"
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Section */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
          <motion.a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-cyan-400 group/link"
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <ExternalLink
              size={16}
              className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            />
          </motion.a>

          <motion.button
            onClick={() => onSelect(project)}
            className="flex items-center gap-1 text-xs font-bold text-txt-tertiary hover:text-cyan-400 transition-colors"
          >
            <span>Learn More</span>
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* Bottom glow line effect */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-2/3 transition-all duration-700 ease-out"
        style={{
          background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
          boxShadow: "0 0 15px #22d3ee"
        }}
      />
    </motion.article>
  );
}

export default ProjectCard;