import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Copy, Check, Menu, X } from "lucide-react";
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
    <div style={{ position: "relative", marginTop: 12, marginBottom: 4, width: "100%" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.03)", borderRadius: "8px 8px 0 0",
        padding: "8px 14px", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none",
        flexWrap: "wrap", gap: 4,
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
        borderRadius: "0 0 8px 8px", padding: "12px 14px", margin: 0,
        fontSize: 12, color: "#A8EDEA",
        overflowX: "auto", overflowY: "hidden",
        fontFamily: "monospace", lineHeight: 1.65,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
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

function InfoRow({ label, value, i }: { label: string; value: string; i: number }) {
  return (
    <div style={{ padding: "12px 16px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
      <code style={{ fontSize: 12, color: "#00D4FF", display: "block", marginBottom: 3, wordBreak: "break-word" }}>{label}</code>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.5, wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function FieldRow({ name, type, desc, i }: { name: string; type: string; desc: string; i: number }) {
  return (
    <div style={{ padding: "12px 16px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
        <code style={{ fontSize: 12, color: "#00D4FF", wordBreak: "break-word" }}>{name}</code>
        <span style={{ fontSize: 11, color: "#FBB92D" }}>{type}</span>
      </div>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.5, wordBreak: "break-word" }}>{desc}</span>
    </div>
  );
}

function SchemaRow({ pattern, desc, i }: { pattern: string; desc: string; i: number }) {
  return (
    <div style={{ padding: "12px 16px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
      <code style={{ fontSize: 12, color: "#5EEAD4", display: "block", marginBottom: 3, wordBreak: "break-word" }}>{pattern}</code>
      <span style={{ fontSize: 13, color: "#8B96A7", wordBreak: "break-word" }}>{desc}</span>
    </div>
  );
}

function ErrorRow({ code, desc, i }: { code: string; desc: string; i: number }) {
  return (
    <div style={{ padding: "12px 16px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)" }}>
      <code style={{ fontSize: 13, fontWeight: 700, color: "#FF6B6B", display: "block", marginBottom: 3 }}>{code}</code>
      <span style={{ fontSize: 13, color: "#8B96A7", wordBreak: "break-word" }}>{desc}</span>
    </div>
  );
}

function AgentRow({ agent, role, color, i }: { agent: string; role: string; color: string; i: number }) {
  return (
    <div style={{ padding: "14px 16px", background: i % 2 === 0 ? "rgba(17,20,26,0.5)" : "rgba(17,20,26,0.3)", display: "flex", alignItems: "flex-start", gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}14`, border: `1px solid ${color}33`, borderRadius: 5, padding: "2px 8px", flexShrink: 0, marginTop: 2 }}>{agent}</span>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.55, wordBreak: "break-word" }}>{role}</span>
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
  return <h2 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 500, margin: "0 0 10px", wordBreak: "break-word" }}>{children}</h2>;
}

function Body({ children, mb = 20 }: { children: React.ReactNode; mb?: number }) {
  return <p style={{ color: "#8B96A7", fontSize: "clamp(13px, 2vw, 14px)", lineHeight: 1.75, margin: `0 0 ${mb}px`, wordBreak: "break-word" }}>{children}</p>;
}

function IC({ text }: { text: string }) {
  return <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: 13, wordBreak: "break-all" }}>{text}</code>;
}

function EndpointHead({ method, path }: { method: string; path: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      <MethodBadge method={method} />
      <code style={{ fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 600, wordBreak: "break-all" }}>{path}</code>
    </div>
  );
}

function A2AStep({ n, agent, action, color }: { n: number; agent: string; action: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#8B96A7", minWidth: 20, paddingTop: 1 }}>{n}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}14`, border: `1px solid ${color}33`, borderRadius: 5, padding: "2px 8px", flexShrink: 0 }}>{agent}</span>
      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.55 }}>{action}</span>
    </div>
  );
}

const SECTIONS = [
  { id: "overview",  label: "Overview" },
  { id: "a2a",       label: "A2A Chain" },
  { id: "auth",      label: "Authentication" },
  { id: "audit",     label: "POST /audit" },
  { id: "compare",   label: "POST /compare" },
  { id: "trust",     label: "GET /trust" },
  { id: "evidence",  label: "GET /evidence" },
  { id: "receipts",  label: "GET /receipts" },
  { id: "schema",    label: "Report Schema" },
  { id: "errors",    label: "Errors" },
  { id: "croo",      label: "CROO Orders" },
];

export default function DocsPage() {
  const [active, setActive] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActive(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif", overflowX: "hidden", width: "100%" }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,9,13,0.85)", backdropFilter: "blur(16px)",
        boxSizing: "border-box", width: "100%",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <VerisMark />
          <span style={{ fontWeight: 700, fontSize: "clamp(16px, 4vw, 18px)", color: "#F5F7FA", letterSpacing: "0.04em" }}>VERIS</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 13, textDecoration: "none", flexShrink: 0 }}>
            <ArrowLeft size={14} /> <span className="veris-back-label">Back to home</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#F5F7FA", alignItems: "center", justifyContent: "center" }}
            className="veris-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, background: "rgba(8,9,13,0.98)", backdropFilter: "blur(20px)", zIndex: 40, padding: "24px 20px", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                textAlign: "left", background: active === s.id ? "rgba(0,212,255,0.06)" : "transparent",
                border: "none", borderLeft: `2px solid ${active === s.id ? "#00D4FF" : "transparent"}`,
                color: active === s.id ? "#00D4FF" : "#8B96A7", fontSize: 15, padding: "12px 16px",
                cursor: "pointer", fontFamily: "inherit", borderRadius: "0 6px 6px 0", width: "100%",
              }}>{s.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* LAYOUT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(20px, 4vw, 40px) clamp(16px, 3vw, 20px) 120px", boxSizing: "border-box", width: "100%" }}>
        <div className="veris-docs-layout">

          {/* SIDEBAR */}
          <aside className="veris-docs-sidebar">
            <div style={{ position: "sticky", top: 90 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 14 }}>Contents</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {SECTIONS.map((s) => (
                  <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                    textAlign: "left", background: active === s.id ? "rgba(0,212,255,0.06)" : "transparent",
                    border: "none", borderLeft: `2px solid ${active === s.id ? "#00D4FF" : "transparent"}`,
                    color: active === s.id ? "#00D4FF" : "#8B96A7", fontSize: 13, padding: "7px 12px",
                    cursor: "pointer", fontFamily: "inherit", borderRadius: "0 6px 6px 0",
                  }}>{s.label}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main style={{ minWidth: 0, width: "100%", boxSizing: "border-box" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Header */}
              <div style={{ marginBottom: 48 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>API & GUIDES</p>
                <h1 style={{ fontSize: "clamp(28px, 8vw, 48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 14px", wordBreak: "break-word" }}>Documentation</h1>
                <Body>VERIS is a three-agent due diligence system. It can be accessed through CROO orders or directly via HTTP. Every audit runs through VERIS → ZERU → SENTINEL and returns a unified trust report.</Body>
              </div>

              {/* Overview */}
              <section id="overview" style={{ marginBottom: 48 }}>
                <SectionTitle>Overview</SectionTitle>
                <Body>VERIS audits Web3 projects and AI agents, combining trust verification, market research, and compliance decisions into a single on-chain deliverable. The same pipeline powers the website and CROO order fulfillment.</Body>
                <TableWrap>
                  <InfoRow i={0} label="Base URL" value="https://veris-agent-production.up.railway.app" />
                  <InfoRow i={1} label="Protocol" value="REST over HTTPS — JSON request & response bodies" />
                  <InfoRow i={2} label="Auth" value="X-Api-Key header required for Trust API endpoints. No auth for /audit and /compare." />
                  <InfoRow i={3} label="Rate limits" value="100 requests/day per API key (Trust API). No limit on /audit." />
                </TableWrap>

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "24px 0 8px" }}>Agent System</p>
                <TableWrap>
                  <AgentRow i={0} agent="VERIS" color="#00D4FF" role="Trust verification — legitimacy scoring, evidence collection, signal analysis across 4 dimensions (Identity, Transparency, Verification, Reputation)" />
                  <AgentRow i={1} agent="ZERU" color="#5EEAD4" role="Research intelligence — market context, TVL analysis, risk factors, competitive positioning, sentiment scoring" />
                  <AgentRow i={2} agent="SENTINEL" color="#FBB92D" role="Compliance decision — deterministic verdict (PROCEED / CAUTION / HIGH RISK / AVOID), compliance score breakdown, recommended actions, review period" />
                </TableWrap>
              </section>

              {/* A2A Chain */}
              <section id="a2a" style={{ marginBottom: 48 }}>
                <SectionTitle>A2A Chain</SectionTitle>
                <Body>Every project audit automatically triggers all three agents. No additional configuration required — the chain fires on every <IC text="/audit" /> call and every CROO order.</Body>
                <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "4px 16px", marginTop: 8 }}>
                  <A2AStep n={1} agent="BUYER" color="#8B96A7" action="Places order on CROO Agent Store (or calls POST /audit directly)" />
                  <A2AStep n={2} agent="VERIS" color="#00D4FF" action="Accepts negotiation, runs trust verification — 9 Tavily queries, Groq extraction at temperature 0.0, signal scoring across 4 dimensions" />
                  <A2AStep n={3} agent="ZERU" color="#5EEAD4" action="Called by VERIS via HTTP — returns market summary, risk factors, sentiment, competitors" />
                  <A2AStep n={4} agent="SENTINEL" color="#FBB92D" action="Called by VERIS with trust score + ZERU signals — returns compliance verdict, score breakdown, recommended actions" />
                  <A2AStep n={5} agent="VERIS" color="#00D4FF" action="Merges all three outputs into one unified report — delivers on-chain via CROO, saves trust receipt to Supabase" />
                </div>
                <Body mb={0} >SENTINEL applies weighted risk penalties per factor type: fraud/conviction (−15), regulatory enforcement (−5), smart contract risk (−3), liquidity concentration (−2). Hard trust events (confirmed fraud, SEC enforcement, criminal conviction) override all scores to AVOID regardless of other signals.</Body>
              </section>

              {/* Auth */}
              <section id="auth" style={{ marginBottom: 48 }}>
                <SectionTitle>Authentication</SectionTitle>
                <Body>Two endpoint groups with different auth requirements:</Body>
                <TableWrap>
                  <FieldRow i={0} name="POST /audit, POST /compare" type="No auth" desc="No API key required. CROO order auth is handled by the SDK." />
                  <FieldRow i={1} name="GET /trust, GET /evidence, GET /compare/projects, GET /a2a/demo" type="X-Api-Key" desc="Pass your key as X-Api-Key header or ?api_key= query param." />
                  <FieldRow i={2} name="GET /receipts, GET /receipts/summary, GET /receipts/:id" type="No auth" desc="Public read access — no key required." />
                </TableWrap>
                <CodeBlock lang="http" code={`GET /trust/Aave?api_key=veris-internal-zeru-key HTTP/1.1
Host: veris-agent-production.up.railway.app`} />
              </section>

              {/* POST /audit */}
              <section id="audit" style={{ marginBottom: 48 }}>
                <EndpointHead method="POST" path="/audit" />
                <Body>Runs the full three-agent pipeline and returns the combined report as a text string. Takes 60–120 seconds for a full audit.</Body>

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Project audit</p>
                <CodeBlock code={`{
  "requirements": {
    "type": "project",
    "name": "Aave",
    "website": "https://aave.com",
    "github": "https://github.com/aave",
    "twitter": "https://x.com/aaveaave",
    "mode": "full"
  }
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Agent audit</p>
                <CodeBlock code={`{
  "requirements": {
    "type": "agent",
    "agentId": "1b301682-55f4-4ca2-8fb6-deff838ab9fe",
    "agentName": "ZERU",
    "endpointUrl": "https://zeru-agent-iz16.onrender.com",
    "category": "research",
    "mode": "full"
  }
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 2px" }}>Response</p>
                <CodeBlock code={`{
  "report": "VERIS TRUST REPORT\\n══...\\n(full text including ZERU enrichment and SENTINEL decision)"
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 4px" }}>Request fields</p>
                <TableWrap>
                  <FieldRow i={0} name="type" type="string  required" desc='"project" or "agent"' />
                  <FieldRow i={1} name="name" type="string  required for projects" desc="Entity name. Used as the primary search term." />
                  <FieldRow i={2} name="website / github / twitter" type="string  optional" desc="Improves entity resolution and signal collection." />
                  <FieldRow i={3} name="agentId" type="string  required for agents" desc="CROO agent UUID." />
                  <FieldRow i={4} name="agentName" type="string  optional" desc="Human-readable name for the report header." />
                  <FieldRow i={5} name="endpointUrl" type="string  optional" desc="Enables Layer 3 live endpoint testing." />
                  <FieldRow i={6} name="category" type="string  optional" desc="research | trading | data | writing | coding | defi | security | general" />
                  <FieldRow i={7} name="mode" type="string  optional" desc='"full" (default) or "quick". Full runs all 9 search queries.' />
                </TableWrap>
              </section>

              {/* POST /compare */}
              <section id="compare" style={{ marginBottom: 48 }}>
                <EndpointHead method="POST" path="/compare" />
                <Body>Runs agent due diligence on 2–5 agents in parallel and returns a ranked comparison report.</Body>
                <CodeBlock code={`{
  "agents": [
    { "agentId": "1b301682-...", "agentName": "ZERU", "category": "research" },
    { "agentId": "8ae3bf6d-...", "agentName": "VERIS", "category": "research" }
  ]
}`} />

                <div style={{ marginTop: 24 }}>
                  <EndpointHead method="GET" path="/compare/projects?a=Aave&b=Compound&c=MakerDAO" />
                  <Body mb={0}>Runs project audits in parallel (using cache where available) and returns structured JSON ranking with verdict. Requires <IC text="X-Api-Key" />.</Body>
                  <CodeBlock code={`{
  "compared": ["Aave", "Compound", "MakerDAO"],
  "results": [
    { "entity": "Aave", "trustScore": 77, "riskLevel": "Low", "recommendation": "GENERALLY LEGITIMATE" },
    { "entity": "MakerDAO", "trustScore": 74, "riskLevel": "Low", "recommendation": "GENERALLY LEGITIMATE" },
    { "entity": "Compound", "trustScore": 70, "riskLevel": "Low", "recommendation": "GENERALLY LEGITIMATE" }
  ],
  "best": "Aave",
  "verdict": "Aave has the strongest verifiable trust signals (77/100).",
  "timestamp": "2026-06-24T..."
}`} />
                </div>
              </section>

              {/* GET /trust */}
              <section id="trust" style={{ marginBottom: 48 }}>
                <EndpointHead method="GET" path="/trust/:entityName" />
                <Body>Returns a structured JSON trust score without the full report text. Cached for 24 hours. Use <IC text="?refresh=true" /> to force a fresh audit. Use <IC text="?type=agent" /> for agent audits. Requires <IC text="X-Api-Key" />.</Body>
                <CodeBlock code={`GET /trust/Aave?api_key=your-key

{
  "entity": "Aave",
  "entityType": "project",
  "trustScore": 77,
  "confidence": 69,
  "riskLevel": "Low",
  "recommendation": "GENERALLY LEGITIMATE",
  "signalsVerified": 20,
  "signalsTotal": 27,
  "incidents": [],
  "lastAudited": "2026-06-24T...",
  "cached": true
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 4px" }}>Agent variant</p>
                <CodeBlock code={`GET /trust/ZERU?type=agent&agentId=1b301682-...&endpointUrl=https://zeru-agent-iz16.onrender.com&api_key=your-key

{
  "entity": "ZERU",
  "entityType": "agent",
  "trustScore": 33,
  "trustBand": "Emerging",
  "riskLevel": "Emerging",
  "recommendation": "PROCEED WITH CAUTION",
  "layerScores": { "metadata": 0, "web": 54, "live": 31 },
  "agentTrustModel": { "bands": "0-15 Critical | 16-35 Unverified | 36-55 Emerging | 56-75 Established | 76-100 Trusted" }
}`} />

                <div style={{ marginTop: 24 }}>
                  <EndpointHead method="GET" path="/a2a/demo/:entityName" />
                  <Body mb={0}>Returns combined VERIS trust score and ZERU research in one JSON response — the A2A composability proof endpoint. Requires <IC text="X-Api-Key" />.</Body>
                </div>
              </section>

              {/* GET /evidence */}
              <section id="evidence" style={{ marginBottom: 48 }}>
                <EndpointHead method="GET" path="/evidence/:entityName" />
                <Body>Returns raw structured evidence rather than a final score — useful for building custom scoring models on top of VERIS data. Requires <IC text="X-Api-Key" />.</Body>
                <CodeBlock code={`{
  "entity": "Aave",
  "evidence": {
    "github": ["https://github.com/aave/aave-v3-core"],
    "whitepaper": ["https://...aave_whitepaper.pdf"],
    "audit": ["https://github.com/aave/aave-v3-core/tree/master/audits"],
    "founded": 2017,
    "openSource": true,
    "liveProduct": true,
    "incidents": []
  },
  "signalCoverage": { "verified": 20, "total": 27, "pct": 74 },
  "cached": false,
  "timestamp": "2026-06-24T..."
}`} />
              </section>

              {/* GET /receipts */}
              <section id="receipts" style={{ marginBottom: 48 }}>
                <EndpointHead method="GET" path="/receipts/:entityId" />
                <Body>Returns full audit history for one entity, including the complete report text for each audit. No auth required.</Body>
                <CodeBlock code={`{
  "entityId": "aave",
  "receipts": [
    {
      "id": "uuid",
      "entity_type": "project",
      "entity_name": "Aave",
      "score": 77,
      "risk_level": "GENERALLY LEGITIMATE",
      "signals_verified": 20,
      "signals_total": 27,
      "report": "VERIS TRUST REPORT\\n══...(full text)",
      "created_at": "2026-06-24T..."
    }
  ],
  "count": 4
}`} />

                <div style={{ marginTop: 24 }}>
                  <EndpointHead method="GET" path="/receipts/summary" />
                  <Body mb={0}>Returns one row per entity (deduplicated, latest score) sorted by trust score descending. Clean names only — garbled CROO payload names are filtered out automatically.</Body>
                </div>

                <div style={{ marginTop: 24 }}>
                  <EndpointHead method="GET" path="/receipts" />
                  <Body mb={0}>Returns the 50 most recent receipt rows across all entities — a global audit feed.</Body>
                </div>
              </section>

              {/* Schema */}
              <section id="schema" style={{ marginBottom: 48 }}>
                <SectionTitle>Report Schema</SectionTitle>
                <Body>Reports are plain text inside a JSON envelope. Parse these patterns to extract structured data client-side:</Body>
                <TableWrap>
                  <SchemaRow i={0} pattern="LEGITIMACY: 77/100" desc="Project legitimacy score (0–100 or N/A)" />
                  <SchemaRow i={1} pattern="MATURITY: 80/100" desc="Project maturity score (0–100)" />
                  <SchemaRow i={2} pattern="CONFIDENCE: ▓▓▓░ 69%" desc="Evidence confidence percentage" />
                  <SchemaRow i={3} pattern="RECOMMENDATION: ~✓ GENERALLY LEGITIMATE [Band: 65-79]" desc="Final VERIS verdict label and band" />
                  <SchemaRow i={4} pattern="OVERALL SCORE: 33/100" desc="Agent overall score" />
                  <SchemaRow i={5} pattern="A2A RESEARCH ENRICHMENT" desc="Start of ZERU research block" />
                  <SchemaRow i={6} pattern="SENTINEL DECISION" desc="Start of SENTINEL compliance block" />
                  <SchemaRow i={7} pattern="VERDICT:  ✅  PROCEED" desc="SENTINEL final verdict" />
                  <SchemaRow i={8} pattern="Compliance Score:  73/100" desc="SENTINEL compliance score (adjusted from trust score)" />
                  <SchemaRow i={9} pattern="⛔ HARD TRUST EVENT" desc="Hard override triggered — scores zeroed" />
                  <SchemaRow i={10} pattern="  +12  Security audit found  [T1] conf:100%" desc="Confirmed signal with tier and confidence" />
                  <SchemaRow i={11} pattern="  └─ https://..." desc="Source URL for the signal above it" />
                  <SchemaRow i={12} pattern="  ? Founders publicly named" desc="Signal not located (no score impact)" />
                </TableWrap>
              </section>

              {/* Errors */}
              <section id="errors" style={{ marginBottom: 48 }}>
                <SectionTitle>Errors</SectionTitle>
                <TableWrap>
                  <ErrorRow i={0} code="400" desc="Missing required field — e.g. no name for project audit, fewer than 2 agents for /compare" />
                  <ErrorRow i={1} code="401" desc="API key required — pass X-Api-Key header or ?api_key= param" />
                  <ErrorRow i={2} code="403" desc="Invalid API key" />
                  <ErrorRow i={3} code="429" desc="Daily request limit reached for this API key" />
                  <ErrorRow i={4} code="500" desc="Upstream failure — Tavily quota, Groq timeout, or CROO connection issue" />
                  <ErrorRow i={5} code="502" desc="Gateway timeout — full audit (VERIS + ZERU + SENTINEL) exceeded Railway's request timeout" />
                </TableWrap>
                <CodeBlock code={`{ "error": "API key required. Pass X-Api-Key header or ?api_key= query param." }`} />
              </section>

              {/* CROO Orders */}
              <section id="croo" style={{ marginBottom: 0 }}>
                <SectionTitle>Ordering Through CROO</SectionTitle>
                <Body>VERIS is listed on the CROO Agent Store. Submit requirements as JSON — same shape as the <IC text="requirements" /> field in <IC text="POST /audit" />. CROO handles payment, escrow, and on-chain settlement automatically.</Body>
                <CodeBlock code={`// CROO order requirement format
{
  "type": "project",
  "name": "Uniswap",
  "website": "https://uniswap.org",
  "github": "https://github.com/Uniswap"
}`} />

                <p style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA", margin: "20px 0 8px" }}>SDK methods used by VERIS</p>
                <TableWrap>
                  <FieldRow i={0} name="acceptNegotiation()" type="method" desc="Locks the order on-chain when a buyer initiates" />
                  <FieldRow i={1} name="getOrder()" type="method" desc="Reads the requirement payload from the order" />
                  <FieldRow i={2} name="deliverOrder()" type="method" desc="Submits the completed report on-chain" />
                  <FieldRow i={3} name="EventType.NegotiationCreated" type="event" desc="Fires when a buyer initiates a negotiation" />
                  <FieldRow i={4} name="EventType.OrderPaid" type="event" desc="Fires when escrow is funded — triggers the audit pipeline" />
                  <FieldRow i={5} name="EventType.OrderCompleted" type="event" desc="Fires when on-chain settlement confirms" />
                  <FieldRow i={6} name="DeliverableType.Text" type="constant" desc="Report delivered as plain text on Base Mainnet" />
                </TableWrap>

                <p style={{ color: "#8B96A7", fontSize: 13, lineHeight: 1.65, margin: "16px 0 0", wordBreak: "break-word" }}>
                  All reports are delivered on-chain via CROO on Base Mainnet. Verifiable at{" "}
                  <a href="https://basescan.org" target="_blank" rel="noopener noreferrer" style={{ color: "#00D4FF", textDecoration: "none" }}>basescan.org</a>.
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
