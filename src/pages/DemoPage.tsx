import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Play, CheckCircle2, ArrowRight } from "lucide-react";
import "@/veris.css";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WORKFLOW = [
  { agent: "VERIS", color: "#00D4FF", role: "Trust Verification", desc: "Accepts the CROO order, runs multi-layer due diligence, scores legitimacy and maturity across 27 signals." },
  { agent: "ZERU", color: "#5EEAD4", role: "Research Intelligence", desc: "Called by VERIS mid-audit. Returns market context, risk factors, TVL analysis, and sentiment scoring." },
  { agent: "SENTINEL", color: "#A8EDEA", role: "Compliance Decision", desc: "Receives trust score and ZERU signals. Issues a final compliance verdict with recommended actions and review period." },
];

export default function DemoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(8,9,13,0.85)", backdropFilter: "blur(16px)",
        boxSizing: "border-box", width: "100%",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <VerisMark />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#F5F7FA", letterSpacing: "0.04em" }}>VERIS</span>
        </Link>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 13, textDecoration: "none", flexShrink: 0 }}>
          <ArrowLeft size={14} /> Back to home
        </Link>
      </nav>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(48px, 8vh, 80px) 20px 100px", boxSizing: "border-box", width: "100%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>
              PRODUCT DEMO
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 16px" }}>
              Watch VERIS in Action
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 580 }}>
              A full walkthrough of a live VERIS audit — from a buyer placing a CROO order
              to three autonomous agents collaborating to deliver a verified trust report on-chain.
            </p>
          </div>

          {/* YouTube embed */}
          <div style={{
            position: "relative", width: "100%", paddingBottom: "56.25%",
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.04)",
            marginBottom: 48,
            background: "#11141A",
          }}>
            <iframe
              src="https://www.youtube.com/embed/63Y1ECTMiY4"
              title="VERIS — Trust Infrastructure for the Agent Economy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>

          {/* Three-agent system */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px" }}>The Three-Agent System</h2>
            <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.65, margin: "0 0 24px", maxWidth: 600 }}>
              VERIS is not a single agent. Every audit triggers a live A2A workflow across three
              cooperating autonomous agents on CROO.
            </p>

            {/* Workflow chain */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
              {WORKFLOW.map((w, i) => (
                <div key={w.agent}>
                  <div style={{
                    background: "rgba(17,20,26,0.7)", border: `1px solid ${w.color}22`,
                    borderRadius: 12, padding: "20px 22px",
                    display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, background: `${w.color}10`,
                      border: `1px solid ${w.color}30`, display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: w.color, letterSpacing: "0.04em" }}>
                        {w.agent[0]}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F7FA" }}>{w.agent}</span>
                        <span style={{
                          fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                          color: w.color, background: `${w.color}10`, border: `1px solid ${w.color}25`,
                          borderRadius: 4, padding: "2px 7px",
                        }}>
                          {w.role}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#8B96A7", margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
                    </div>
                  </div>
                  {i < WORKFLOW.length - 1 && (
                    <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 33 }}>
                      <ArrowRight size={14} color="rgba(255,255,255,0.15)" style={{ transform: "rotate(90deg)", margin: "4px 0" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What to look for */}
          <div style={{
            background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: 16, padding: "28px 24px", marginBottom: 48,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>What to look for</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "A real CROO order being placed and paid on Base Mainnet",
                "VERIS collecting evidence across 9 parallel web searches",
                "ZERU being called mid-audit as a second autonomous agent",
                "SENTINEL issuing a compliance verdict with recommended actions",
                "The unified report delivered on-chain via CROO SDK",
                "The trust receipt saved to Supabase — building permanent reputation history",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={14} color="#00D4FF" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13.5, color: "#8B96A7", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/audit">
              <button style={{
                background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 8, padding: "13px 28px", fontWeight: 600, fontSize: 14,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
              }}>
                Run a live audit →
              </button>
            </Link>
            <Link href="/receipts">
              <button style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "13px 22px", color: "#8B96A7", fontSize: 14,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#00D4FF"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8B96A7"; }}
              >
                View audit history
              </button>
            </Link>
            <a
              href="https://github.com/PreciousNoah/veris-agent"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "13px 22px", color: "#8B96A7", fontSize: 14,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.color = "#00D4FF"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8B96A7"; }}
              >
                View source
              </button>
            </a>
          </div>

        </motion.div>
      </main>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px",
      }} />
    </div>
  );
} 
