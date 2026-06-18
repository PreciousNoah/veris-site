import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Copy, Check } from "lucide-react";
import "@/veris.css";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodeBlock({ code, lang = "json" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", marginTop: 12, marginBottom: 4 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.03)", borderRadius: "8px 8px 0 0",
        padding: "8px 14px", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none"
      }}>
        <span style={{ fontSize: 11, color: "#8B96A7", letterSpacing: "0.04em" }}>{lang}</span>
        <button
          onClick={handleCopy}
          style={{
            display: "flex", alignItems: "center", gap: 5, background: "transparent",
            border: "none", color: copied ? "#5EEAD4" : "#8B96A7", fontSize: 11,
            cursor: "pointer", fontFamily: "inherit"
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre style={{
        background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0 0 8px 8px", padding: 16, margin: 0,
        fontSize: 12.5, color: "#A8EDEA", overflowX: "auto",
        fontFamily: "monospace", lineHeight: 1.65
      }}>
        {code}
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = { GET: "#5EEAD4", POST: "#00D4FF" };
  const c = colors[method] || "#8B96A7";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 700,
      color: c, background: `${c}14`, border: `1px solid ${c}33`,
      borderRadius: 5, padding: "2px 8px", letterSpacing: "0.04em", marginRight: 10
    }}>
      {method}
    </span>
  );
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "auth", label: "Authentication" },
  { id: "audit", label: "POST /audit" },
  { id: "compare", label: "POST /compare" },
  { id: "receipts", label: "GET /receipts" },
  { id: "schema", label: "Report Schema" },
  { id: "errors", label: "Errors" },
  { id: "croo", label: "CROO Order Format" },
];

export default function DocsPage() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px, 6vh, 64px) 24px 120px", display: "flex", gap: 48 }}>

        {/* sidebar */}
        <aside style={{ flex: "0 0 200px", display: "none" }} className="veris-docs-sidebar">
          <div style={{ position: "sticky", top: 100 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 16 }}>
              Documentation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    textAlign: "left", background: active === s.id ? "rgba(0,212,255,0.06)" : "transparent",
                    border: "none", borderLeft: `2px solid ${active === s.id ? "#00D4FF" : "transparent"}`,
                    color: active === s.id ? "#00D4FF" : "#8B96A7", fontSize: 13,
                    padding: "8px 12px", cursor: "pointer", fontFamily: "inherit", borderRadius: "0 6px 6px 0"
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* content */}
        <main style={{ flex: "1 1 auto", minWidth: 0, maxWidth: 720 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>
                API & GUIDES
              </p>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 16px" }}>
                Documentation
              </h1>
              <p style={{ color: "#8B96A7", fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
                VERIS is reachable through CROO orders or directly via HTTP. Every endpoint returns a structured
                trust report you can parse, store, or display.
              </p>
            </div>

            {/* Overview */}
            <section id="overview" style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Overview</h2>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: "0 0 16px" }}>
                VERIS performs trust due diligence on two entity types — Web3 projects and AI agents — and returns
                a plain-text structured report inside a JSON envelope. There is no separate "production" API key
                tier yet; the same endpoints power both the live website and CROO order fulfillment.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                {[
                  ["Base URL", "Your deployed backend (e.g. Railway/Render URL)"],
                  ["Protocol", "REST over HTTPS, JSON request & response bodies"],
                  ["Auth", "None required for direct HTTP calls (see Authentication)"],
                  ["Rate limits", "None enforced yet — be considerate, each audit runs live web search"],
                ].map(([k, v], i) => (
                  <div key={k} style={{ display: "flex", padding: "12px 18px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
                    <span style={{ flex: "0 0 110px", fontSize: 12.5, color: "#00D4FF" }}>{k}</span>
                    <span style={{ fontSize: 12.5, color: "#8B96A7" }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Auth */}
            <section id="auth" style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Authentication</h2>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                Direct HTTP calls to <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>/audit</code>,{" "}
                <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>/compare</code>, and{" "}
                <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>/receipts</code> require
                no API key today. Authentication and request signing for CROO orders is handled entirely by the
                CROO SDK on the agent side — requesters interact through the Agent Store, not raw HTTP.
              </p>
            </section>

            {/* Audit */}
            <section id="audit" style={{ marginBottom: 56 }}>
              <div style={{ marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontSize: 15, fontWeight: 600 }}>/audit</code>
              </div>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>
                Runs project or agent due diligence and returns the full report. This is the core endpoint — the
                audit form on the site calls this directly.
              </p>

              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#F5F7FA", margin: "24px 0 4px" }}>Request body — Project</h3>
              <CodeBlock code={`{
  "requirements": {
    "type": "project",
    "name": "Aave",
    "website": "https://aave.com",
    "github": "https://github.com/aave",
    "twitter": "https://x.com/aave",
    "mode": "full"
  }
}`} />

              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#F5F7FA", margin: "24px 0 4px" }}>Request body — Agent</h3>
              <CodeBlock code={`{
  "requirements": {
    "type": "agent",
    "agentId": "1b301682-55f4-4ca2-8fb6-deff838ab9fe",
    "agentName": "ZERU",
    "endpointUrl": "https://zeru-agent.example.app",
    "serviceDescription": "DeFi research and market intelligence agent",
    "category": "research",
    "mode": "full"
  }
}`} />

              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#F5F7FA", margin: "24px 0 4px" }}>Response</h3>
              <CodeBlock code={`{
  "report": "VERIS TRUST REPORT\\n══════════════...\\n(full text report)"
}`} />

              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#F5F7FA", margin: "24px 0 4px" }}>Request fields</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", marginTop: 8 }}>
                {[
                  ["type", "string", "\"project\" or \"agent\" — required"],
                  ["name", "string", "Project name — required for project audits"],
                  ["website / github / twitter", "string", "Optional URLs to aid entity resolution"],
                  ["agentId", "string", "CROO agent ID or agent name — required for agent audits"],
                  ["endpointUrl", "string", "Optional. Enables Layer 3 HTTP prompt testing"],
                  ["category", "string", "research | trading | data | writing | coding | defi | security | general"],
                  ["mode", "string", "\"quick\" or \"full\" — controls verification depth"],
                ].map(([k, t, d], i) => (
                  <div key={k} style={{ display: "flex", flexWrap: "wrap", padding: "12px 18px", gap: 8, background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
                    <code style={{ flex: "0 0 180px", fontSize: 12, color: "#00D4FF" }}>{k}</code>
                    <span style={{ flex: "0 0 60px", fontSize: 11.5, color: "#FBB92D" }}>{t}</span>
                    <span style={{ flex: "1 1 200px", fontSize: 12.5, color: "#8B96A7" }}>{d}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Compare */}
            <section id="compare" style={{ marginBottom: 56 }}>
              <div style={{ marginBottom: 12 }}>
                <MethodBadge method="POST" />
                <code style={{ fontSize: 15, fontWeight: 600 }}>/compare</code>
              </div>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>
                Runs due diligence on 2–5 agents in parallel and returns a ranked comparison table with a single
                recommendation. Useful when choosing between multiple agents offering the same service.
              </p>
              <CodeBlock code={`{
  "agents": [
    { "agentId": "...", "agentName": "ZERU", "endpointUrl": "...", "category": "research" },
    { "agentId": "...", "agentName": "Foundr", "category": "research" }
  ]
}`} />
              <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.6, margin: "12px 0 0" }}>
                Minimum 2 agents, maximum 5 per request. Each agent in the comparison is also saved as an
                individual Trust Receipt.
              </p>
            </section>

            {/* Receipts */}
            <section id="receipts" style={{ marginBottom: 56 }}>
              <div style={{ marginBottom: 12 }}>
                <MethodBadge method="GET" />
                <code style={{ fontSize: 15, fontWeight: 600 }}>/receipts/:entityId</code>
              </div>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>
                Returns the audit history for a specific entity — every previous score, risk level, and timestamp.
              </p>
              <CodeBlock code={`{
  "entityId": "aave",
  "receipts": [
    {
      "id": "uuid",
      "entity_type": "project",
      "entity_name": "Aave",
      "score": 74,
      "risk_level": "Generally Legitimate",
      "signals_verified": 11,
      "signals_total": 27,
      "created_at": "2026-06-14T10:32:00Z"
    }
  ]
}`} />

              <div style={{ marginTop: 24, marginBottom: 8 }}>
                <MethodBadge method="GET" />
                <code style={{ fontSize: 15, fontWeight: 600 }}>/receipts</code>
              </div>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Returns the 20 most recent receipts across all entities — a global activity feed.
              </p>
            </section>

            {/* Schema */}
            <section id="schema" style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Report Schema</h2>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px" }}>
                Reports are returned as structured plain text rather than nested JSON, designed to be both
                human-readable and delivered on-chain via CROO. Key sections you can parse with regex:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                {[
                  ["LEGITIMACY: 72/100", "Project overall score (0–100, or N/A)"],
                  ["OVERALL SCORE: 78/100", "Agent overall score (0–100)"],
                  ["RECOMMENDATION: ✓ TRUSTED", "Final verdict label"],
                  ["CONFIDENCE: High / Medium / Low", "How much evidence backs the score"],
                  ["MAJOR HISTORICAL INCIDENTS", "Ground-truth incidents block (if any)"],
                  ["VERIFIABLE SIGNAL COVERAGE", "Agent reports: confirmed vs. untested signals"],
                ].map(([k, v], i) => (
                  <div key={k} style={{ display: "flex", flexWrap: "wrap", padding: "12px 18px", gap: 10, background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
                    <code style={{ flex: "0 0 260px", fontSize: 12, color: "#5EEAD4" }}>{k}</code>
                    <span style={{ fontSize: 12.5, color: "#8B96A7" }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Errors */}
            <section id="errors" style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Errors</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                {[
                  ["400", "Missing required field (e.g. no agentId, fewer than 2 agents for /compare)"],
                  ["500", "Upstream failure — web search, LLM extraction, or CROO call failed"],
                ].map(([code, v], i) => (
                  <div key={code} style={{ display: "flex", padding: "12px 18px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
                    <span style={{ flex: "0 0 60px", fontSize: 13, fontWeight: 700, color: "#FF6B6B" }}>{code}</span>
                    <span style={{ fontSize: 12.5, color: "#8B96A7" }}>{v}</span>
                  </div>
                ))}
              </div>
              <CodeBlock code={`{ "error": "Compare requires at least 2 agents" }`} />
            </section>

            {/* CROO format */}
            <section id="croo" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>Ordering Through CROO</h2>
              <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px" }}>
                VERIS is listed on the CROO Agent Store and fulfills orders automatically. Submit your requirements
                as JSON when placing the order — the same shape as the <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>requirements</code> object above:
              </p>
              <CodeBlock code={`{
  "type": "project",
  "name": "Uniswap",
  "website": "https://uniswap.org"
}`} />
              <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.6, margin: "16px 0 0" }}>
                Payment, escrow, and on-chain delivery are handled by the CROO protocol on Base Mainnet. VERIS
                delivers the same structured report as the HTTP endpoint, written on-chain via{" "}
                <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>deliverOrder()</code>.
              </p>
            </section>

          </motion.div>
        </main>
      </div>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px"
      }} />
    </div>
  );
}
