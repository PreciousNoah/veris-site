import { motion } from "framer-motion";
import { Link } from "wouter";
import { ROUTES } from "@/data/navigation";

export function FinalCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", textAlign: "center", padding: "120px 24px", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)"
      }} />

      <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 24 }}>
        GET STARTED
      </p>
      <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "#F5F7FA", lineHeight: 1.15, margin: "0 0 48px" }}>
        Trust is earned.<br />
        <span style={{ background: "linear-gradient(90deg, #FFFFFF, #8DEBFF, #5EEAD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Verify it first.
        </span>
      </h2>

      <Link href={ROUTES.audit} style={{ textDecoration: "none" }}>
        <motion.button
          whileHover={{ boxShadow: "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)" }}
          style={{
            background: "#00D4FF", color: "#08090D", border: "none",
            borderRadius: 10, padding: "18px 52px", fontSize: 17, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", transition: "box-shadow 0.3s ease",
            letterSpacing: "0.02em"
          }}
        >
          Run Your First Audit
        </motion.button>
      </Link>

      <p style={{ marginTop: 20, fontSize: 13, color: "rgba(139,150,167,0.5)" }}>No commitment required</p>
    </motion.section>
  );
}
