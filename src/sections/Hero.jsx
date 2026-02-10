import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../motion/motion";
import { ArrowDown, FileText } from "lucide-react";
import { socialLinks } from "../constants";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center pt-20 overflow-visible"
      style={{ background: "transparent" }}
    >
      {/* === AMBIENT ORBS === */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "rgba(34, 211, 238, 0.12)",
          filter: "blur(120px)",
          animation: "orb-pulse 4s ease-in-out infinite"
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "rgba(37, 99, 235, 0.1)",
          filter: "blur(120px)",
          animation: "orb-pulse 4s ease-in-out infinite 2s"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Status Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              background: "rgba(34, 211, 238, 0.1)",
              borderColor: "rgba(34, 211, 238, 0.2)"
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              {t("hero.status")}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg md:text-xl text-txt-tertiary font-medium">{t("hero.greeting")}</p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1] tracking-tighter">
              <span className="hero-title">{t("hero.firstName")}</span>
              <br />
              <span className="hero-title">{t("hero.lastName")}</span>
            </h1>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-txt-primary">
                {t("hero.role")}
              </p>
              <p className="text-lg md:text-xl text-cyan-400/80 font-medium tracking-wide">
                {t("hero.specialization")}
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-txt-tertiary max-w-2xl mx-auto leading-relaxed mt-8"
            variants={fadeUp}
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            variants={fadeUp}
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-5 rounded-xl font-bold flex items-center gap-2 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
                color: "#0a0f1a",
                boxShadow: "0 4px 20px rgba(34, 211, 238, 0.3)"
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px #22d3ee, 0 0 40px rgba(6, 182, 212, 0.47)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.ctaPrimary")}
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/Mahmoud_Mostafa_CV.pdf"
              className="btn-secondary px-10 py-5 rounded-xl font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.ctaSecondary")}
              <FileText className="h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-16"
            variants={fadeUp}
          >
            {socialLinks.map((social) => {
              const Icon = LucideIcons[social.icon];
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-brd-light bg-surface-1 text-txt-secondary transition-all"
                  whileHover={{
                    borderColor: "#22d3ee",
                    color: "#22d3ee",
                    boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.platform}
                >
                  {Icon && <Icon size={24} />}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-8 w-8 text-cyan-400/30" />
      </motion.div>
    </section>
  );
}

export default Hero;