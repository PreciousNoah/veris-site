import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Globe, Github, Bot, Wallet, XCircle } from "lucide-react";
import "@/veris.css";

const BACKEND_URL = "https://veris-agent.onrender.com";

const ENTITY_TYPES = [
  { id: "project", label: "Web3 / DeFi Project", Icon: Globe },
  { id: "agent",   label: "AI Agent",             Icon: Bot },
  { id: "github",  label: "GitHub Repository",    Icon: Github },
  { id: "wallet",  label: "Wallet Address",       Icon: Wallet },
];

const DEPTHS = [
  { id: "standard", label: "Standard",  desc: "Core trust signals — ~60 seconds" },
  { id: "deep",     label: "Deep Dive", desc: "Full evidence scan — ~3 minutes"  },
  { id: "realtime", label: "Real-Time", desc: "Live monitoring + instant report" },
];

const placeholders: Record<string, string> = {
  project: "https://yourproject.xyz",
  agent:   "agent-xyz-001 or a DID identifier",
  github:  "https://github.com/org/repo",
  wallet:  "0x… or a Solana address",
};

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AuditResult = {
  trustScore?: number;
  maxScore?: number;
  recommendation?: string;
  riskLevel?: string;
  dimensions?: { label: string; score: number; max: number }[];
  badge?: { background: string; border: string; color: string };
  rawReport?: string;
  [key: string]: unknown;
};

type PageState = "idle" | "loading" | "done" | "error";

export default function AuditPage() {
  const [entityType, setEntityType] = useState("project");
  const [depth, setDepth]           = useState("standard");
  const [target, setTarget]         = useState("");
  const [pageState, setPageState]   = useState<PageState>("idle");
  const [result, setResult]         = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg]     = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!target.trim() || pageState === "loading") return;
    setPageState("loading");
    setErrorMsg(null);
    setResult(null);

    try {
      // 1. Make the request
      const res = await fetch(`${BACKEND_URL}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requirements: {
            type:      entityType === "agent" ? "agent" : "project",
            name:      target.trim(),
            website:   entityType === "project" ? target.trim() : undefined,
            agentId:   entityType === "agent"   ? target.trim() : undefined,
            serviceId: entityType === "agent"   ? target.trim() : undefined,
            mode:      depth === "deep" ? "full" : "quick",
            category:  "general",
          },
        }),
      });

      // 2. Check for HTTP errors
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(body || `Server returned ${res.status}`);
      }

      // 3. Parse the response
      const data = await res.json();
      const report: string = data.report || "";

      const scoreMatch = report.match(/OVERALL TRUST SCORE:\s*(\d+)\/(\d+)/);
      const riskMatch  = report.match(/RISK LEVEL:\s*(\w+)/);
      const recMatch   = report.match(/RECOMMENDATION\n([^\n]+)/);

      const dimensions: { label: string; score: number; max: number }[] = [];
      const dimRegex = /([\w\s]+):\s+(\d+)\/(\d+)\s+[█░]+/g;
      let dimMatch;
      while ((dimMatch = dimRegex.exec(report)) !== null) {
        dimensions.push({
          label: dimMatch[1].trim(),
          score: parseInt(dimMatch[2]),
          max:   parseInt(dimMatch[3]),
        });
      }

      const trustScore = scoreMatch ? parseInt(scoreMatch[1]) : undefined;
      const riskLevel  = riskMatch  ? riskMatch[1].toUpperCase() : undefined;

      const badge =
        trustScore !== undefined && trustScore >= 75
          ? { background: "rgba(16,185,129,0.1)",  border: "1px solid rgba(16,185,129,0.3)",  color: "#10B981" }
          : trustScore !== undefined && trustScore >= 50
          ? { background: "rgba(251,185,45,0.1)",  border: "1px solid rgba(251,185,45,0.3)",  color: "#FBB92D" }
          : { background: "rgba(239,68,68,0.1)",   border: "1px solid rgba(239,68,68,0.3)",   color: "#EF4444" };

      setResult({
        trustScore,
        maxScore:       scoreMatch ? parseInt(scoreMatch[2]) : 100,
        riskLevel,
        recommendation: recMatch ? recMatch[1].trim() : riskLevel,
        dimensions,
        badge,
        rawReport:      report,
      });

      setPageState("done");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setPageState("error");
    }
  };

  const reset = () => {
    setPageState("idle");
    setTarget("");
    setResult(null);
    setErrorMsg(null);
  };

  const badgeColor = (risk?: string) => {
    if (!risk) return "#8B96A7";
    if (risk === "LOW")  return "#10B981";
    if (risk === "HIGH") return "#EF4444";
    return "#FBB92D";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif" }}>

      {/* nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px clamp(20px, 4vw, 48px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(8,9,13,0.85)", backdropFilter: "blur(16px)"
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <VerisMark />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#F5F7FA", letterSpacing: "0.04em" }}>VERIS</span>
        </Link>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#F5F7FA")}
          onMouseOut={(e)  => (e.currentTarget.style.color = "#8B96A7")}
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </nav>

      {/* main */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(48px, 8vh, 80px) 24px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>
              TRUST VERIFICATION
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 12px" }}>
              Run an Audit
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
              Submit an entity for full trust verification. Results include a scored report, dimension breakdown, and an evidence-backed recommendation.
            </p>
          </div>

          <AnimatePresence mode="wait">

            {/* FORM */}
            {(pageState === "idle" || pageState === "error") && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{
                  background: "rgba(17,20,26,0.8)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, overflow: "hidden"
                }}>
                  {/* step 1 */}
                  <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <label style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                      1 — Entity type
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
                      {ENTITY_TYPES.map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          onClick={() => setEntityType(id)}
                          style={{
                            background: entityType === id ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${entityType === id ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                            borderRadius: 8, padding: "11px 14px",
                            color: entityType === id ? "#00D4FF" : "#8B96A7",
                            cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                            display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s",
                            justifyContent: "center"
                          }}
                        >
                          <Icon size={13} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* step 2 */}
                  <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <label style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                      2 — Target identifier
                    </label>
                    <input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                      placeholder={placeholders[entityType]}
                      style={{
                        width: "100%", boxSizing: "border-box",
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8, padding: "13px 16px", color: "#F5F7FA", fontSize: 15,
                        outline: "none", fontFamily: "inherit", transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
                      onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  {/* step 3 */}
                  <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <label style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                      3 — Verification depth
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {DEPTHS.map(({ id, label, desc }) => (
                        <button
                          key={id}
                          onClick={() => setDepth(id)}
                          style={{
                            background: depth === id ? "rgba(0,212,255,0.06)" : "transparent",
                            border: `1px solid ${depth === id ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.07)"}`,
                            borderRadius: 8, padding: "12px 16px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 14, height: 14, borderRadius: "50%",
                              border: `2px solid ${depth === id ? "#00D4FF" : "rgba(255,255,255,0.2)"}`,
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                            }}>
                              {depth === id && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF" }} />}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 500, color: depth === id ? "#F5F7FA" : "#8B96A7" }}>{label}</span>
                          </div>
                          <span style={{ fontSize: 12, color: "rgba(139,150,167,0.6)" }}>{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* submit row */}
                  <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontSize: 12, color: "rgba(139,150,167,0.5)" }}>
                        Results returned as a structured trust report
                      </span>
                      {pageState === "error" && errorMsg && (
                        <span style={{ fontSize: 12, color: "#FF6B6B", display: "flex", alignItems: "center", gap: 5 }}>
                          <XCircle size={12} /> {errorMsg}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ boxShadow: "0 0 24px rgba(0,212,255,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={!target.trim()}
                      style={{
                        background: target.trim() ? "#00D4FF" : "rgba(0,212,255,0.3)",
                        color: "#08090D", border: "none", borderRadius: 8, padding: "13px 28px",
                        fontWeight: 600, fontSize: 14,
                        cursor: target.trim() ? "pointer" : "not-allowed",
                        fontFamily: "inherit", letterSpacing: "0.02em", transition: "background 0.2s"
                      }}
                    >
                      Run Verification →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LOADING */}
            {pageState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "rgba(17,20,26,0.8)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "64px 36px", textAlign: "center"
                }}
              >
                <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 24px" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      border: "2px solid rgba(0,212,255,0.15)",
                      borderTopColor: "#00D4FF"
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 8,
                    borderRadius: "50%", background: "rgba(0,212,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <VerisMark />
                  </div>
                </div>
                <p style={{ color: "#F5F7FA", fontSize: 15, fontWeight: 400, margin: "0 0 8px" }}>
                  Verifying <strong style={{ color: "#00D4FF" }}>{target}</strong>
                </p>
                <p style={{ color: "#8B96A7", fontSize: 13, margin: 0 }}>
                  Scanning trust signals — {DEPTHS.find(d => d.id === depth)?.desc.toLowerCase()}…
                </p>
              </motion.div>
            )}

            {/* RESULT */}
            {pageState === "done" && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{
                  background: "rgba(17,20,26,0.8)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, overflow: "hidden"
                }}>
                  {/* score header */}
                  <div style={{
                    padding: "32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap"
                  }}>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 6 }}>
                        TRUST SCORE
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{ fontSize: 56, fontWeight: 700, color: "#00D4FF", lineHeight: 1 }}>
                          {result.trustScore ?? "—"}
                        </span>
                        <span style={{ fontSize: 22, color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>
                          /{result.maxScore ?? 100}
                        </span>
                      </div>
                    </div>
                    {result.recommendation && (
                      <div style={{
                        background: result.badge?.background ?? "rgba(251,185,45,0.1)",
                        border: result.badge?.border ?? "1px solid rgba(251,185,45,0.3)",
                        borderRadius: 20, padding: "8px 18px",
                        fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                        color: result.badge?.color ?? badgeColor(result.riskLevel),
                        textTransform: "uppercase", alignSelf: "center"
                      }}>
                        {result.recommendation}
                      </div>
                    )}
                  </div>

                  {/* dimensions */}
                  {Array.isArray(result.dimensions) && result.dimensions.length > 0 && (
                    <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 16 }}>
                        Dimension Breakdown
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {result.dimensions.map((dim) => {
                          const pct = dim.max > 0 ? Math.round((dim.score / dim.max) * 100) : 0;
                          const col = pct >= 80 ? "#10B981" : pct >= 60 ? "#FBB92D" : "#EF4444";
                          return (
                            <div key={dim.label}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                <span style={{ fontSize: 13, color: "#F5F7FA" }}>{dim.label}</span>
                                <span style={{ fontSize: 12, color: col, fontVariantNumeric: "tabular-nums" }}>
                                  {dim.score}/{dim.max}
                                </span>
                              </div>
                              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  style={{ height: "100%", background: col, borderRadius: 2 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* raw report */}
                  {result.rawReport && (
                    <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
                        Full Report
                      </div>
                      <pre style={{
                        background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 16,
                        fontSize: 11, color: "#8B96A7", overflowX: "auto",
                        fontFamily: "monospace", margin: 0, lineHeight: 1.7,
                        whiteSpace: "pre-wrap", wordBreak: "break-word"
                      }}>
                        {result.rawReport}
                      </pre>
                    </div>
                  )}

                  {/* fallback if nothing parsed */}
                  {!result.rawReport && (!Array.isArray(result.dimensions) || result.dimensions.length === 0) && (
                    <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
                        Raw Result
                      </div>
                      <pre style={{
                        background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 16,
                        fontSize: 12, color: "#8B96A7", overflowX: "auto",
                        fontFamily: "monospace", margin: 0, lineHeight: 1.6
                      }}>
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* actions */}
                  <div style={{ padding: "24px 32px", display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      onClick={reset}
                      style={{
                        background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 8, padding: "10px 22px", color: "#8B96A7", fontSize: 13,
                        cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#00D4FF"; }}
                      onMouseOut={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8B96A7"; }}
                    >
                      Run another audit
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </main>

      {/* grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px"
      }} />
    </div>
  );
}