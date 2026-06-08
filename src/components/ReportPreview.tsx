import { motion } from "framer-motion";
import { Shield, Clock, AlertTriangle } from "lucide-react";
import { SAMPLE_AUDIT } from "@/data/sampleAudit";

function DimensionBar({ label, score, max, pct, color, index }: {
  label: string; score: number; max: number; pct: number; color: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ marginBottom: 18 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#8B96A7" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color, fontVariantNumeric: "tabular-nums" }}>{score}/{max}</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </motion.div>
  );
}

export function ReportPreview() {
  const { entityName, reportDate, trustScore, maxScore, riskLevel, recommendation, badge, dimensions } = SAMPLE_AUDIT;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>OUTPUT</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: 0, lineHeight: 1.15 }}>
          Audit Report Preview
        </h2>
      </div>

      <div style={{
        maxWidth: 720, margin: "0 auto", background: "#11141A",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)"
      }}>
        {/* header bar */}
        <div style={{
          padding: "16px 28px", background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Shield size={14} color="#00D4FF" />
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase" }}>
              VERIS AUDIT REPORT
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={12} color="#8B96A7" />
            <span style={{ fontSize: 11, color: "#8B96A7" }}>{reportDate} · {entityName}</span>
          </div>
        </div>

        <div style={{ padding: "36px 36px 28px" }}>
          {/* score + risk */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 4 }}>
                TRUST SCORE
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ fontSize: 72, fontWeight: 700, color: "#00D4FF", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                >
                  {trustScore}
                </motion.span>
                <span style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>/{maxScore}</span>
              </div>
            </div>
            <div style={{ paddingBottom: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 8 }}>
                RISK LEVEL
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(251,185,45,0.1)", border: "1px solid rgba(251,185,45,0.3)",
                borderRadius: 6, padding: "6px 14px"
              }}>
                <AlertTriangle size={12} color="#FBB92D" />
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#FBB92D" }}>{riskLevel}</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 28px" }} />

          <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase" }}>DIMENSION BREAKDOWN</span>
            <span style={{ fontSize: 11, color: "rgba(139,150,167,0.5)" }}>SCORE / MAX</span>
          </div>
          <div style={{ marginTop: 20 }}>
            {dimensions.map((d, i) => <DimensionBar key={d.label} {...d} index={i} />)}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "24px 0" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase" }}>RECOMMENDATION</span>
            <div style={{
              background: badge.background, border: badge.border,
              borderRadius: 20, padding: "6px 18px",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: badge.color, textTransform: "uppercase"
            }}>
              {recommendation}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
