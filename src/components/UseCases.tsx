import { motion } from "framer-motion";
import { USE_CASES } from "@/data/siteContent";

export function UseCases() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>USE CASES</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: 0, lineHeight: 1.15 }}>
          What VERIS Audits
        </h2>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {USE_CASES.map(({ Icon, iconColor, tag, title, desc, gradient, border, hoverGlow, points }) => (
          <motion.div
            key={title}
            whileHover={{ y: -4, boxShadow: `0 24px 60px ${hoverGlow}` }}
            style={{
              flex: "1 1 440px", maxWidth: 540,
              background: gradient, border: `1px solid ${border}`,
              borderRadius: 20, padding: "clamp(28px, 5vw, 48px) clamp(24px, 4vw, 44px)",
              minHeight: 280, cursor: "default", transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${iconColor}1A`, border: `1px solid ${border}`,
              borderRadius: 20, padding: "4px 12px", marginBottom: 24
            }}>
              <span style={{ fontSize: 10, letterSpacing: "0.15em", color: iconColor, textTransform: "uppercase" }}>{tag}</span>
            </div>
            <Icon size={36} color={iconColor} style={{ display: "block", marginBottom: 20 }} />
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#F5F7FA", margin: "0 0 16px", lineHeight: 1.2 }}>{title}</h3>
            <p style={{ color: "#8B96A7", fontSize: 15, lineHeight: 1.65, margin: "0 0 28px" }}>{desc}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {points.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8B96A7" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: iconColor, flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
