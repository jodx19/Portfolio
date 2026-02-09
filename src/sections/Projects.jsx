import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import ProjectCard from "../components/ProjectCard";
import { Layers } from "lucide-react";

function ProjectsGrid({ projects, onSelect }) {
  return (
    <section className="relative px-6 overflow-visible">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
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
            <Layers className="h-4 w-4" />
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-lg text-txt-secondary mt-4 max-w-2xl mx-auto">
            A selection of my recent work showcasing full-stack development with modern technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProjectsGrid;