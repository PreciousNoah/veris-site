import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Globe, Github, Bot, Wallet, ChevronDown } from "lucide-react";
import "@/veris.css";

const ENTITY_TYPES = [
  { id: "project",  label: "Web3 / DeFi Project", Icon: Globe  },
  { id: "agent",    label: "AI Agent",             Icon: Bot    },
  { id: "github",   label: "GitHub Repository",    Icon: Github },
  { id: "wallet",   label: "Wallet Address",       Icon: Wallet },
];

const DEPTHS = [
  { id: "standard", label: "Standard",  desc: "Core trust signals — ~60 seconds"  },
  { id: "deep",     label: "Deep Dive", desc: "Full evidence scan — ~3 minutes"   },
  { id: "realtime", label: "Real-Time", desc: "Live monitoring + instant report"  },
];

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AuditPage() {
  const [entityType, setEntityType] = useState("project");
  const [depth, setDepth] = useState("standard");
  const [target, setTarget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const placeholders: Record<string, string> = {
    project: "https://yourproject.xyz",
    agent:   "agent-xyz-001 or a DID identifier",
    github:  "https://github.com/org/repo",
    wallet:  "0x… or a Solana address",
  };

  const handleSubmit = () => {
    if (!target.trim()) return;
    setSubmitted(true);
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
          onMouseOver={(e) => e.currentTarget.style.color = "#F5F7FA"}
          onMouseOut={(e) => e.currentTarget.style.color = "#8B96A7"}
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

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: 16, padding: "48px 36px", textAlign: "center"
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
              }}>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
                  <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 400, color: "#F5F7FA", margin: "0 0 10px" }}>
                Audit Queued
              </h2>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.65, margin: "0 0 8px" }}>
                <strong style={{ color: "#F5F7FA" }}>{target}</strong>
              </p>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.65, margin: "0 0 28px" }}>
                Backend integration coming soon — your audit request has been noted. You'll be able to track progress and view results here once the API is connected.
              </p>
              <button
                onClick={() => { setSubmitted(false); setTarget(""); }}
                style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding: "10px 22px", color: "#8B96A7", fontSize: 13,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#00D4FF"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8B96A7"; }}
              >
                Run another audit
              </button>
            </motion.div>
          ) : (
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
                  onFocus={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
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

              {/* submit */}
              <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 12, color: "rgba(139,150,167,0.5)" }}>
                  Results returned as a structured trust report
                </span>
                <motion.button
                  whileHover={{ boxShadow: "0 0 24px rgba(0,212,255,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  style={{
                    background: target.trim() ? "#00D4FF" : "rgba(0,212,255,0.3)",
                    color: "#08090D", border: "none", borderRadius: 8, padding: "13px 28px",
                    fontWeight: 600, fontSize: 14, cursor: target.trim() ? "pointer" : "not-allowed",
                    fontFamily: "inherit", letterSpacing: "0.02em", transition: "background 0.2s"
                  }}
                >
                  Run Verification →
                </motion.button>
              </div>
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(139,150,167,0.4)", lineHeight: 1.6 }}>
            Backend integration in progress. Form UI is final — connect{" "}
            <code style={{ color: "rgba(0,212,255,0.6)", fontSize: 11 }}>POST /api/audits/run</code>{" "}
            to wire up live results.
          </p>
        </motion.div>
      </main>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px"
      }} />
    </div>
  );
}
