import { useState } from "react";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import { sections, skills, projects } from "./constants";

// Section Components
import Hero from "./sections/Hero";
import About from "./sections/About";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Certifications from "./sections/Certifications";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

// UI Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Common padding class for sections
  const sectionPadding = "py-24 md:py-32";

  return (
    <div className="relative min-h-screen bg-slate-950 bg-fixed bg-cover bg-no-repeat text-txt-primary selection:bg-accent/30 selection:text-accent">
      {/* Toast Notifications */}
      <Toaster position="bottom-right" richColors theme="dark" />

      {/* Navigation */}
      <Navbar sections={sections} />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <section id="about" className={`${sectionPadding} overflow-visible`}>
          <div className="mx-auto max-w-7xl">
            <About />
          </div>
        </section>

        {/* 3. Journey (Education & Experience) */}
        <section id="education" className={`bg-surface-0 ${sectionPadding} border-y border-brd-light overflow-visible`}>
          <div className="mx-auto max-w-7xl">
            <Journey />
          </div>
        </section>

        {/* 4. Skills Section */}
        <section id="skills" className={`${sectionPadding} overflow-visible`}>
          <div className="mx-auto max-w-7xl px-6">
            <Skills skills={skills} />
          </div>
        </section>

        {/* 5. Projects Grid */}
        <section id="projects" className={`${sectionPadding} overflow-visible`}>
          <div className="mx-auto max-w-7xl">
            <Projects projects={projects} onSelect={setSelectedProject} />
          </div>
        </section>

        {/* 6. Certifications */}
        <section id="certifications" className={`bg-surface-0 ${sectionPadding} border-y border-brd-light overflow-visible`}>
          <div className="mx-auto max-w-7xl">
            <Certifications />
          </div>
        </section>

        {/* 7. Contact Form */}
        <section id="contact" className={`bg-surface-0 ${sectionPadding} border-t border-brd-light overflow-visible`}>
          <div className="mx-auto max-w-7xl">
            <Contact />
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <Footer sections={sections} />

      {/* Project Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;