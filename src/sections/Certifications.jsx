import { motion } from "framer-motion";
import { FileBadge, Plus, ExternalLink, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

const VP = { once: true, amount: 0.15 };

const fadeUp = {
  hidden:  { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y:  0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const SPIRAL_DIRECTIONS = [
  "top-left", "top", "top-right",
  "bottom-left", "bottom", "bottom-right",
  "top-left" // 7th element loops around
];

const spiralVariant = (dir) => {
  const map = {
    "top-left":     { x: -60, y: -60, rotate: -10, scale: 0.7 },
    "top":          { x:   0, y: -70, rotate:   0, scale: 0.7 },
    "top-right":    { x:  60, y: -60, rotate:  10, scale: 0.7 },
    "bottom-left":  { x: -60, y:  60, rotate:  10, scale: 0.7 },
    "bottom":       { x:   0, y:  70, rotate:   0, scale: 0.7 },
    "bottom-right": { x:  60, y:  60, rotate: -10, scale: 0.7 },
  };
  const { x, y, rotate, scale } = map[dir] || map["bottom"];
  return {
    hidden:  { opacity: 0, x, y, rotate, scale },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };
};

const certLinks = [
  "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
  "https://drive.google.com/file/d/1zWaN9tm38Xdj0v03dH74JYILNVxB7t1q/view?usp=sharing",
  "https://drive.google.com/file/d/1L5PED2xaLnmWmLgH1h7QyoyHCpf8Fb1B/view?usp=drive_link",
  "https://drive.google.com/file/d/1yJ2PMMZ7LOV3wl-UvexTLXWT42wD-vC_/view?usp=drive_link",
  "https://drive.google.com/file/d/1MvnQhEw2baeM68IlfdQpDRF6SuQBwcnP/view?usp=drive_link",
  "https://drive.google.com/file/d/12nWX5QvyivlKTk2cYHaa7HKxqpbrXqxW/view?usp=drive_link",
  "https://drive.google.com/file/d/1m-MKQn8in13HXTxl0-kSAZKd_xjr8NB_/view?usp=drive_link",
];
const certDates = ["2025", "2024", "2025", "2024", "2024", "2025", "2024"];

function Certifications() {
  const { t } = useTranslation();
  const tc = useThemeColors();

  const certificates = certLinks.map((link, i) => ({
    title:     t(`certifications.cert${i + 1}Title`),
    issuer:    t(`certifications.cert${i + 1}Issuer`),
    date:      certDates[i],
    link,
    note:      t(`certifications.cert${i + 1}Note`),
    direction: SPIRAL_DIRECTIONS[i],
  }));

  return (
    <section id="certifications" className="relative py-12 md:py-16 px-6 overflow-visible">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 80%, ${tc.orbPrimary} 0%, transparent 50%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p className="heading-accent flex items-center gap-2" variants={fadeUp}>
            {/* Award icon with continuous float */}
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award className="h-4 w-4" />
            </motion.span>
            {t("certifications.label")}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight relative"
            variants={fadeUp}
          >
            {t("certifications.title")}{" "}
            <span style={{ color: tc.accent }} className="relative">
              {t("certifications.titleHighlight")}
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${tc.accent}40 50%, transparent 100%)`,
                  backgroundSize: "200% 100%",
                }}
                initial={{ backgroundPosition: "-200% 0" }}
                whileInView={{ backgroundPosition: "200% 0" }}
                viewport={VP}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              />
            </span>
          </motion.h2>
          <motion.p className="text-lg text-txt-secondary mt-4 max-w-2xl" variants={fadeUp}>
            {t("certifications.subtitle")}
          </motion.p>
        </motion.div>

        {/* Cert Grid — spiral reveal */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => {
            const variant = spiralVariant(cert.direction);
            return (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-3 p-4 sm:p-5 rounded-2xl"
                style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                transition={{ delay: i * 0.07 }}
                whileHover={{
                  scale: 1.02, zIndex: 5,
                  borderColor: tc.accent,
                  boxShadow: `0 0 10px ${tc.accent}, 0 0 30px ${tc.accent}4D`,
                }}
              >
                <div className="flex items-start justify-between">
                  <motion.div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: tc.iconBg, border: `1px solid ${tc.iconBorder}`, color: tc.iconColor }}
                    initial={{ rotate: -180, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={VP}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.07 }}
                    whileHover={{ background: tc.primaryGradient, color: tc.isDark ? "#0a0f1a" : "#fff", boxShadow: `0 0 20px ${tc.accent}66` }}
                  >
                    <FileBadge size={24} />
                  </motion.div>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: tc.cardBorder, border: `1px solid ${tc.cardBorder}`, color: "var(--color-text-tertiary)" }}
                  >
                    {cert.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-txt-primary group-hover:text-accent transition-colors">{cert.title}</h3>
                  <p className="text-sm font-medium" style={{ color: `${tc.accent}CC` }}>{cert.issuer}</p>
                </div>

                <p className="text-sm text-txt-secondary leading-relaxed">{cert.note}</p>

                <div className="mt-auto pt-3 flex items-center gap-2 text-sm font-bold" style={{ color: tc.accent }}>
                  <span>{t("certifications.viewCredentials")}</span>
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: tc.glowLine }}
                />
              </motion.a>
            );
          })}

          {/* Coming Soon */}
          <motion.div
            className="relative rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center group"
            style={{ border: `2px dashed ${tc.cardBorder}` }}
            variants={spiralVariant("bottom-right")}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            whileHover={{ borderColor: `${tc.accent}4D` }}
          >
            <motion.div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-txt-tertiary"
              style={{ background: tc.iconBg }}
              whileHover={{ color: tc.accent, rotate: 90 }}
              transition={{ duration: 0.5 }}
            >
              <Plus size={24} />
            </motion.div>
            <h3 className="text-sm font-bold text-txt-secondary">{t("certifications.comingSoonTitle")}</h3>
            <p className="text-xs text-txt-tertiary mt-1">{t("certifications.comingSoonDesc")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;