import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer({ sections }) {
  const { t } = useTranslation();

  const navKeys = ["home", "about", "journey", "stack", "work", "certifications", "contact"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/jodx19", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mahmoud-mostafa-elsafi", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ma7moudmostafa19@gmail.com", label: "Email" },
  ];

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        background: "rgba(10, 15, 26, 0.8)",
        borderTop: "1px solid rgba(34, 211, 238, 0.1)"
      }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(34, 211, 238, 0.08) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(37, 99, 235, 0.15))",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  color: "#22d3ee"
                }}
              >
                MM
              </span>
              <div>
                <p className="font-bold text-txt-primary">Mahmoud Mostafa</p>
                <p className="text-xs text-txt-tertiary">{t("footer.fullStackDev")}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {sections.slice(0, 5).map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-txt-tertiary hover:text-cyan-400 transition-colors"
              >
                {t(`nav.${navKeys[idx]}`)}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--color-text-secondary)"
                }}
                whileHover={{
                  borderColor: "#22d3ee",
                  color: "#22d3ee",
                  boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
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
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent)"
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-txt-tertiary">
          <p className="flex items-center gap-1">
            {t("footer.builtWith")} <Heart size={14} className="text-red-500" /> {t("footer.using")}
          </p>
          <p>© {new Date().getFullYear()} Mahmoud Mostafa. {t("footer.rights")}</p>
        </div>

        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-xl z-50 transition-all"
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(34, 211, 238, 0.3)",
            color: "#22d3ee",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}
          whileHover={{
            borderColor: "#22d3ee",
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;