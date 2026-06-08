import { motion } from "framer-motion";
import { Send, Activity, CheckCircle } from "lucide-react";

const STEPS = [
  {
    num: "01",
    Icon: Send,
    title: "Submit",
    desc: "Send a CROO order containing a project or agent identifier for analysis.",
    iconColor: "#00D4FF",
    glowColor: "rgba(0,212,255,0.1)"
  },
  {
    num: "02",
    Icon: Activity,
    title: "Analyze",
    desc: "VERIS gathers live evidence across on-chain, off-chain, and social vectors.",
    iconColor: "#8DEBFF",
    glowColor: "rgba(141,235,255,0.1)"
  },
  {
    num: "03",
    Icon: CheckCircle,
    title: "Decide",
    desc: "Receive a trust score, structured findings, and a clear recommendation.",
    iconColor: "#5EEAD4",
    glowColor: "rgba(94,234,212,0.1)"
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function HowItWorks() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 24px"
      }}
    >
      <motion.div
        variants={cardVariants}
        style={{ textAlign: "center", marginBottom: 60 }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
          PROCESS
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 300,
          color: "#F5F7FA",
          margin: 0,
          lineHeight: 1.15
        }}>
          How It Works
        </h2>
      </motion.div>

      <div style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {STEPS.map(({ num, Icon, title, desc, iconColor, glowColor }) => (
          <motion.div
            key={num}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: `0 24px 64px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.1)` }}
            style={{
              background: "rgba(17,20,26,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 36,
              maxWidth: 300,
              flex: "1 1 260px",
              backdropFilter: "blur(10px)",
              cursor: "default",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
          >
            <div style={{
              fontSize: 52,
              fontWeight: 700,
              color: "rgba(0,212,255,0.12)",
              lineHeight: 1,
              marginBottom: -8,
              fontVariantNumeric: "tabular-nums"
            }}>
              {num}
            </div>
            <Icon size={28} color={iconColor} style={{ marginBottom: 16 }} />
            <h3 style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#F5F7FA",
              margin: "0 0 12px"
            }}>
              {title}
            </h3>
            <p style={{
              color: "#8B96A7",
              fontSize: 14,
              lineHeight: 1.65,
              margin: 0
            }}>
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
