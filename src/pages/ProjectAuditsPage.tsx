import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Shield, FileText, GitBranch, Users, AlertTriangle } from "lucide-react";
import "@/veris.css";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DIMENSIONS = [
  {
    Icon: Users,
    title: "Identity",
    desc: "Are founders named publicly? Is there a verifiable team page, LinkedIn presence, or track record across prior ventures?",
    signals: ["Founders publicly named", "LinkedIn profiles confirmed", "Team page found", "Verifiable track record"],
  },
  {
    Icon: FileText,
    title: "Transparency",
    desc: "Does the project document itself clearly — whitepaper, technical docs, roadmap, tokenomics, and a stated use case?",
    signals: ["Whitepaper found", "Technical documentation", "Roadmap confirmed", "Tokenomics documented"],
  },
  {
    Icon: GitBranch,
    title: "Verification",
    desc: "Is the code open source and actively maintained? Has the protocol been audited by a recognized security firm?",
    signals: ["Open source confirmed", "Active GitHub", "Security audit found", "Live product confirmed"],
  },
  {
    Icon: Shield,
    title: "Reputation",
    desc: "How long has the project operated without a confirmed fraud, scam, or critical hack? Longevity and clean history matter.",
    signals: ["No confirmed fraud/scam history", "No confirmed critical hack", "Active 5+ years", "Media coverage"],
  },
];

const ENTITY_TYPES = [
  { label: "L1 / L2 Blockchains", note: "Bitcoin, Ethereum, Solana — verification & longevity weighted highest" },
  { label: "DeFi Protocols", note: "Aave, Uniswap, Curve — audit history is critical" },
  { label: "Trading Protocols", note: "Hyperliquid, dYdX — identity & verification weighted equally" },
  { label: "DAOs", note: "MakerDAO — on-chain governance & transparency are primary" },
  { label: "Infrastructure", note: "XRPL, Chainlink — verification & reputation weighted highest" },
  { label: "Startups", note: "Early-stage — founder transparency is the primary signal" },
];

export default function ProjectAuditsPage() {
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
              WEB3 & DEFI
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px" }}>
              Project Due Diligence
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 16, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
              Before you invest, partner, or integrate, VERIS investigates a project across four trust dimensions
              using live web evidence — not just what the project says about itself. Every signal is sourced,
              tiered by authority, and resolved against known ground truth for established entities.
            </p>
          </div>

          {/* dimensions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 56 }}>
            {DIMENSIONS.map(({ Icon, title, desc, signals }) => (
              <div key={title} style={{
                background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: 28
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "rgba(0,212,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16
                }}>
                  <Icon size={17} color="#00D4FF" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
                <p style={{ color: "#8B96A7", fontSize: 13.5, lineHeight: 1.6, margin: "0 0 16px" }}>{desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {signals.map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#5EEAD4" }}>
                      <CheckCircle2 size={12} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* entity types */}
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px" }}>Entity-Aware Scoring</h2>
            <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px", maxWidth: 600 }}>
              A DAO and an early-stage startup shouldn't be scored on the same rubric. VERIS detects entity type
              and weights the four dimensions accordingly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
              {ENTITY_TYPES.map((e, i) => (
                <div key={e.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
                  padding: "16px 20px",
                  background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)"
                }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{e.label}</span>
                  <span style={{ fontSize: 12.5, color: "#8B96A7" }}>{e.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* hard events */}
          <div style={{
            background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 16, padding: 28, marginBottom: 56
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AlertTriangle size={18} color="#FF6B6B" />
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Hard Trust Events Override Everything</h3>
            </div>
            <p style={{ color: "#8B96A7", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
              Confirmed fraud, rug pulls, SEC/CFTC enforcement, sanctions, or criminal convictions force a Critical
              Risk score regardless of how strong other signals look. VERIS also maintains a ground-truth database
              of major historical incidents — collapses like Terra/Luna and FTX are flagged with sourced detail
              even when current web evidence is incomplete.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/audit">
              <button style={{
                background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 8, padding: "14px 32px", fontWeight: 600, fontSize: 15,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em"
              }}>
                Run a Project Audit →
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
