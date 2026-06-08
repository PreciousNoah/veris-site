import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PLATFORM_STATS } from "@/data/siteContent";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const started = useRef(false);

  const formatted = useTransform(motionVal, (v) =>
    value >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animate(motionVal, value, { duration: 2, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motionVal, value]);

  return (
    <span ref={ref}>
      <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>{formatted}</motion.span>
      {suffix}
    </span>
  );
}

export function TrustedByData() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", padding: "80px 24px", position: "relative" }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)"
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>SCALE</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: 0, lineHeight: 1.15 }}>
            Trust at Scale
          </h2>
        </div>
        <div className="veris-stats-grid">
          {PLATFORM_STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="veris-stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{
                fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 700, color: "#00D4FF",
                lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em",
                textShadow: "0 0 40px rgba(0,212,255,0.4)"
              }}>
                <CountUp value={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: 13, color: "#8B96A7", letterSpacing: "0.06em", lineHeight: 1.4 }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
