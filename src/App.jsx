import { useState, useCallback, Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { sections, skills, projects } from "./constants";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Section Components
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Skills from "./sections/Skills";
import Journey from "./sections/Journey";
import About from "./sections/About";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

// UI Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";
import ScrollToTop from "./components/ScrollToTop";
import StickyWhatsApp from "./components/StickyWhatsApp";
import LoadingScreen from "./components/LoadingScreen";

import ParticleBackground from "./components/ParticleBackground";

const sectionPadding = "py-20 md:py-32";

function AppContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  // isLoaded: true ONLY after loading screen fully exits
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen text-txt-primary selection:bg-accent/30 selection:text-accent">
      {/* ── Loading Screen (Terminal Boot) ── */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* ── 3D Particle Background (Three.js) — rendered only after load ── */}
      {isLoaded && <ParticleBackground />}

      {/* ── Toast Notifications ── */}
      <Toaster position="bottom-right" richColors theme={theme} />

      {/*
        key={isLoaded ? 1 : 0} forces Navbar & main to RE-MOUNT
        after the loading screen exits, so all entrance animations
        fire from scratch — not during the hidden loading period.
      */}
      {isLoaded && (
        <>
          {/* ── Navigation ── */}
          <Navbar sections={sections} />

          {/* ── Page fade-in wrapper ── */}
          <motion.div
            key="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <main style={{ position: "relative", zIndex: 1 }}>
              {/* 1. Hero */}
              <Hero />

              {/* 2. Projects (Work First) */}
              <section id="work" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <Projects projects={projects} onSelect={setSelectedProject} />
                </div>
              </section>

              {/* 3. Services (Client Value & Solutions) */}
              <section id="services" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <Services />
                </div>
              </section>

              {/* 4. Skills (Tech Stack) */}
              <section id="skills" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl px-6">
                  <Skills skills={skills} />
                </div>
              </section>

              {/* 5. Journey (Experience & ITI Education) */}
              <section id="education" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <Journey />
                </div>
              </section>

              {/* 6. About (Personal Story & Precision Mindset) */}
              <section id="about" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <About />
                </div>
              </section>

              {/* 7. Certifications */}
              <section id="certifications" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <Certifications />
                </div>
              </section>

              {/* 8. Contact */}
              <section id="contact" className={`${sectionPadding} overflow-visible`}>
                <div className="mx-auto max-w-7xl">
                  <Contact />
                </div>
              </section>
            </main>

            {/* Footer */}
            <Footer sections={sections} />
          </motion.div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>

          {/* Floating WhatsApp Action Button */}
          <StickyWhatsApp />

          {/* Scroll to Top */}
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;