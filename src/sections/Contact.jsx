import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Shield, Send, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { staggerContainer, fadeUp } from "../motion/motion";
import { useTranslation } from "react-i18next";

const initialState = { name: "", email: "", phone: "", message: "", company: "" };

function ContactForm() {
  const formRef = useRef();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.company) return; // Honeypot trap

    setLoading(true);

    // EmailJS Keys
    const SERVICE_ID = "service_ers1qoz";
    const TEMPLATE_ID = "template_1wp7lte";
    const PUBLIC_KEY = "Kv0OY7N28AL3vsT5D";

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      toast.success(t("contact.successToast"));
      setForm(initialState);
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error(t("contact.errorToast"));
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/jodx19", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mahmoud-mostafa-elsafi", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 overflow-visible">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
        }}
      />

      <motion.div
        className="relative z-10 container mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="mb-12 text-center" variants={fadeUp}>
          <p className="heading-accent">{t("contact.label")}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-txt-primary mt-3 tracking-tight">
            {t("contact.title")} <span className="text-cyan-400">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-txt-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Contact Info Card */}
          <motion.div
            className="flex flex-col justify-between p-8 space-y-8 rounded-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)"
            }}
            variants={fadeUp}
          >
            <div>
              <h3 className="text-xl font-bold text-txt-primary mb-6">
                {t("contact.infoTitle")}
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, text: t("contact.phone"), href: "tel:01118286088" },
                  { icon: Mail, text: t("contact.email"), href: "mailto:ma7moudmostafa19@gmail.com" },
                  { icon: MapPin, text: t("contact.location"), href: null },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-4 text-txt-secondary group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                      style={{
                        background: "rgba(34, 211, 238, 0.1)",
                        border: "1px solid rgba(34, 211, 238, 0.2)",
                        color: "#22d3ee"
                      }}
                      whileHover={{
                        boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)"
                      }}
                    >
                      <item.icon size={18} />
                    </motion.div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-cyan-400 transition-colors"
                      >
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

            <div
              className="pt-6 flex items-center gap-3 text-sm text-txt-tertiary"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
            >
              <Shield size={18} className="text-cyan-400" />
              <span>{t("contact.secureNote")}</span>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 space-y-5 rounded-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)"
            }}
            variants={fadeUp}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-txt-secondary ml-1">{t("contact.labelName")}</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none placeholder:text-txt-tertiary/50"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#22d3ee";
                    e.target.style.boxShadow = "0 0 0 3px rgba(34, 211, 238, 0.15), 0 0 10px #22d3ee";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder={t("contact.placeholderName")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-txt-secondary ml-1">{t("contact.labelEmail")}</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none placeholder:text-txt-tertiary/50"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#22d3ee";
                    e.target.style.boxShadow = "0 0 0 3px rgba(34, 211, 238, 0.15), 0 0 10px #22d3ee";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder={t("contact.placeholderEmail")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-txt-secondary ml-1">{t("contact.labelPhone")}</label>
              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl pl-11 pr-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none placeholder:text-txt-tertiary/50"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#22d3ee";
                    e.target.style.boxShadow = "0 0 0 3px rgba(34, 211, 238, 0.15), 0 0 10px #22d3ee";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder={t("contact.placeholderPhone")}
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-txt-tertiary group-focus-within:text-cyan-400 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-txt-secondary ml-1">{t("contact.labelMessage")}</label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-txt-primary transition-all duration-200 focus:outline-none resize-none placeholder:text-txt-tertiary/50"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22d3ee";
                  e.target.style.boxShadow = "0 0 0 3px rgba(34, 211, 238, 0.15), 0 0 10px #22d3ee";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder={t("contact.placeholderMessage")}
              />
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="flex justify-end pt-2">
              <motion.button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all"
                style={{
                  background: loading
                    ? "rgba(34, 211, 238, 0.3)"
                    : "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
                  color: "#0a0f1a",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 4px 20px rgba(34, 211, 238, 0.3)"
                }}
                whileHover={!loading ? {
                  scale: 1.02,
                  boxShadow: "0 0 10px #22d3ee, 0 0 30px rgba(6, 182, 212, 0.47)"
                } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-slate-800/30 border-t-slate-800 rounded-full animate-spin" />
                    {t("contact.sending")}
                  </span>
                ) : (
                  <>
                    <Send size={18} />
                    {t("contact.sendMessage")}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactForm;