import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motion/motion";
import { aboutData } from "../constants";
import { useTranslation } from "react-i18next";

function About() {
  const { image } = aboutData;
  const { t } = useTranslation();

  const title = t("about.title");
  const description = [t("about.description1"), t("about.description2")];
  const stats = [
    { title: t("about.stat1Title"), desc: t("about.stat1Desc"), icon: "🏢" },
    { title: t("about.stat2Title"), desc: t("about.stat2Desc"), icon: "🏗️" },
    { title: t("about.stat3Title"), desc: t("about.stat3Desc"), icon: "⚡" },
  ];

  return (
    <section id="about" className="relative px-6 overflow-visible py-24 md:py-32">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)"
        }}
      />

      <motion.div
        className="relative z-10 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Column - Photo */}
        <motion.div className="relative mx-auto lg:mx-0" variants={fadeUp}>
          {/* Pulsing glow background */}
          <div
            className="absolute -inset-6 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(37, 99, 235, 0.15))",
              filter: "blur(30px)",
              animation: "orb-pulse 3s ease-in-out infinite"
            }}
          />

          {/* Photo container with neon border pulse */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2 border-neon-pulse"
            style={{
              borderColor: "rgba(34, 211, 238, 0.5)",
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 50px rgba(34, 211, 238, 0.4)"
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image}
              alt="Mahmoud Mostafa"
              className="w-72 h-72 md:w-96 md:h-96 object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>

          {/* Decorative frame elements */}
          <div
            className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 rounded-br-2xl"
            style={{ borderColor: "#22d3ee" }}
          />
          <div
            className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 rounded-tl-2xl"
            style={{ borderColor: "#22d3ee" }}
          />
        </motion.div>

        {/* Right Column - Content */}
        <div className="space-y-10">
          <motion.div variants={fadeUp}>
            <p className="heading-accent">{t("about.label")}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-txt-primary mt-4 leading-tight tracking-tight">
              {title}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            {description.map((para, i) => (
              <p key={i} className={`text-lg leading-relaxed ${i === 1 ? 'text-txt-tertiary italic border-l-2 border-cyan-400/50 pl-4' : 'text-txt-secondary'}`}>
                {para}
              </p>
            ))}
          </motion.div>

          {/* Value Proposition Cards */}
          <motion.div
            className="grid gap-6 sm:grid-cols-3"
            variants={staggerContainer}
          >
            {stats.map((item) => (
              <motion.div
                key={item.title}
                className="group relative rounded-2xl p-6 transition-all duration-500 cursor-default overflow-visible"
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)"
                }}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(34, 211, 238, 0.5)",
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)",
                  background: "rgba(15, 23, 42, 0.6)"
                }}
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-txt-primary group-hover:text-cyan-400 transition-colors text-lg">
                  {item.title}
                </h3>
                <p className="text-txt-tertiary text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;