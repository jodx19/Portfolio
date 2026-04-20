import { motion } from "framer-motion";
import { FileBadge, Plus, ExternalLink, Award } from "lucide-react";
import { staggerContainer, fadeUp } from "../motion/motion";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

const certLinks = [
  "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
  "https://drive.google.com/file/d/1L5PED2xaLnmWmLgH1h7QyoyHCpf8Fb1B/view?usp=drive_link",
  "https://drive.google.com/file/d/1MvnQhEw2baeM68IlfdQpDRF6SuQBwcnP/view?usp=drive_link",
  "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
  "https://drive.google.com/file/d/1m-MKQn8in13HXTxl0-kSAZKd_xjr8NB_/view?usp=drive_link",
  "https://drive.google.com/file/d/12nWX5QvyivlKTk2cYHaa7HKxqpbrXqxW/view?usp=drive_link",
];
const certDates = ["2025", "2025", "2024", "2024", "2024", "2025"];

function Certifications() {
  const { t } = useTranslation();
  const tc = useThemeColors();

  const certificates = certLinks.map((link, i) => ({
    title: t(`certifications.cert${i + 1}Title`),
    issuer: t(`certifications.cert${i + 1}Issuer`),
    date: certDates[i],
    link,
    note: t(`certifications.cert${i + 1}Note`),
  }));

  return (
    <section id="certifications" className="relative py-16 md:py-24 px-6 overflow-visible">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 80%, ${tc.orbPrimary} 0%, transparent 50%)` }} />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="mb-10" variants={fadeUp}>
          <p className="heading-accent flex items-center gap-2">
            <Award className="h-4 w-4" />
            {t("certifications.label")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight">
            {t("certifications.title")}{" "}
            <span style={{ color: tc.accent }}>{t("certifications.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-txt-secondary mt-4 max-w-2xl">{t("certifications.subtitle")}</p>
        </motion.div>

        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
          {certificates.map((cert) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 ease-in-out"
              style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
              variants={fadeUp}
              whileHover={{
                scale: 1.02,
                zIndex: 5,
                borderColor: tc.accent,
                boxShadow: `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`,
              }}
            >
              <div className="flex items-start justify-between">
                {/* Icon */}
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-all"
                  style={{ background: tc.iconBg, border: `1px solid ${tc.iconBorder}`, color: tc.iconColor }}
                  whileHover={{ background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff", boxShadow: `0 0 20px ${tc.accent}66` }}
                >
                  <FileBadge size={24} />
                </motion.div>

                {/* Date badge */}
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: tc.cardBorder, border: `1px solid ${tc.cardBorder}`, color: "var(--color-text-tertiary)" }}
                >
                  {cert.date}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-txt-primary group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: `${tc.accent}CC` }}>{cert.issuer}</p>
              </div>

              <p className="text-sm text-txt-secondary leading-relaxed">{cert.note}</p>

              <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold" style={{ color: tc.accent }}>
                <span>{t("certifications.viewCredentials")}</span>
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: tc.glowLine }}
              />
            </motion.a>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            className="relative rounded-2xl p-6 flex flex-col items-center justify-center text-center group transition-all duration-300"
            style={{ border: `2px dashed ${tc.cardBorder}` }}
            variants={fadeUp}
            whileHover={{ borderColor: `${tc.accent}4D` }}
          >
            <motion.div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-txt-tertiary transition-all"
              style={{ background: tc.iconBg }}
              whileHover={{ color: tc.accent, rotate: 90 }}
              transition={{ duration: 0.5 }}
            >
              <Plus size={24} />
            </motion.div>
            <h3 className="text-sm font-bold text-txt-secondary">{t("certifications.comingSoonTitle")}</h3>
            <p className="text-xs text-txt-tertiary mt-1">{t("certifications.comingSoonDesc")}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Certifications;