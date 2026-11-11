import { motion } from "framer-motion";
import { Server, ShoppingCart, Zap, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";
import { contactInfo } from "../constants";

const VP = { once: true, amount: 0.1 };

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export default function Services() {
  const { t, i18n } = useTranslation();
  const tc = useThemeColors();
  const isRtl = i18n.language === "ar";

  const phone = `20${(contactInfo?.phone || "01118286088").replace(/^0/, "")}`;

  const services = [
    {
      key: "saasAndWebApps",
      icon: Server,
      accentGradient: "from-cyan-500/20 to-blue-500/10",
      accentBorder: "rgba(6, 182, 212, 0.3)",
      badge: isRtl ? "أنظمة سحابية متقدمة" : "Enterprise Grade",
      title: t("services.saasTitle"),
      desc: t("services.saasDesc"),
      features: [
        t("services.saasF1"),
        t("services.saasF2"),
        t("services.saasF3"),
      ],
      whatsappMsg: isRtl
        ? "مرحباً محمود! مهتم بتطوير نظام/تطبيق ويب متكامل (SaaS/ERP) وأود مناقشة تفاصيل الفكرة."
        : "Hi Mahmoud! I'm interested in building a custom SaaS / Web Application and would like to discuss it.",
    },
    {
      key: "ecommerce",
      icon: ShoppingCart,
      accentGradient: "from-emerald-500/20 to-teal-500/10",
      accentBorder: "rgba(16, 185, 129, 0.3)",
      badge: isRtl ? "متاجر وتحويل مبيعات" : "Revenue Focused",
      title: t("services.ecomTitle"),
      desc: t("services.ecomDesc"),
      features: [
        t("services.ecomF1"),
        t("services.ecomF2"),
        t("services.ecomF3"),
      ],
      whatsappMsg: isRtl
        ? "مرحباً محمود! أود إنشاء متجر إلكتروني احترافي مع إدارة مخزون وبوابات دفع."
        : "Hi Mahmoud! I would like to build an e-commerce platform with inventory and payment integration.",
    },
    {
      key: "landingPages",
      icon: Zap,
      accentGradient: "from-amber-500/20 to-orange-500/10",
      accentBorder: "rgba(245, 158, 11, 0.3)",
      badge: isRtl ? "سرعة وتحويل عالي" : "High Conversion",
      title: t("services.landingTitle"),
      desc: t("services.landingDesc"),
      features: [
        t("services.landingF1"),
        t("services.landingF2"),
        t("services.landingF3"),
      ],
      whatsappMsg: isRtl
        ? "مرحباً محمود! أحتاج لصفحة هبوط تسويقية سريعة وحديثة لحملتي الإعلانية."
        : "Hi Mahmoud! I need a fast, high-converting landing page for our business/campaign.",
    },
    {
      key: "backendAndApi",
      icon: Layers,
      accentGradient: "from-indigo-500/20 to-purple-500/10",
      accentBorder: "rgba(99, 102, 241, 0.3)",
      badge: isRtl ? "أمان ومعمارية نظيفة" : "Clean Architecture",
      title: t("services.apiTitle"),
      desc: t("services.apiDesc"),
      features: [
        t("services.apiF1"),
        t("services.apiF2"),
        t("services.apiF3"),
      ],
      whatsappMsg: isRtl
        ? "مرحباً محمود! أود مناقشة بناء أو تطوير Backend و Restful APIs بتقنية .NET Core وقواعد بيانات سريعة."
        : "Hi Mahmoud! I want to discuss building scalable .NET Core Web APIs and clean backend architecture.",
    },
  ];

  return (
    <section id="services" className="relative py-16 md:py-24 px-6 overflow-visible scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={fadeUp}
        >
          <p
            className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: tc.accent }}
          >
            {t("services.badge")}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-txt-primary tracking-tight">
            {t("services.heading")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-txt-secondary max-w-2xl mx-auto leading-relaxed">
            {t("services.subheading")}
          </p>
        </motion.div>

        {/* Bento Grid Services Cards */}
        <motion.div
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={staggerContainer}
        >
          {services.map((srv) => {
            const Icon = srv.icon;
            const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(srv.whatsappMsg)}`;

            return (
              <motion.article
                key={srv.key}
                variants={fadeUp}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 md:p-8 transition-all duration-300"
                style={{
                  background: tc.cardBg,
                  border: `1px solid ${tc.cardBorder}`,
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: tc.cardHoverShadow,
                }}
                whileHover={{
                  y: -6,
                  borderColor: tc.accent,
                }}
              >
                {/* Glow accent in corner */}
                <div
                  className={`pointer-events-none absolute -top-24 ${
                    isRtl ? "-left-24" : "-right-24"
                  } w-48 h-48 rounded-full bg-gradient-to-br ${srv.accentGradient} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div>
                  {/* Top row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-3.5 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: tc.iconBg,
                        border: `1px solid ${srv.accentBorder}`,
                        color: tc.accent,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${tc.accent}14`,
                        color: tc.accent,
                        border: `1px solid ${tc.accent}33`,
                      }}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-txt-primary group-hover:text-accent transition-colors duration-200">
                    {srv.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-txt-secondary leading-relaxed">
                    {srv.desc}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="mt-5 space-y-2.5">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-txt-secondary">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: tc.accent }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-7 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${tc.cardBorder}` }}>
                  <span className="text-xs font-semibold text-txt-tertiary">
                    {t("services.customConsultation")}
                  </span>

                  <motion.a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-200"
                    style={{
                      background: tc.primaryGradient,
                      color: tc.isDark ? "#0a0f1a" : "#fff",
                      boxShadow: `0 4px 12px ${tc.accent}40`,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>{t("services.discussProject")}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

