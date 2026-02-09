import { motion } from "framer-motion";

export default function Section({
  id,
  children,
  className = "",
}) {
  return (
    <motion.section
      id={id}
      className={`relative min-h-screen flex items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Content wrapper */}
      <div className="w-full">
        {children}
      </div>
    </motion.section>
  );
}
