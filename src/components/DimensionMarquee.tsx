import { motion } from "framer-motion";
import { MARQUEE_ITEMS } from "@/data/siteContent";

export function DimensionMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{
      width: "100%", overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "20px 0", background: "rgba(17,20,26,0.4)", position: "relative"
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #08090D, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, #08090D, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8B96A7", textTransform: "uppercase", padding: "0 28px" }}>
              {item}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#00D4FF", opacity: 0.5, display: "inline-block", flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
