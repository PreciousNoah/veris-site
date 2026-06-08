import { motion } from "framer-motion";
import { METHODOLOGY_STEPS } from "@/data/siteContent";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } }
};

export function HowVerisWorks() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}
    >
      <motion.div variants={cardVariants} style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>METHODOLOGY</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: 0, lineHeight: 1.15 }}>
          How VERIS Works
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {METHODOLOGY_STEPS.map(({ num, Icon, title, desc, iconColor, glow }) => (
          <motion.div
            key={num}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: `0 24px 64px ${glow}, 0 0 0 1px rgba(255,255,255,0.08)` }}
            style={{
              background: "rgba(17,20,26,0.6)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "36px 32px", backdropFilter: "blur(10px)",
              cursor: "default", transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative", overflow: "hidden"
            }}
          >
            <div style={{
              position: "absolute", top: -20, right: -10,
              fontSize: 80, fontWeight: 800, color: `${iconColor}0D`,
              lineHeight: 1, userSelect: "none", pointerEvents: "none"
            }}>
              {num}
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `${iconColor}1A`, border: `1px solid ${iconColor}20`,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20
            }}>
              <Icon size={20} color={iconColor} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#F5F7FA", margin: "0 0 12px", lineHeight: 1.2 }}>{title}</h3>
            <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
