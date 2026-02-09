import { motion } from "framer-motion";
import { FileBadge, Plus, ExternalLink, Award } from "lucide-react";
import { staggerContainer, fadeUp } from "../motion/motion";

const certificates = [
  {
    title: "Full Stack Web Development Using .NET",
    issuer: "Information Technology Institute (ITI)",
    date: "2025",
    link: "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
    note: "Intensive professional track covering Advanced .NET, Angular, and SQL Server architecture.",
  },
  {
    title: "OpenAI GPTs: Creating Custom AI Assistants",
    issuer: "Vanderbilt University (via Coursera)",
    date: "2025",
    link: "https://drive.google.com/file/d/1L5PED2xaLnmWmLgH1h7QyoyHCpf8Fb1B/view?usp=drive_link",
    note: "Advanced certification in prompt engineering and building specialized AI-driven solutions.",
  },
  {
    title: "Mastering OOP using C++",
    issuer: "ITI (Mahara-Tech)",
    date: "2024",
    link: "https://drive.google.com/file/d/1MvnQhEw2baeM68IlfdQpDRF6SuQBwcnP/view?usp=drive_link",
    note: "Deep dive into Object-Oriented Programming principles, memory management, and C++ efficiency.",
  },
  {
    title: ".Net Full Stack Foundation",
    issuer: "ITI",
    date: "2024",
    link: "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
    note: "Foundational mastery of the .NET ecosystem and full-stack integration workflows.",
  },
  {
    title: "Freelancing Basics",
    issuer: "Mahara-Tech",
    date: "2024",
    link: "https://drive.google.com/file/d/1m-MKQn8in13HXTxl0-kSAZKd_xjr8NB_/view?usp=drive_link",
    note: "Strategic skills for project management and client communication in the digital market.",
  },
  {
    title: "Database Fundamentals",
    issuer: "Mahara-Tech (ITI)",
    date: "2025",
    link: "https://drive.google.com/file/d/12nWX5QvyivlKTk2cYHaa7HKxqpbrXqxW/view?usp=drive_link",
    note: "Verified mastery of relational database design, SQL querying, and data normalization.",
  },

];

function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 px-6 overflow-visible">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div className="mb-12" variants={fadeUp}>
          <p className="heading-accent flex items-center gap-2">
            <Award className="h-4 w-4" />
            Credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight">
            Certifications & <span className="text-cyan-400">Diplomas</span>
          </h2>
          <p className="text-lg text-txt-secondary mt-4 max-w-2xl">
            My official certifications and verified qualifications that back my expertise.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {certificates.map((cert) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)"
              }}
              variants={fadeUp}
              whileHover={{
                y: -6,
                borderColor: "#22d3ee",
                boxShadow: "0 0 10px #22d3ee, 0 0 30px rgba(6, 182, 212, 0.3)"
              }}
            >
              <div className="flex items-start justify-between">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-all"
                  style={{
                    background: "rgba(34, 211, 238, 0.1)",
                    border: "1px solid rgba(34, 211, 238, 0.2)",
                    color: "#22d3ee"
                  }}
                  whileHover={{
                    background: "linear-gradient(135deg, #22d3ee, #2563eb)",
                    color: "#0a0f1a",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                  }}
                >
                  <FileBadge size={24} />
                </motion.div>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "var(--color-text-tertiary)"
                  }}
                >
                  {cert.date}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-txt-primary group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400/80">{cert.issuer}</p>
              </div>

              <p className="text-sm text-txt-secondary leading-relaxed">
                {cert.note}
              </p>

              <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold text-cyan-400">
                <span>View Credentials</span>
                <ExternalLink
                  size={14}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, transparent, #22d3ee, transparent)"
                }}
              />
            </motion.a>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            className="relative rounded-2xl p-6 flex flex-col items-center justify-center text-center group transition-all duration-300"
            style={{
              border: "2px dashed rgba(255, 255, 255, 0.1)",
            }}
            variants={fadeUp}
            whileHover={{
              borderColor: "rgba(34, 211, 238, 0.3)"
            }}
          >
            <motion.div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-txt-tertiary transition-all"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
              whileHover={{
                color: "#22d3ee",
                rotate: 90
              }}
              transition={{ duration: 0.5 }}
            >
              <Plus size={24} />
            </motion.div>
            <h3 className="text-sm font-bold text-txt-secondary">More Coming Soon</h3>
            <p className="text-xs text-txt-tertiary mt-1">AWS Cloud & Docker in progress...</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Certifications;