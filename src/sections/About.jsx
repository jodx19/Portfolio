import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import { aboutData } from "../constants";
import { useTranslation } from "react-i18next";
import useThemeColors from "../hooks/useThemeColors";

function About() {
  const { image } = aboutData;
  const { t } = useTranslation();
  const tc = useThemeColors();

  const title = t("about.title");
  const description = [t("about.description1"), t("about.description2")];
  const stats = [
    { title: t("about.stat1Title"), desc: t("about.stat1Desc"), icon: "🏢" },
    { title: t("about.stat2Title"), desc: t("about.stat2Desc"), icon: "🏗️" },
    { title: t("about.stat3Title"), desc: t("about.stat3Desc"), icon: "⚡" },
  ];

  return (
    <section id="about" className="relative px-6 overflow-visible py-16 md:py-24">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${tc.orbPrimary} 0%, transparent 50%)` }}
      />

      <motion.div
        className="relative z-10 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left — Photo */}
        <motion.div className="relative mx-auto lg:mx-0" variants={fadeUp}>
          {/* Pulsing glow blob */}
          <div
            className="absolute -inset-6 rounded-3xl"
            style={{ background: tc.photoBlobBg, filter: "blur(30px)", animation: "orb-pulse 3s ease-in-out infinite" }}
          />

          {/* Photo frame with neon border */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2"
            style={{ borderColor: tc.photoBorderColor, boxShadow: tc.photoBorderGlow }}
            whileHover={{ scale: 1.02, boxShadow: tc.photoHoverGlow }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image}
              alt="Mahmoud Mostafa"
              className="w-72 h-72 md:w-96 md:h-96 object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>

          {/* Decorative corner frames */}
          <div
            className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl"
            style={{ borderColor: tc.accent }}
          />
          <div
            className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl"
            style={{ borderColor: tc.accent }}
          />
        </motion.div>

        {/* Right — Content */}
        <div className="space-y-10">
          <motion.div variants={fadeUp}>
            <p className="heading-accent">{t("about.label")}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-txt-primary mt-4 leading-tight tracking-tight">
              {title}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            {description.map((para, i) => (
              <p
                key={i}
                className={`text-xl leading-relaxed ${i === 1 ? "text-txt-tertiary italic pl-6" : "text-txt-secondary"}`}
                style={i === 1 ? { borderLeft: `3px solid ${tc.accent}80` } : {}}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Value Proposition Cards */}
          <motion.div className="grid gap-6 sm:grid-cols-3" variants={staggerContainer}>
            {stats.map((item) => (
              <motion.div
                key={item.title}
                className="group relative rounded-3xl p-8 transition-all duration-300 ease-in-out cursor-default overflow-visible"
                style={{ background: tc.cardBg, border: `1px solid ${tc.cardBorder}`, backdropFilter: "blur(12px)" }}
                variants={fadeUp}
                whileHover={{
                  scale: 1.02,
                  zIndex: 5,
                  borderColor: tc.cardHoverBorder,
                  boxShadow: tc.cardHoverShadow,
                  background: tc.cardHoverBg,
                }}
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-txt-primary transition-colors text-xl" style={{ color: undefined }}>
                  <span className="group-hover:text-accent transition-colors">{item.title}</span>
                </h3>
                <p className="text-txt-tertiary text-base mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;