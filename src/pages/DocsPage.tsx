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
        <button onClick={handleCopy} style={{
          display: "flex", alignItems: "center", gap: 5, background: "transparent",
          border: "none", color: copied ? "#5EEAD4" : "#8B96A7", fontSize: 11,
          cursor: "pointer", fontFamily: "inherit"
        }}>
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre style={{
        background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0 0 8px 8px", padding: 16, margin: 0,
        fontSize: 12, color: "#A8EDEA", overflowX: "auto",
        fontFamily: "monospace", lineHeight: 1.65,
        whiteSpace: "pre", wordBreak: "normal"
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

// Mobile-safe table row: stacks vertically on small screens
function TableRow({
  cells, bg, stack = false
}: {
  cells: { value: string; color?: string; mono?: boolean }[];
  bg: string;
  stack?: boolean;
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: stack ? "column" : "row",
      flexWrap: "wrap",
      padding: "12px 16px",
      gap: stack ? 4 : 8,
      background: bg,
    }}>
      {cells.map((cell, i) => (
        cell.mono
          ? <code key={i} style={{ fontSize: 12, color: cell.color || "#F5F7FA", wordBreak: "break-all", lineHeight: 1.5 }}>{cell.value}</code>
          : <span key={i} style={{ fontSize: 12.5, color: cell.color || "#8B96A7", lineHeight: 1.5 }}>{cell.value}</span>
      ))}
    </div>
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
  { id: "croo", label: "CROO Orders" },
];

const inlineCode = (text: string) => (
  <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>
    {text}
  </code>
);

export default function DocsPage() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionHead = (title: string) => (
    <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px" }}>{title}</h2>
  );

  const body = (text: string | React.ReactNode, mb = 20) => (
    <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: `0 0 ${mb}px` }}>{text}</p>
  );

  const endpointHead = (method: string, path: string) => (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      <MethodBadge method={method} />
      <code style={{ fontSize: 15, fontWeight: 600 }}>{path}</code>
    </div>
  );

  const table = (rows: { cells: { value: string; color?: string; mono?: boolean }[] }[]) => (
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", marginTop: 8 }}>
      {rows.map((row, i) => (
        <TableRow
          key={i}
          cells={row.cells}
          bg={i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)"}
          stack={row.cells.length > 2}
        />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif" }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px clamp(16px, 4vw, 48px)",
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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(32px, 6vh, 64px) clamp(16px, 4vw, 32px) 120px", display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* sidebar — hidden on mobile, shown on desktop via veris.css */}
        <aside style={{ flex: "0 0 180px", display: "none" }} className="veris-docs-sidebar">
          <div style={{ position: "sticky", top: 90 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>
              Contents
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {SECTIONS.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                  textAlign: "left",
                  background: active === s.id ? "rgba(0,212,255,0.06)" : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${active === s.id ? "#00D4FF" : "transparent"}`,
                  color: active === s.id ? "#00D4FF" : "#8B96A7",
                  fontSize: 13, padding: "7px 12px", cursor: "pointer",
                  fontFamily: "inherit", borderRadius: "0 6px 6px 0", transition: "color 0.2s"
                }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* main content — minWidth: 0 is critical to prevent flex overflow */}
        <main style={{ flex: "1 1 auto", minWidth: 0 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* header */}
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
                API & GUIDES
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 14px" }}>
                Documentation
              </h1>
              <p style={{ color: "#8B96A7", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                VERIS is reachable through CROO orders or directly via HTTP.
                Every endpoint returns a structured trust report you can parse, store, or display.
              </p>
            </div>

            {/* ── Overview ── */}
            <section id="overview" style={{ marginBottom: 48 }}>
              {sectionHead("Overview")}
              {body("VERIS performs trust due diligence on two entity types — Web3 projects and AI agents — and returns a plain-text structured report inside a JSON envelope. The same endpoints power both the live website and CROO order fulfillment.")}
              {table([
                { cells: [{ value: "Base URL", color: "#00D4FF", mono: true }, { value: "Your Railway / Render deployment URL" }] },
                { cells: [{ value: "Protocol", color: "#00D4FF", mono: true }, { value: "REST over HTTPS — JSON request & response bodies" }] },
                { cells: [{ value: "Auth", color: "#00D4FF", mono: true }, { value: "None required for direct HTTP calls" }] },
                { cells: [{ value: "Rate limits", color: "#00D4FF", mono: true }, { value: "None enforced yet — each audit runs live web search" }] },
              ])}
            </section>

            {/* ── Auth ── */}
            <section id="auth" style={{ marginBottom: 48 }}>
              {sectionHead("Authentication")}
              {body(<>Direct HTTP calls to {inlineCode("/audit")}, {inlineCode("/compare")}, and {inlineCode("/receipts")} require no API key. Authentication for CROO orders is handled entirely by the CROO SDK — requesters interact through the Agent Store, not raw HTTP.</>)}
            </section>

            {/* ── POST /audit ── */}
            <section id="audit" style={{ marginBottom: 48 }}>
              {endpointHead("POST", "/audit")}
              {body("Runs project or agent due diligence and returns the full report. This is the core endpoint.")}

              <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Project request</p>
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

              <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Agent request</p>
              <CodeBlock code={`{
  "requirements": {
    "type": "agent",
    "agentId": "1b301682-55f4-4ca2-8fb6-deff838ab9fe",
    "agentName": "ZERU",
    "endpointUrl": "https://zeru-agent.example.app",
    "serviceDescription": "DeFi research and market intelligence",
    "category": "research",
    "mode": "full"
  }
}`} />

              <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Response</p>
              <CodeBlock code={`{
  "report": "VERIS TRUST REPORT\\n══════...\\n(full structured text)"
}`} />

              <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 4px" }}>Request fields</p>
              {table([
                { cells: [{ value: "type", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: '"project" or "agent" — required' }] },
                { cells: [{ value: "name", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: "Project name — required for project audits" }] },
                { cells: [{ value: "website / github / twitter", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: "Optional URLs to help entity resolution" }] },
                { cells: [{ value: "agentId", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: "CROO agent ID — required for agent audits" }] },
                { cells: [{ value: "endpointUrl", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: "Optional. Enables Layer 3 HTTP prompt testing" }] },
                { cells: [{ value: "category", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: "research | trading | data | writing | coding | defi | security | general" }] },
                { cells: [{ value: "mode", color: "#00D4FF", mono: true }, { value: "string", color: "#FBB92D" }, { value: '"quick" or "full" — controls verification depth' }] },
              ])}
            </section>

            {/* ── POST /compare ── */}
            <section id="compare" style={{ marginBottom: 48 }}>
              {endpointHead("POST", "/compare")}
              {body("Runs due diligence on 2–5 agents in parallel and returns a ranked comparison table with a single best-fit recommendation.")}
              <CodeBlock code={`{
  "agents": [
    {
      "agentId": "...",
      "agentName": "ZERU",
      "endpointUrl": "https://zeru.example.app",
      "category": "research"
    },
    {
      "agentId": "...",
      "agentName": "Foundr",
      "category": "research"
    }
  ]
}`} />
              {body("Minimum 2 agents, maximum 5. Each agent also generates an individual Trust Receipt.", 0)}
            </section>

            {/* ── GET /receipts ── */}
            <section id="receipts" style={{ marginBottom: 48 }}>
              {endpointHead("GET", "/receipts/:entityId")}
              {body("Returns the full audit history for an entity — every score, risk level, and timestamp VERIS has recorded.")}
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

              <div style={{ marginTop: 24 }}>
                {endpointHead("GET", "/receipts")}
                {body("Returns the 20 most recent receipts across all audited entities — a live trust activity feed.", 0)}
              </div>
            </section>

            {/* ── Schema ── */}
            <section id="schema" style={{ marginBottom: 48 }}>
              {sectionHead("Report Schema")}
              {body("Reports are plain text inside a JSON envelope — human-readable and deliverable on-chain via CROO. Parse these key lines to extract structured data:")}
              {table([
                { cells: [{ value: "LEGITIMACY: 72/100", color: "#5EEAD4", mono: true }, { value: "Project overall score (0–100 or N/A)" }] },
                { cells: [{ value: "OVERALL SCORE: 78/100", color: "#5EEAD4", mono: true }, { value: "Agent overall score (0–100)" }] },
                { cells: [{ value: "RECOMMENDATION: ✓ TRUSTED", color: "#5EEAD4", mono: true }, { value: "Final verdict label" }] },
                { cells: [{ value: "CONFIDENCE: High / Medium / Low", color: "#5EEAD4", mono: true }, { value: "How much evidence backs the score" }] },
                { cells: [{ value: "MAJOR HISTORICAL INCIDENTS", color: "#5EEAD4", mono: true }, { value: "Ground-truth incidents block (if any)" }] },
                { cells: [{ value: "VERIFIABLE SIGNAL COVERAGE", color: "#5EEAD4", mono: true }, { value: "Agent reports: confirmed vs. untested" }] },
              ])}
            </section>

            {/* ── Errors ── */}
            <section id="errors" style={{ marginBottom: 48 }}>
              {sectionHead("Errors")}
              {table([
                { cells: [{ value: "400", color: "#FF6B6B", mono: true }, { value: "Missing required field — e.g. no agentId, or fewer than 2 agents for /compare" }] },
                { cells: [{ value: "500", color: "#FF6B6B", mono: true }, { value: "Upstream failure — web search, LLM extraction, or CROO call failed" }] },
              ])}
              <CodeBlock code={`{ "error": "Compare requires at least 2 agents" }`} />
            </section>

            {/* ── CROO ── */}
            <section id="croo" style={{ marginBottom: 0 }}>
              {sectionHead("Ordering Through CROO")}
              {body(<>VERIS is listed on the CROO Agent Store and fulfills orders automatically. Submit requirements as JSON — same shape as the {inlineCode("requirements")} field above.</>)}
              <CodeBlock code={`{
  "type": "project",
  "name": "Uniswap",
  "website": "https://uniswap.org"
}`} />
              <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.65, margin: "14px 0 0" }}>
                Payment, escrow, and on-chain delivery are handled by CROO on Base Mainnet. VERIS
                delivers the same structured report via {inlineCode("deliverOrder()")}.
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
