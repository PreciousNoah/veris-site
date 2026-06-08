import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertTriangle, Play } from "lucide-react";
import { Link } from "wouter";
import { SIMULATOR_TABS, SIMULATOR_STAGES } from "@/data/siteContent";
import { SIMULATOR_RESULTS } from "@/data/sampleAudit";
import { SAMPLE_AUDIT } from "@/data/sampleAudit";
import { ROUTES } from "@/data/navigation";

type SimState = "idle" | "running" | "done";

export function LiveAuditSimulator() {
  const [activeTab, setActiveTab] = useState(SIMULATOR_TABS[0].id);
  const [inputVal, setInputVal] = useState("");
  const [simState, setSimState] = useState<SimState>("idle");
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTabData = SIMULATOR_TABS.find((t) => t.id === activeTab) ?? SIMULATOR_TABS[0];

  const runSim = () => {
    if (simState === "running") return;
    setSimState("running");
    setStageIdx(0);
    setProgress(0);
    let stage = 0;
    let prog = 0;
    intervalRef.current = setInterval(() => {
      prog += 2;
      setProgress(prog);
      if (prog % 20 === 0 && stage < SIMULATOR_STAGES.length - 1) { stage++; setStageIdx(stage); }
      if (prog >= 100) { clearInterval(intervalRef.current!); setSimState("done"); }
    }, 50);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>INTERACTIVE DEMO</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F7FA", margin: "0 0 16px", lineHeight: 1.15 }}>
          Run a Live Verification
        </h2>
        <p style={{ fontSize: "clamp(14px, 2.5vw, 16px)", color: "#8B96A7", maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>
          Experience how VERIS transforms scattered information into actionable trust intelligence.
        </p>
      </div>

      <div style={{
        maxWidth: 720, margin: "0 auto",
        background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, backdropFilter: "blur(24px)", overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.04)"
      }}>
        {/* tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", WebkitOverflowScrolling: "touch" as const }}>
          {SIMULATOR_TABS.map(({ id, label, short, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSimState("idle"); setProgress(0); }}
                style={{
                  flex: "1 1 0", minWidth: 72, padding: "13px 10px",
                  background: "transparent", border: "none",
                  borderBottom: `2px solid ${active ? "#00D4FF" : "transparent"}`,
                  color: active ? "#00D4FF" : "#8B96A7",
                  fontSize: 12, fontWeight: active ? 600 : 400, letterSpacing: "0.04em",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 5, transition: "all 0.2s", whiteSpace: "nowrap", fontFamily: "inherit"
                }}
              >
                <Icon size={12} />
                <span className="veris-tab-label">{label}</span>
                <span className="veris-tab-label-short">{short}</span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: "clamp(20px, 5vw, 32px)" }}>
          {/* input */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") runSim(); }}
              placeholder={activeTabData.placeholder}
              style={{
                flex: "1 1 200px", minWidth: 0,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "12px 16px", color: "#F5F7FA", fontSize: 14,
                outline: "none", fontFamily: "inherit", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            <motion.button
              whileHover={{ boxShadow: "0 0 24px rgba(0,212,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={runSim}
              disabled={simState === "running"}
              style={{
                background: simState === "running" ? "rgba(0,212,255,0.5)" : "#00D4FF",
                border: "none", borderRadius: 8, padding: "12px 20px",
                color: "#08090D", fontWeight: 600, fontSize: 14,
                cursor: simState === "running" ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 7,
                fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.2s", flexShrink: 0
              }}
            >
              <Play size={13} />
              Run Verification
            </motion.button>
          </div>

          {/* body */}
          <AnimatePresence mode="wait">
            {simState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12, padding: "36px 24px", textAlign: "center" }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px"
                }}>
                  <Play size={18} color="#00D4FF" />
                </div>
                <p style={{ color: "#8B96A7", fontSize: 14, margin: 0 }}>
                  Enter a target above and click <strong style={{ color: "#F5F7FA" }}>Run Verification</strong> to begin
                </p>
              </motion.div>
            )}

            {simState === "running" && (
              <motion.div key="running" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <motion.span key={stageIdx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      style={{ fontSize: 13, color: "#00D4FF", letterSpacing: "0.04em" }}>
                      {SIMULATOR_STAGES[stageIdx]}
                    </motion.span>
                    <span style={{ fontSize: 12, color: "#8B96A7", fontVariantNumeric: "tabular-nums" }}>{Math.round(progress)}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #00D4FF, #5EEAD4)", borderRadius: 2 }}
                      animate={{ width: `${progress}%` }} transition={{ duration: 0.05 }} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {SIMULATOR_STAGES.map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <motion.div animate={{ background: i <= stageIdx ? "#00D4FF" : "rgba(139,150,167,0.2)" }}
                        style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }} transition={{ duration: 0.3 }} />
                      <span style={{ fontSize: 12, color: i <= stageIdx ? "#F5F7FA" : "#8B96A7", transition: "color 0.3s" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {simState === "done" && (
              <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 4 }}>TRUST SCORE</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                      <span style={{ fontSize: 52, fontWeight: 700, color: "#00D4FF", lineHeight: 1 }}>{SAMPLE_AUDIT.trustScore}</span>
                      <span style={{ fontSize: 20, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>/{SAMPLE_AUDIT.maxScore}</span>
                    </div>
                  </div>
                  <div style={{
                    background: SAMPLE_AUDIT.badge.background, border: SAMPLE_AUDIT.badge.border,
                    borderRadius: 20, padding: "8px 18px", fontSize: 11, fontWeight: 600,
                    letterSpacing: "0.12em", color: SAMPLE_AUDIT.badge.color, textTransform: "uppercase", alignSelf: "center"
                  }}>
                    {SAMPLE_AUDIT.recommendation}
                  </div>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SIMULATOR_RESULTS.map(({ label, ok }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#F5F7FA" }}>
                      {ok ? <CheckCircle size={14} color="#10B981" /> : <AlertTriangle size={14} color="#FBB92D" />}
                      {label}
                    </motion.div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                  <Link href={ROUTES.audit} style={{ textDecoration: "none" }}>
                    <button style={{
                      background: "#00D4FF", color: "#08090D", border: "none",
                      borderRadius: 7, padding: "10px 20px", fontSize: 13, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em"
                    }}>
                      Run a Full Audit →
                    </button>
                  </Link>
                  <button
                    onClick={() => { setSimState("idle"); setProgress(0); setStageIdx(0); }}
                    style={{
                      background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 7, padding: "10px 18px", color: "#8B96A7", fontSize: 13,
                      cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.04em"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#00D4FF"; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8B96A7"; }}
                  >
                    Try another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
