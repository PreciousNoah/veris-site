import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Database, BarChart2, GitMerge, Award, ArrowRight } from "lucide-react";
import "@/veris.css";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STAGES = [
  {
    num: "01",
    Icon: Database,
    title: "Collect Evidence",
    color: "#00D4FF",
    summary: "VERIS runs 5–8 targeted web searches per audit, covering identity, documentation, development activity, community signals, risk flags, and longevity.",
    detail: [
      "Search queries are built dynamically based on entity type — a DeFi protocol gets an audit-firm search, a DAO gets a governance search.",
      "Each result is tagged with a source tier (T1 official, T2 media/audit, T3 community, T4 inferred) at the point of collection, not after the fact.",
      "Up to 40 sources are gathered per full audit before any scoring begins.",
    ],
  },
  {
    num: "02",
    Icon: BarChart2,
    title: "Extract & Resolve Signals",
    color: "#8DEBFF",
    summary: "Structured extraction converts raw search results into a fixed set of YES / NO / UNKNOWN signals — never inferred, only explicitly confirmed or contradicted.",
    detail: [
      "An LLM extraction pass reads the combined evidence and fills out ~40 structured fields with per-signal confidence scores and source URLs.",
      "A ground-truth resolver then checks the entity against a hand-verified database of ~30 known projects and historical incidents (Bitcoin, Aave, Terra, FTX, and others), applying floors or ceilings so well-known entities can't be miscored by weak extraction.",
      "Evidence below 60% confidence is downgraded to UNKNOWN rather than counted as a negative signal — missing evidence is never treated as proof of wrongdoing.",
    ],
  },
  {
    num: "03",
    Icon: GitMerge,
    title: "Verify Source Quality",
    color: "#5EEAD4",
    summary: "Certain claims — whitepapers, audits, GitHub activity, governance — require at least one tier-1 official source to count. Community chatter alone isn't enough.",
    detail: [
      "If a signal like \"audit_found\" only has a Reddit thread backing it, VERIS downgrades it back to UNKNOWN rather than awarding points for an unverified claim.",
      "Hard trust events — confirmed fraud, rug pulls, SEC enforcement, sanctions — require a citation with a real source URL and a verbatim quote of at least 25 characters before they're allowed to affect a score.",
      "This source-quality gate is what keeps a single unverified blog post from swinging a trust score in either direction.",
    ],
  },
  {
    num: "04",
    Icon: Award,
    title: "Generate Trust Intelligence",
    color: "#A8EDEA",
    summary: "Verified signals are weighted by entity type and combined into a legitimacy score, a maturity score, a confidence rating, and a plain-language recommendation.",
    detail: [
      "Entity-aware weighting means a DAO is scored differently from a startup — on-chain governance matters more for one, founder transparency matters more for the other.",
      "A reasonableness layer checks the final score against expected ranges for well-known entity classes and flags anomalies rather than silently outputting an implausible number.",
      "The report is delivered as structured text — readable by a human, parseable by a machine, and deliverable on-chain via CROO.",
    ],
  },
];

export default function HowVerisWorksPage() {
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
              METHODOLOGY
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px" }}>
              How VERIS Works
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 16, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
              Every audit runs through the same four-stage pipeline, whether the request comes through a CROO
              order or a direct API call. Nothing is scored from a single source, and nothing is scored without
              a citation.
            </p>
          </div>

          {/* pipeline visual */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginBottom: 56, flexWrap: "wrap"
          }}>
            {STAGES.map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(17,20,26,0.7)", border: `1px solid ${s.color}33`,
                  borderRadius: 20, padding: "8px 16px"
                }}>
                  <s.Icon size={13} color={s.color} />
                  <span style={{ fontSize: 12.5, color: "#F5F7FA" }}>{s.title}</span>
                </div>
                {i < STAGES.length - 1 && <ArrowRight size={14} color="#8B96A7" />}
              </div>
            ))}
          </div>

          {/* detailed stages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56 }}>
            {STAGES.map((s) => (
              <div key={s.num} style={{
                background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: 28
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
                  <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontWeight: 700 }}>{s.num}</span>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, background: `${s.color}14`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <s.Icon size={17} color={s.color} />
                    </div>
                  </div>
                  <div style={{ flex: "1 1 320px" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{s.title}</h3>
                    <p style={{ color: "#F5F7FA", fontSize: 14, lineHeight: 1.65, margin: "0 0 16px", opacity: 0.85 }}>
                      {s.summary}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {s.detail.map((d, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, marginTop: 7, flexShrink: 0 }} />
                          <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* honesty principle */}
          <div style={{
            background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: 16, padding: 28, marginBottom: 56
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px", color: "#00D4FF" }}>
              The Core Rule: Missing Evidence ≠ Negative Evidence
            </h3>
            <p style={{ color: "#8B96A7", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
              If VERIS can't find a whitepaper, that's marked UNKNOWN — not "no whitepaper exists." A score is
              never penalized for evidence that simply wasn't found. The only way a score drops is through
              explicit negative evidence: a confirmed source contradicting a claim, or a hard trust event with a
              verified citation. This distinction is why VERIS reports separate confidence ratings alongside
              every score — a 60/100 with high confidence means something very different from a 60/100 with low
              confidence.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/audit">
              <button style={{
                background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 8, padding: "14px 32px", fontWeight: 600, fontSize: 15,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em"
              }}>
                See It In Action →
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
