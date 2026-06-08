import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, ShieldCheck } from "lucide-react";

const NODE_SIZE = { center: 120, side: 80 };
const PIPE_W = 900;

function usePhase() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const cycle = () => {
      setPhase(0);
      setTimeout(() => setPhase(1), 1200);
      setTimeout(() => setPhase(2), 2000);
      setTimeout(() => setPhase(3), 3200);
    };
    cycle();
    const id = setInterval(cycle, 4000);
    return () => clearInterval(id);
  }, []);
  return phase;
}

function RotatingRing() {
  return (
    <motion.svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      style={{ position: "absolute", top: -10, left: -10 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="70" cy="70" r="62"
        stroke="#00D4FF" strokeWidth="1.5" fill="none"
        strokeDasharray="20 12 8 20 15 8" strokeLinecap="round" opacity="0.5"
      />
    </motion.svg>
  );
}

function CenterNode({ phase }: { phase: number }) {
  const pulse = phase === 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: NODE_SIZE.center, height: NODE_SIZE.center }}>
        <RotatingRing />
        <motion.div
          animate={pulse ? {
            boxShadow: [
              "0 0 20px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05)",
              "0 0 80px rgba(0,212,255,0.8), inset 0 0 40px rgba(0,212,255,0.2)",
              "0 0 20px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05)"
            ]
          } : {
            boxShadow: "0 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            width: NODE_SIZE.center, height: NODE_SIZE.center, borderRadius: "50%",
            background: "#11141A", border: "1px solid rgba(0,212,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 4, position: "relative", zIndex: 1
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.5" />
            <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#00D4FF", letterSpacing: "0.1em" }}>VERIS</span>
        </motion.div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#F5F7FA", textTransform: "uppercase" }}>VERIS ENGINE</div>
        <div style={{ fontSize: 10, color: "rgba(139,150,167,0.6)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>AI TRUST LAYER</div>
      </div>
    </div>
  );
}

function SideNode({ label, sublabel, icon, glowColor, borderColor }: {
  label: string; sublabel: string; icon: React.ReactNode; glowColor: string; borderColor: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{
        width: NODE_SIZE.side, height: NODE_SIZE.side, borderRadius: "50%",
        background: "#11141A", border: `1px solid ${borderColor}`,
        boxShadow: `inset 0 2px 8px rgba(0,0,0,0.5), 0 0 20px ${glowColor}`,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {icon}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 10, color: "rgba(139,150,167,0.5)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>{sublabel}</div>
      </div>
    </div>
  );
}

interface BeamProps {
  active: boolean; color: string;
  x1: number; y1: number; x2: number; y2: number;
}

function BeamPath({ active, color, x1, y1, x2, y2 }: BeamProps) {
  const cx = (x1 + x2) / 2;
  const d = `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
  return (
    <motion.path
      d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: active ? 1.0 : 0.3, ease: "easeInOut" }}
    />
  );
}

function Particles({ active, fromX, toX, y, color }: { active: boolean; fromX: number; toX: number; y: number; color: string }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.circle
          key={i} r="3" fill={color}
          initial={{ cx: fromX, cy: y, opacity: 0, scale: 0 }}
          animate={active ? { cx: [fromX, toX], cy: [y, y], opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.18, repeat: active ? Infinity : 0 }}
        />
      ))}
    </>
  );
}

export function VerificationPipeline() {
  const phase = usePhase();

  const svgW = 900;
  const svgH = 100;
  const leftX = 100;
  const centerX = 450;
  const rightX = 800;
  const midY = 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: PIPE_W, margin: "0 auto", padding: "60px 16px 0", position: "relative" }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 8 }}>LIVE VERIFICATION</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", fontWeight: 300, color: "#F5F7FA", margin: 0 }}>The Trust Verification Pipeline</h2>
      </div>

      <div className="veris-pipeline-scroll">
        <div style={{ minWidth: 320 }}>
          <div className="veris-pipeline-nodes">
            <SideNode
              label="UNKNOWN ENTITY" sublabel="INPUT"
              icon={<FileText size={24} color="#8B96A7" />}
              glowColor="rgba(0,0,0,0)" borderColor="rgba(255,255,255,0.1)"
            />
            <CenterNode phase={phase} />
            <motion.div
              animate={phase >= 3 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <SideNode
                label="VERIFIED" sublabel="TRUSTED"
                icon={<ShieldCheck size={24} color="#5EEAD4" />}
                glowColor="rgba(94,234,212,0.2)" borderColor="rgba(94,234,212,0.4)"
              />
            </motion.div>
          </div>

          <svg
            width="100%"
            viewBox={`0 0 ${svgW} ${svgH}`}
            style={{ display: "block", pointerEvents: "none", overflow: "visible", marginTop: -40 }}
          >
            <defs>
              <filter id="glow-cyan">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-teal">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g filter="url(#glow-cyan)">
              <BeamPath active={phase === 0 || phase === 1} color="#00D4FF" x1={leftX} y1={midY} x2={centerX - 60} y2={midY} />
            </g>
            <g filter="url(#glow-teal)">
              <BeamPath active={phase >= 2} color="#5EEAD4" x1={centerX + 60} y1={midY} x2={rightX} y2={midY} />
            </g>
            <Particles active={phase === 0} fromX={leftX} toX={centerX - 60} y={midY} color="#00D4FF" />
            <Particles active={phase >= 2} fromX={centerX + 60} toX={rightX} y={midY} color="#5EEAD4" />
            {phase === 1 && (
              <motion.circle
                cx={centerX} cy={midY} r="0"
                fill="none" stroke="#00D4FF" strokeWidth="2" opacity={0.6}
                animate={{ r: [0, 80], opacity: [0.8, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </svg>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px, 4vw, 32px)", marginTop: 8, paddingBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "INGEST", active: phase >= 0 },
          { label: "ANALYZE", active: phase >= 1 },
          { label: "VERIFY", active: phase >= 2 },
          { label: "CERTIFIED", active: phase >= 3 }
        ].map(({ label, active }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.div
              animate={{ background: active ? "#00D4FF" : "rgba(139,150,167,0.3)" }}
              transition={{ duration: 0.3 }}
              style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
            />
            <span style={{ fontSize: 10, letterSpacing: "0.15em", color: active ? "#00D4FF" : "#8B96A7", transition: "color 0.3s" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
