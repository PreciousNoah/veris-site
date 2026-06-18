import { motion } from "framer-motion";
import { useState } from "react";
import { TRUST_TIMELINE } from "@/data/sampleAudit";
import { SAMPLE_AUDIT } from "@/data/sampleAudit";

const W = 640;
const H = 160;
const PAD_X = 48;
const PAD_Y = 24;
const PLOT_W = W - PAD_X * 2;
const PLOT_H = H - PAD_Y * 2;
const MIN_S = 70;
const MAX_S = 100;

function toX(i: number) { return PAD_X + (i / (TRUST_TIMELINE.length - 1)) * PLOT_W; }
function toY(s: number) { return PAD_Y + PLOT_H - ((s - MIN_S) / (MAX_S - MIN_S)) * PLOT_H; }

const pathD = TRUST_TIMELINE.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.score)}`).join(" ");
const areaD = `${pathD} L ${toX(TRUST_TIMELINE.length - 1)} ${H} L ${toX(0)} ${H} Z`;

const currentScore = TRUST_TIMELINE[TRUST_TIMELINE.length - 1].score;
const lowScore = Math.min(...TRUST_TIMELINE.map((p) => p.score));

export function TrustTimeline() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
          MONITORING — ROADMAP FEATURE
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: "0 0 16px", lineHeight: 1.15 }}>
          Trust Evolution
        </h2>
        <p style={{ fontSize: 16, color: "#8B96A7", maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>
          Trust is dynamic. As VERIS accumulates audit receipts, it will track how
          an entity's trust score changes over time — surfacing early warning signals
          before they become obvious.
        </p>
      </div>

      <div style={{
        maxWidth: 800, margin: "0 auto",
        background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, backdropFilter: "blur(20px)",
        padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 32px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)"
      }}>
        {/* illustrative badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(251,185,45,0.08)", border: "1px solid rgba(251,185,45,0.2)",
          borderRadius: 6, padding: "4px 10px", marginBottom: 20
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FBB92D", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#FBB92D", letterSpacing: "0.08em" }}>
            ILLUSTRATIVE EXAMPLE — historical tracking launches as receipt volume grows
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 4 }}>ENTITY</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#F5F7FA" }}>{SAMPLE_AUDIT.entityName}</div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#8B96A7", letterSpacing: "0.1em" }}>CURRENT</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#5EEAD4" }}>{currentScore}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#8B96A7", letterSpacing: "0.1em" }}>LOW</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#FBB92D" }}>{lowScore}</div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" as const }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: 300, display: "block", overflow: "visible" }} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {[70, 80, 90, 100].map((v) => (
              <g key={v}>
                <line x1={PAD_X} x2={W - PAD_X} y1={toY(v)} y2={toY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <text x={PAD_X - 8} y={toY(v) + 4} fill="#8B96A7" fontSize="10" textAnchor="end">{v}</text>
              </g>
            ))}
            <path d={areaD} fill="url(#areaGrad)" />
            <motion.path
              d={pathD} stroke="#00D4FF" strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round" filter="url(#lineGlow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            {TRUST_TIMELINE.map((p, i) => {
              const x = toX(i);
              const y = toY(p.score);
              const isHov = hovered === i;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={16} fill="transparent" style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
                  <circle cx={x} cy={y} r={isHov ? 6 : 4}
                    fill={isHov ? "#00D4FF" : "#11141A"} stroke="#00D4FF" strokeWidth="2"
                    style={{ filter: isHov ? "drop-shadow(0 0 6px #00D4FF)" : "none", pointerEvents: "none", transition: "r 0.15s ease, fill 0.15s ease" }} />
                  <text x={x} y={H - 4} fill="#8B96A7" fontSize="11" textAnchor="middle">{p.month}</text>
                  <text x={x} y={y - 10} fill={isHov ? "#00D4FF" : "rgba(245,247,250,0.4)"} fontSize="11" textAnchor="middle" fontWeight="600">{p.score}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ marginTop: 24, minHeight: 80 }}>
          {hovered !== null ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: 10, padding: "16px 20px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA" }}>{TRUST_TIMELINE[hovered].month} 2025</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#00D4FF" }}>Score: {TRUST_TIMELINE[hovered].score}</span>
              </div>
              <div className="veris-timeline-events">
                {TRUST_TIMELINE[hovered].events.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "#8B96A7" }}>
                    <span style={{ color: "#00D4FF", flexShrink: 0, marginTop: 1 }}>→</span>
                    {e}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <p style={{ textAlign: "center", fontSize: 12, color: "rgba(139,150,167,0.4)", margin: 0, padding: "16px 0" }}>
              Hover a data point to see trust events for that period
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
