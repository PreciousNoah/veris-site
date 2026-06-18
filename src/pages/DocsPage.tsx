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
        fontSize: 12, color: "#A8EDEA",
        overflowX: "auto", overflowY: "hidden",
        fontFamily: "monospace", lineHeight: 1.65,
        whiteSpace: "pre", wordBreak: "normal",
        maxWidth: "100%", boxSizing: "border-box" as const,
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
      borderRadius: 5, padding: "2px 8px", letterSpacing: "0.04em", marginRight: 8,
      flexShrink: 0,
    }}>
      {method}
    </span>
  );
}

// Stacked table row — always stacks on mobile, label on top, value below
function InfoRow({ label, value, i }: { label: string; value: string; i: number }) {
  return (
    <div style={{
      padding: "12px 16px",
      background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)",
    }}>
      <code style={{ fontSize: 12, color: "#00D4FF", display: "block", marginBottom: 3 }}>{label}</code>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

function FieldRow({ name, type, desc, i }: { name: string; type: string; desc: string; i: number }) {
  return (
    <div style={{
      padding: "12px 16px",
      background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
        <code style={{ fontSize: 12, color: "#00D4FF" }}>{name}</code>
        <span style={{ fontSize: 11, color: "#FBB92D" }}>{type}</span>
      </div>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.5 }}>{desc}</span>
    </div>
  );
}

function SchemaRow({ pattern, desc, i }: { pattern: string; desc: string; i: number }) {
  return (
    <div style={{
      padding: "12px 16px",
      background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)",
    }}>
      <code style={{ fontSize: 12, color: "#5EEAD4", display: "block", marginBottom: 3, wordBreak: "break-all" }}>{pattern}</code>
      <span style={{ fontSize: 13, color: "#8B96A7" }}>{desc}</span>
    </div>
  );
}

function ErrorRow({ code, desc, i }: { code: string; desc: string; i: number }) {
  return (
    <div style={{
      padding: "12px 16px",
      background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)",
    }}>
      <code style={{ fontSize: 13, fontWeight: 700, color: "#FF6B6B", display: "block", marginBottom: 3 }}>{code}</code>
      <span style={{ fontSize: 13, color: "#8B96A7" }}>{desc}</span>
    </div>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", marginTop: 8, width: "100%" }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 10px", wordBreak: "break-word" }}>{children}</h2>;
}

function Body({ children, mb = 20 }: { children: React.ReactNode; mb?: number }) {
  return <p style={{ color: "#8B96A7", fontSize: 14, lineHeight: 1.75, margin: `0 0 ${mb}px`, wordBreak: "break-word" }}>{children}</p>;
}

function IC({ text }: { text: string }) {
  return <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: 13, wordBreak: "break-all" }}>{text}</code>;
}

function EndpointHead({ method, path }: { method: string; path: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      <MethodBadge method={method} />
      <code style={{ fontSize: 15, fontWeight: 600, wordBreak: "break-all" }}>{path}</code>
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

export default function DocsPage() {
  const [active, setActive] = useState("overview");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08090D",
      color: "#F5F7FA",
      fontFamily: "Inter, sans-serif",
      overflowX: "hidden",  /* prevents any child from causing page-level horizontal scroll */
    }}>

      {/* ── NAV ── */}
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

      {/* ── LAYOUT WRAPPER — no flex on mobile ── */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 20px 120px",
        boxSizing: "border-box",
        width: "100%",
      }}>
        {/* On desktop the sidebar sits beside content via CSS class */}
        <div className="veris-docs-layout">

          {/* SIDEBAR */}
          <aside className="veris-docs-sidebar">
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
                    fontFamily: "inherit", borderRadius: "0 6px 6px 0",
                  }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN — minWidth:0 stops flex children overflowing */}
          <main style={{ minWidth: 0, width: "100%", boxSizing: "border-box" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Header */}
              <div style={{ marginBottom: 48 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
                  API & GUIDES
                </p>
                <h1 style={{ fontSize: "clamp(1.8rem, 8vw, 3rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 14px", wordBreak: "break-word" }}>
                  Documentation
                </h1>
                <Body>
                  VERIS is reachable through CROO orders or directly via HTTP.
                  Every endpoint returns a structured trust report you can parse, store, or display.
                </Body>
              </div>

              {/* Overview */}
              <section id="overview" style={{ marginBottom: 48 }}>
                <SectionTitle>Overview</SectionTitle>
                <Body>VERIS performs trust due diligence on Web3 projects and AI agents, returning a plain-text structured report inside a JSON envelope. The same endpoints power the live website and CROO order fulfillment.</Body>
                <TableWrap>
                  <InfoRow i={0} label="Base URL" value="Your Railway / Render deployment URL" />
                  <InfoRow i={1} label="Protocol" value="REST over HTTPS — JSON request & response bodies" />
                  <InfoRow i={2} label="Auth" value="None required for direct HTTP calls" />
                  <InfoRow i={3} label="Rate limits" value="None enforced yet — each audit runs live web search" />
                </TableWrap>
              </section>

              {/* Auth */}
              <section id="auth" style={{ marginBottom: 48 }}>
                <SectionTitle>Authentication</SectionTitle>
                <Body>Direct HTTP calls to <IC text="/audit" />, <IC text="/compare" />, and <IC text="/receipts" /> require no API key. Authentication for CROO orders is handled by the CROO SDK — requesters interact through the Agent Store, not raw HTTP.</Body>
              </section>

              {/* POST /audit */}
              <section id="audit" style={{ marginBottom: 48 }}>
                <EndpointHead method="POST" path="/audit" />
                <Body>Runs project or agent due diligence and returns the full report.</Body>

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Project request</p>
                <CodeBlock code={`{
  "requirements": {
    "type": "project",
    "name": "Aave",
    "website": "https://aave.com",
    "github": "https://github.com/aave",
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
    "category": "research",
    "mode": "full"
  }
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Response</p>
                <CodeBlock code={`{ "report": "VERIS TRUST REPORT\\n══...\\n(full text)" }`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 4px" }}>Request fields</p>
                <TableWrap>
                  <FieldRow i={0} name="type" type="string" desc='"project" or "agent" — required' />
                  <FieldRow i={1} name="name" type="string" desc="Project name — required for project audits" />
                  <FieldRow i={2} name="website / github" type="string" desc="Optional URLs to help entity resolution" />
                  <FieldRow i={3} name="agentId" type="string" desc="CROO agent ID — required for agent audits" />
                  <FieldRow i={4} name="endpointUrl" type="string" desc="Optional. Enables Layer 3 HTTP prompt testing" />
                  <FieldRow i={5} name="category" type="string" desc="research | trading | data | writing | coding | defi | security | general" />
                  <FieldRow i={6} name="mode" type="string" desc='"quick" or "full" — controls depth' />
                </TableWrap>
              </section>

              {/* POST /compare */}
              <section id="compare" style={{ marginBottom: 48 }}>
                <EndpointHead method="POST" path="/compare" />
                <Body>Runs due diligence on 2–5 agents in parallel and returns a ranked comparison table with a single recommendation.</Body>
                <CodeBlock code={`{
  "agents": [
    { "agentId": "...", "agentName": "ZERU", "category": "research" },
    { "agentId": "...", "agentName": "Foundr", "category": "research" }
  ]
}`} />
                <Body mb={0}>Minimum 2 agents, maximum 5. Each also generates an individual Trust Receipt.</Body>
              </section>

              {/* GET /receipts */}
              <section id="receipts" style={{ marginBottom: 48 }}>
                <EndpointHead method="GET" path="/receipts/:entityId" />
                <Body>Returns full audit history for an entity — every score, risk level, and timestamp VERIS has recorded.</Body>
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
                  <EndpointHead method="GET" path="/receipts" />
                  <Body mb={0}>Returns the 20 most recent receipts across all entities — a global activity feed.</Body>
                </div>
              </section>

              {/* Schema */}
              <section id="schema" style={{ marginBottom: 48 }}>
                <SectionTitle>Report Schema</SectionTitle>
                <Body>Reports are plain text inside a JSON envelope. Parse these key lines to extract structured data:</Body>
                <TableWrap>
                  <SchemaRow i={0} pattern="LEGITIMACY: 72/100" desc="Project overall score (0–100 or N/A)" />
                  <SchemaRow i={1} pattern="OVERALL SCORE: 78/100" desc="Agent overall score (0–100)" />
                  <SchemaRow i={2} pattern="RECOMMENDATION: ✓ TRUSTED" desc="Final verdict label" />
                  <SchemaRow i={3} pattern="CONFIDENCE: High / Medium / Low" desc="Evidence strength behind the score" />
                  <SchemaRow i={4} pattern="MAJOR HISTORICAL INCIDENTS" desc="Ground-truth incidents block (if any)" />
                  <SchemaRow i={5} pattern="VERIFIABLE SIGNAL COVERAGE" desc="Agent reports: confirmed vs. untested signals" />
                </TableWrap>
              </section>

              {/* Errors */}
              <section id="errors" style={{ marginBottom: 48 }}>
                <SectionTitle>Errors</SectionTitle>
                <TableWrap>
                  <ErrorRow i={0} code="400" desc="Missing required field — e.g. no agentId, or fewer than 2 agents for /compare" />
                  <ErrorRow i={1} code="500" desc="Upstream failure — web search, LLM extraction, or CROO call failed" />
                </TableWrap>
                <CodeBlock code={`{ "error": "Compare requires at least 2 agents" }`} />
              </section>

              {/* CROO */}
              <section id="croo" style={{ marginBottom: 0 }}>
                <SectionTitle>Ordering Through CROO</SectionTitle>
                <Body>VERIS is listed on the CROO Agent Store and fulfills orders automatically. Submit requirements as JSON — same shape as the <IC text="requirements" /> field above.</Body>
                <CodeBlock code={`{
  "type": "project",
  "name": "Uniswap",
  "website": "https://uniswap.org"
}`} />
                <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.65, margin: "14px 0 0", wordBreak: "break-word" }}>
                  Payment, escrow, and on-chain delivery are handled by CROO on Base Mainnet.
                  VERIS delivers via <IC text="deliverOrder()" />.
                </p>
              </section>

            </motion.div>
          </main>
        </div>
      </div>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px"
      }} />
    </div>
  );
}
