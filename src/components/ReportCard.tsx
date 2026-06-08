import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { SAMPLE_CARDS } from "@/data/sampleAudit";

export function ReportCard() {
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % SAMPLE_CARDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = SAMPLE_CARDS[stateIndex];

  return (
    <div style={{
      width: "420px", maxWidth: "100%",
      background: "rgba(17,20,26,0.8)", border: "1px solid var(--border)",
      borderRadius: "16px", backdropFilter: "blur(20px)", padding: "28px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)", margin: "40px auto 0",
      position: "relative", minHeight: "260px"
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <div style={{ fontWeight: 600, color: "var(--text)" }}>{current.name}</div>
              <div style={{ color: "var(--muted)", fontSize: "12px", marginTop: "4px" }}>{current.metric}</div>
            </div>
            <div style={{ color: current.scoreColor, fontSize: "24px", fontWeight: 700 }}>{current.score}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {current.items.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text)", fontSize: "14px" }}>
                {item.ok
                  ? <CheckCircle size={14} color="#10B981" />
                  : <AlertTriangle size={14} color="#FBB92D" />
                }
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            ...current.badgeStyle,
            borderRadius: "20px", padding: "6px 16px", fontSize: "11px",
            letterSpacing: "0.1em", display: "inline-block", textTransform: "uppercase"
          }}>
            {current.badge}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
