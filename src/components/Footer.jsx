import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

function Footer({ sections }) {
  const { t } = useTranslation();
  const tc = useThemeColors();
  const navKeys = ["home", "about", "journey", "stack", "work", "certifications", "contact"];

  const socialLinks = [
    { icon: Github, href: "https://github.com/jodx19", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mahmoud-mostafa-elsafi", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ma7moudmostafa19@gmail.com", label: "Email" },
  ];

  return (
    <footer
      className="relative py-12 px-6"
      style={{ background: tc.footerBg, borderTop: `1px solid ${tc.footerBorder}` }}
    >
      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${tc.accent}14 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                style={{ background: tc.logoBg, border: `1px solid ${tc.logoBorder}`, color: tc.accent }}
              >
                MM
              </span>
              <div>
                <p className="font-bold text-txt-primary">Mahmoud Mostafa</p>
                <p className="text-xs text-txt-tertiary">{t("footer.fullStackDev")}</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {sections.slice(0, 5).map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-txt-tertiary hover:text-accent transition-colors"
              >
                {t(`nav.${navKeys[idx]}`)}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex justify-center md:justify-end gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl transition-all"
                style={{
                  background: tc.cardBorder,
                  border: `1px solid ${tc.cardBorder}`,
                  color: "var(--color-text-secondary)",
                }}
                whileHover={{
                  borderColor: tc.accent,
                  color: tc.accent,
                  boxShadow: tc.socialHoverShadow,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${tc.accent}33, transparent)` }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-txt-tertiary">
          <p className="flex items-center gap-1">
            {t("footer.builtWith")} <Heart size={14} className="text-red-500 mx-1" /> {t("footer.using")}
          </p>
          <p>© {new Date().getFullYear()} Mahmoud Mostafa. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;