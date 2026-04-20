/**
 * Contact Section — WhatsApp Click-to-Chat Form
 *
 * Fields  : Name, Email, Project Type (dropdown), Detailed Message
 * On Submit:
 *   1. Validates all fields (trims & checks empty)
 *   2. Constructs a formatted message string
 *   3. URL-encodes it and opens wa.me/{phone}?text={encodedMsg} in a new tab
 *
 * Visual  : Green WhatsApp CTA button with whatsappPulse Framer Motion animation
 * Security: Honeypot field to deter bots (hidden "company" field)
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Shield, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { staggerContainer, fadeUp, whatsappPulse } from "../motion/motion";
import { useTranslation } from "react-i18next";
import useScrollAnimation from "../hooks/useScrollAnimation";
import useThemeColors from "../hooks/useThemeColors";

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_PHONE = "201118286088"; // +20 (Egypt) 01118286088

const PROJECT_TYPES = [
  "Web Application",
  "Mobile Application",
  "UI/UX Design",
  "Backend Development",
  "Full-Stack Project",
  "Other",
];

const initialState = {
  name: "",
  email: "",
  projectType: "",
  message: "",
  company: "", // honeypot — must stay empty
};

// ─── Shared input focus/blur handlers ─────────────────────────────────────────
// Note: these are top-level functions, so they use CSS variables directly.
// The tc hook values are used inline inside the component for dynamic theming.
const focusStyleDark = (e) => {
  e.target.style.borderColor = "#22d3ee";
  e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.15), 0 0 10px rgba(34,211,238,0.30)";
};
const focusStyleLight = (e) => {
  e.target.style.borderColor = "#B45309";   /* amber-700 */
  e.target.style.boxShadow = "0 0 0 3px rgba(180,83,9,0.12), 0 0 8px rgba(180,83,9,0.10)";
};
const blurStyle = (e) => {
  e.target.style.borderColor = "";
  e.target.style.boxShadow = "none";
};

// ─── Shared input base style — built inside component using tc ─────────────────

// ─── WhatsApp SVG Icon (official brand green) ──────────────────────────────────
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const tc = useThemeColors();
  const { ref: sectionRef, controls } = useScrollAnimation();

  // Build input base style from tc
  const inputBase = {
    backgroundColor: tc.isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(254, 250, 244, 1.00)", // Off-white in light mode
    border: `1px solid ${tc.isDark ? tc.cardBorder : "rgba(146, 64, 14, 0.20)"}`,
  };
  const focusStyle = tc.isDark ? focusStyleDark : focusStyleLight;
  const blurStyleFn = (e) => {
    e.target.style.borderColor = tc.cardBorder;
    e.target.style.boxShadow = "none";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.projectType) newErrors.projectType = "Please select a project type.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  // ── WhatsApp Submit Logic ─────────────────────────────────────────────────
  const handleWhatsApp = (e) => {
    e.preventDefault();

    // Honeypot — abort silently if bot filled the hidden field
    if (form.company) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // Construct the pre-filled WhatsApp message
    const whatsappMessage =
      `Hi Mahmoud! I'm ${form.name.trim()}.\n` +
      `I have a *${form.projectType}* request.\n\n` +
      `Message: ${form.message.trim()}\n\n` +
      `You can reach me at: ${form.email.trim()}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Success feedback + reset form
    toast.success("Opening WhatsApp — see you there! 🚀");
    setForm(initialState);
    setErrors({});
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/jodx19", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mahmoud-mostafa-elsafi",
      label: "LinkedIn",
    },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-24 px-6 overflow-visible">
      {/* Background radial glow decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
        }}
      />

      <motion.div
        ref={sectionRef}
        className="relative z-10 container mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        viewport={{ once: true }}
      >
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div className="mb-12 text-center" variants={fadeUp}>
          <p className="heading-accent tracking-[0.25em]">{t("contact.label")}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-txt-primary mt-4 tracking-tight leading-tight">
            {t("contact.title")}{" "}
            <span className="text-cyan-400">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-txt-secondary mt-6 max-w-2xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* ── Contact Info Card ──────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-between p-8 space-y-8 rounded-2xl"
            style={{
              background: tc.cardBgDeep,
              border: `1px solid ${tc.cardBorder}`,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            variants={fadeUp}
          >
            <div>
              <h3 className="text-2xl font-bold text-txt-primary mb-8">
                {t("contact.infoTitle")}
              </h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, text: t("contact.phone"), href: "tel:01118286088" },
                  {
                    icon: Mail,
                    text: t("contact.email"),
                    href: "mailto:ma7moudmostafa19@gmail.com",
                  },
                  { icon: MapPin, text: t("contact.location"), href: null },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-4 text-txt-secondary group/info"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-all shrink-0"
                      style={{
                        background: tc.iconBg,
                        border: `1px solid ${tc.iconBorder}`,
                        color: tc.iconColor,
                      }}
                      whileHover={{ boxShadow: `0 0 15px ${tc.accent}66` }}
                    >
                      <item.icon size={18} />
                    </motion.div>
                    {item.href ? (
                      <a href={item.href} className="hover:text-accent transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-txt-tertiary">{t("contact.followMe")}</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
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

            <div
              className="pt-6 flex items-center gap-3 text-sm text-txt-tertiary"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
            >
              <Shield size={18} className="text-cyan-400 shrink-0" />
              <span>{t("contact.secureNote")}</span>
            </div>
          </motion.div>

          {/* ── WhatsApp Form Card ─────────────────────────────────────────── */}
          <motion.form
            onSubmit={handleWhatsApp}
            noValidate
            className="p-8 space-y-5 rounded-2xl"
            style={{
              background: tc.cardBgDeep,
              border: `1px solid ${tc.cardBorder}`,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            variants={fadeUp}
          >
            {/* ── Row: Name + Email ──────────────────────────────────────── */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="wa-name" className="text-sm font-medium text-txt-secondary ml-1">
                  {t("contact.labelName")} <span style={{ color: tc.accent }}>*</span>
                </label>
                <input
                  id="wa-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyleFn}
                  placeholder={t("contact.placeholderName")}
                  className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none placeholder:text-txt-tertiary/50"
                  style={inputBase}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 ml-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="wa-email" className="text-sm font-medium text-txt-secondary ml-1">
                  {t("contact.labelEmail")} <span style={{ color: tc.accent }}>*</span>
                </label>
                <input
                  id="wa-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={focusStyle}
                  onBlur={blurStyleFn}
                  placeholder={t("contact.placeholderEmail")}
                  className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none placeholder:text-txt-tertiary/50"
                  style={inputBase}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 ml-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* ── Project Type Dropdown ─────────────────────────────────── */}
            <div className="space-y-2">
              <label htmlFor="wa-projectType" className="text-sm font-medium text-txt-secondary ml-1">
                Project Type <span style={{ color: tc.accent }}>*</span>
              </label>
              <select
                id="wa-projectType"
                name="projectType"
                required
                value={form.projectType}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyleFn}
                className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none appearance-none cursor-pointer"
                style={{
                  ...inputBase,
                  color: form.projectType ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                  paddingRight: "40px",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${tc.isDark ? "22d3ee" : "B45309"}' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="" disabled style={{ background: tc.isDark ? "#0a0f1a" : "#fef3c7", color: tc.isDark ? "#64748b" : "#9ca3af" }}>
                  — Select a project type —
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                    style={{ background: tc.isDark ? "#0a1628" : "#ffffff", color: tc.isDark ? "#f1f5f9" : "#1c1917" }}
                  >
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-xs text-red-400 ml-1">{errors.projectType}</p>
              )}
            </div>

            {/* ── Detailed Message ──────────────────────────────────────── */}
            <div className="space-y-2">
              <label htmlFor="wa-message" className="text-sm font-medium text-txt-secondary ml-1">
                {t("contact.labelMessage")} <span style={{ color: tc.accent }}>*</span>
              </label>
              <textarea
                id="wa-message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyleFn}
                rows={5}
                placeholder="Describe your project in detail — goals, timeline, tech stack preferences..."
                className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none resize-none placeholder:text-txt-tertiary/50"
                style={inputBase}
              />
              {errors.message && (
                <p className="text-xs text-red-400 ml-1">{errors.message}</p>
              )}
            </div>

            {/* Honeypot — invisible; bots fill it, humans don't */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            {/* ── WhatsApp Submit Button ────────────────────────────────── */}
            <div className="flex justify-end pt-2">
              {/*
                whatsappPulse drives a pulsating green boxShadow glow loop
                to make the CTA unmissable as the primary action.
              */}
              <motion.button
                type="submit"
                id="whatsapp-submit-btn"
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white transition-colors"
                style={{
                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                  cursor: "pointer",
                }}
                animate={whatsappPulse.animate}
                whileHover={{
                  scale: 1.03,
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow:
                    "0 0 20px rgba(34, 197, 94, 0.6), 0 0 50px rgba(22, 163, 74, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon size={20} />
                <span>Send via WhatsApp</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactForm;