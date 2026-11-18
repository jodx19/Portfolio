import { useState, useCallback, Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { sections, skills, projects } from "./constants";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import useThemeColors from "./hooks/useThemeColors";

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

const sectionPadding = "py-8 md:py-12 scroll-mt-20";

/** Thin glowing gradient rule between every section pair */
function SectionDivider({ isDark }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1.5px",
        margin: "0 2%",
        background: isDark
          ? "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.10) 15%, rgba(34,211,238,0.45) 35%, rgba(34,211,238,0.65) 50%, rgba(34,211,238,0.45) 65%, rgba(34,211,238,0.10) 85%, transparent 100%)"
          : "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.25) 15%, rgba(15,23,42,0.60) 35%, rgba(37,99,235,0.80) 50%, rgba(15,23,42,0.60) 65%, rgba(37,99,235,0.25) 85%, transparent 100%)",
        boxShadow: isDark
          ? "0 0 8px rgba(34,211,238,0.30), 0 0 20px rgba(34,211,238,0.12)"
          : "0 0 8px rgba(37,99,235,0.45), 0 0 20px rgba(37,99,235,0.20)",
        pointerEvents: "none",
        position: "relative",
        zIndex: 2,
      }}
    />
  );
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  // isLoaded: true ONLY after loading screen fully exits
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const tc = useThemeColors();

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex justify-center selection:bg-accent/30 selection:text-accent transition-colors duration-400"
      style={{ backgroundColor: "var(--color-bg-outer)" }}
    >
      <div
        className="relative w-full max-w-[1440px] min-h-screen text-txt-primary shadow-[0_0_60px_rgba(0,0,0,0.4)] border-x border-brd-light/20 overflow-x-clip"
        style={{ backgroundColor: "var(--color-bg-0)" }}
      >
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
                <SectionDivider isDark={tc.isDark} />

                {/* 2. Projects (Work First) */}
                <section id="work" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
                    <Projects projects={projects} onSelect={setSelectedProject} />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 3. Services (Client Value & Solutions) */}
                <section id="services" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
                    <Services />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 4. Skills (Tech Stack) */}
                <section id="skills" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full px-4 sm:px-6">
                    <Skills skills={skills} />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 5. Journey (Experience & ITI Education) */}
                <section id="education" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
                    <Journey />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 6. About (Personal Story & Precision Mindset) */}
                <section id="about" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
                    <About />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 7. Certifications */}
                <section id="certifications" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
                    <Certifications />
                  </div>
                </section>
                <SectionDivider isDark={tc.isDark} />

                {/* 8. Contact */}
                <section id="contact" className={`${sectionPadding} overflow-visible`}>
                  <div className="w-full">
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