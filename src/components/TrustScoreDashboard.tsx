import { motion } from "framer-motion";
import { SAMPLE_AUDIT, DASHBOARD_METRICS } from "@/data/sampleAudit";

function MetricBar({ label, score, color, index }: { label: string; score: number; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ marginBottom: 20 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#8B96A7", letterSpacing: "0.02em" }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color, fontVariantNumeric: "tabular-nums" }}>{score}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.08 + 0.2, ease: "easeOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 2, boxShadow: `0 0 10px ${color}50` }}
        />
      </div>
    </motion.div>
  );
}

export function TrustScoreDashboard() {
  const { entityName, trustScore, maxScore, recommendation, badge } = SAMPLE_AUDIT;

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>ANALYSIS</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: 0, lineHeight: 1.15 }}>
          Trust Score Breakdown
        </h2>
      </div>

      <div className="veris-trust-grid">
        {/* Score card */}
        <div style={{
          background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "40px 36px", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 300
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 8 }}>
              OVERALL TRUST SCORE
            </div>
            <div style={{ fontSize: 11, color: "rgba(139,150,167,0.5)", marginBottom: 28 }}>
              {entityName} · Latest audit
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ fontSize: "clamp(64px, 10vw, 96px)", fontWeight: 700, color: "#00D4FF", lineHeight: 1 }}
              >
                {trustScore}
              </motion.span>
              <span style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
                /{maxScore}
              </span>
            </div>
          </div>
          <div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 10 }}>
              RECOMMENDATION
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center",
              background: badge.background, border: badge.border,
              borderRadius: 8, padding: "8px 18px",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: badge.color, textTransform: "uppercase"
            }}>
              {recommendation}
            </div>
          </div>
        </div>

        {/* Metrics card */}
        <div style={{
          background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "36px", backdropFilter: "blur(20px)"
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 28 }}>
            DIMENSION BREAKDOWN
          </div>
          {DASHBOARD_METRICS.map((m, i) => (
            <MetricBar key={m.label} label={m.label} score={m.score} color={m.color} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
