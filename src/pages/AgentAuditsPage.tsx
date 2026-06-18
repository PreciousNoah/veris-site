import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Database, Search, Activity, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import "@/veris.css";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LAYERS = [
  {
    Icon: Database,
    title: "Layer 1 — Metadata",
    weight: "Always available",
    desc: "What CROO already exposes about the agent: store listing, service description, pricing, SLA, category tags, and live online status.",
    signals: ["Agent listed on CROO store", "Service has clear description", "Pricing is defined", "SLA / delivery time defined", "Agent is currently online"],
  },
  {
    Icon: Search,
    title: "Layer 2 — Web Intelligence",
    weight: "Public search",
    desc: "What exists about the agent outside CROO: web mentions, identifiable creator or developer, GitHub repositories, and media coverage.",
    signals: ["Web presence / mentions found", "Creator/developer identifiable", "GitHub repository found", "Referenced in public media"],
  },
  {
    Icon: Activity,
    title: "Layer 3 — Live Verification",
    weight: "Optional",
    desc: "Direct interaction with the agent: an HTTP endpoint probe with test prompts, and — if a funded requester wallet is configured — a real CROO order to verify actual delivery.",
    signals: ["Endpoint reachable", "Responds to test prompts", "CROO order completed", "Delivered output quality adequate"],
  },
];

const ECOSYSTEM_GAPS = [
  "Order history",
  "Delivery history",
  "Rating / review history",
  "Dispute history",
  "Refund history",
  "Success rate",
  "Counterparty feedback",
  "On-chain reputation score",
];

export default function AgentAuditsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif" }}>
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
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 13, textDecoration: "none" }}>
          <ArrowLeft size={14} /> Back to home
        </Link>
      </nav>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "clamp(48px, 8vh, 80px) 24px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>
              AI AGENTS
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px" }}>
              Agent Due Diligence
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 16, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
              Before you delegate a task or send a payment, VERIS investigates an AI agent across three honest
              verification layers. We call this due diligence, not verification — because the agent economy
              doesn't yet expose enough public data to make stronger claims. VERIS reports exactly what it found
              and exactly what it couldn't.
            </p>
          </div>

          {/* layers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56 }}>
            {LAYERS.map(({ Icon, title, weight, desc, signals }, i) => (
              <div key={title} style={{
                background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: 28, display: "flex", gap: 20, flexWrap: "wrap"
              }}>
                <div style={{ flex: "0 0 auto" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10
                  }}>
                    <Icon size={18} color="#00D4FF" />
                  </div>
                  <span style={{
                    fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: i === 2 ? "#FBB92D" : "#5EEAD4"
                  }}>
                    {weight}
                  </span>
                </div>
                <div style={{ flex: "1 1 280px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
                  <p style={{ color: "#8B96A7", fontSize: 13.5, lineHeight: 1.6, margin: "0 0 14px" }}>{desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {signals.map((s) => (
                      <span key={s} style={{
                        fontSize: 11.5, color: "#5EEAD4", background: "rgba(94,234,212,0.06)",
                        border: "1px solid rgba(94,234,212,0.15)", borderRadius: 6, padding: "4px 9px"
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* scoring weights */}
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px" }}>Scoring Adapts to Available Evidence</h2>
            <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px", maxWidth: 600 }}>
              VERIS never pretends to have tested something it didn't. The weighting shifts based on what was
              actually verifiable for a given agent.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "No endpoint, no requester key", weight: "Metadata × 1.00", conf: "Low confidence" },
                { label: "Endpoint or web presence found", weight: "Metadata × 0.55 + Web × 0.45", conf: "Medium confidence" },
                { label: "Full live verification performed", weight: "Metadata × 0.30 + Web × 0.20 + Live × 0.50", conf: "High confidence" },
              ].map((row) => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
                  padding: "14px 20px", background: "rgba(17,20,26,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10
                }}>
                  <span style={{ fontSize: 13.5 }}>{row.label}</span>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#8B96A7", fontFamily: "monospace" }}>{row.weight}</span>
                    <span style={{ fontSize: 11, color: "#00D4FF" }}>{row.conf}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ecosystem gaps */}
          <div style={{
            background: "rgba(251,185,45,0.04)", border: "1px solid rgba(251,185,45,0.15)",
            borderRadius: 16, padding: 28, marginBottom: 56
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <MinusCircle size={18} color="#FBB92D" />
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>What CROO Doesn't Yet Expose</h3>
            </div>
            <p style={{ color: "#8B96A7", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 16px" }}>
              The CROO protocol currently has no public API for agent order history or reputation. VERIS surfaces
              this honestly in every report rather than guessing — these gaps reflect the maturity of the
              ecosystem, not a failure of the audited agent.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ECOSYSTEM_GAPS.map((g) => (
                <span key={g} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 11.5, color: "#8B96A7", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 9px"
                }}>
                  <XCircle size={10} />
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 48,
            padding: "16px 20px", background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.15)", borderRadius: 12
          }}>
            <CheckCircle2 size={16} color="#00D4FF" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#8B96A7", margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: "#F5F7FA" }}>Roadmap:</strong> every audit VERIS runs is stored as a Trust
              Receipt. As volume grows, VERIS becomes a source of the reputation data CROO doesn't yet provide —
              not just a consumer of it.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/audit">
              <button style={{
                background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 8, padding: "14px 32px", fontWeight: 600, fontSize: 15,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em"
              }}>
                Audit an Agent →
              </button>
            </Link>
          </div>

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
