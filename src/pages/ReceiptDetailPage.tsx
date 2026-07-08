import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { ScoreTimeline } from "@/components/ScoreTimeline";
import "@/veris.css";

const BACKEND_URL = "https://veris-agent.onrender.com";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PARSER
// ─────────────────────────────────────────────────────────────────────

function parseReport(report: string) {
  const num = (m: RegExpMatchArray | null) => (m ? parseInt(m[1]) : null);

  const legitimacy = num(report.match(/LEGITIMACY:\s+(\d+)\/100/));
  const maturity = num(report.match(/MATURITY:\s+(\d+)\/100/));
  const confidence = num(report.match(/CONFIDENCE:.*?(\d+)%/));
  const opRisk = report.match(/OP\.\s*RISK:\s+(\w+)/)?.[1] ?? null;

  const legitimacyBreakdown = {
    identity: num(report.match(/Identity:\s+(\d+)\/100/)),
    transparency: num(report.match(/Transparency:\s+(\d+)\/100/)),
    verification: num(report.match(/Verification:\s+(\d+)\/100/)),
    reputation: num(report.match(/Reputation:\s+(\d+)\/100/)),
  };

  const maturityBreakdown = {
    longevity: num(report.match(/Longevity:\s+(\d+)\/100/)),
    adoption: num(report.match(/Adoption:\s+(\d+)\/100/)),
    ecosystem: num(report.match(/Ecosystem:\s+(\d+)\/100/)),
    development: num(report.match(/Development:\s+(\d+)\/100/)),
    security: num(report.match(/Security:\s+(\d+)\/100/)),
    market: num(report.match(/Market:\s+(\d+)\/100/)),
  };

  const recommendation = report.match(/RECOMMENDATION:\s+[^\s]+\s+([A-Z ]+)\s+\[Band/)?.[1]?.trim() ?? null;
  const verdict = report.match(/VERDICT\n([\s\S]+?)\n══/)?.[1]?.trim() ?? null;

  const signals = [...report.matchAll(/\+\s*(\d+)\s+(.+?)\s+\[T(\d)\]/g)].map((m) => ({
    points: parseInt(m[1]),
    label: m[2].trim(),
    tier: parseInt(m[3]),
  }));

  const urls = [...new Set([...report.matchAll(/└─\s*(https?:\/\/\S+)/g)].map((m) => m[1]))];

  const missing = [...report.matchAll(/^\s*\?\s+(.+)$/gm)].map((m) => m[1].trim());

  const hasHardEvent = report.includes("HARD TRUST EVENT");
  const incidentBlockMatch = report.match(/MAJOR HISTORICAL INCIDENTS[^\n]*\n[-─]+\n([\s\S]*?)\n[-─]+/);
  const incidents = incidentBlockMatch
    ? incidentBlockMatch[1].split("\n").filter((l) => l.trim().match(/^[🔴🟠🟡🟢⚠]/)).map((l) => l.trim())
    : [];

  const entityClass = report.match(/Entity Class:\s+(.+)/)?.[1]?.trim() ?? null;
  const founded = report.match(/Founded:\s+(.+)/)?.[1]?.trim() ?? null;
  const website = report.match(/Website:\s+(\S+)/)?.[1] ?? null;
  const audited = report.match(/Audited:\s+(.+)/)?.[1]?.trim() ?? null;

  // ── ZERU A2A enrichment block ──
  const hasZeru = report.includes("A2A RESEARCH ENRICHMENT");
  const zeruSummary = report.match(/SUMMARY\n([\s\S]+?)\n\n/)?.[1]?.trim() ?? null;
  const zeruFindings = [...report.matchAll(/^\s*•\s+(.+)$/gm)].map((m) => m[1].trim());
  const zeruSentiment = report.match(/SENTIMENT:\s*(\w+)/)?.[1] ?? null;
  const zeruMarketContext = report.match(/MARKET CONTEXT\n([\s\S]+?)\n\nSENTIMENT/)?.[1]
    ?.split("\n").filter((l) => l.trim().startsWith("•")).map((l) => l.replace(/^\s*•\s*/, "").trim()) ?? [];

  return {
    legitimacy, maturity, confidence, opRisk,
    legitimacyBreakdown, maturityBreakdown,
    recommendation, verdict, signals, urls, missing,
    hasHardEvent, incidents,
    entityClass, founded, website, audited,
    hasZeru, zeruSummary, zeruFindings, zeruSentiment, zeruMarketContext,
  };
}

// ─────────────────────────────────────────────────────────────────────
// UI PIECES
// ─────────────────────────────────────────────────────────────────────

function scoreColor(score: number | null) {
  if (score === null) return "#8B96A7";
  if (score >= 70) return "#10B981";
  if (score >= 45) return "#FBB92D";
  return "#EF4444";
}

function ScoreCard({ label, value, color }: { label: string; value: number | null; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "18px 20px", textAlign: "center", flex: "1 1 130px", minWidth: 110,
    }}>
      <p style={{ fontSize: 10, color: "#8B96A7", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>
        {label}
      </p>
      <p style={{ fontSize: 30, fontWeight: 700, color, margin: 0 }}>
        {value !== null ? value : "—"}
        {value !== null && <span style={{ fontSize: 15, color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>/100</span>}
      </p>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number | null }) {
  const v = value ?? 0;
  const color = scoreColor(v);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#F5F7FA" }}>{label}</span>
        <span style={{ fontSize: 12, color, fontVariantNumeric: "tabular-nums" }}>
          {value !== null ? `${value}/100` : "N/A"}
        </span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 3 }}
        />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "24px 22px", marginBottom: 16,
    }}>
      <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 16px" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

const tierColor = (tier: number) => (tier === 1 ? "#5EEAD4" : tier === 2 ? "#00D4FF" : tier === 3 ? "#FBB92D" : "#8B96A7");

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

type Receipt = {
  id: string;
  entity_type: "project" | "agent";
  entity_name: string;
  score: number | null;
  risk_level: string;
  signals_verified?: number;
  signals_total?: number;
  created_at: string;
  report?: string;
};

type HistoryPoint = {
  id: string;
  score: number | null;
  risk_level: string;
  created_at: string;
};

// ─────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────

export default function ReceiptDetailPage() {
  const params = useParams<{ entityId: string }>();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [currentId, setCurrentId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.entityId) return;
    loadReceipt(params.entityId);
  }, [params.entityId]);

  async function loadReceipt(entityId: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/receipts/${encodeURIComponent(entityId)}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const all: Receipt[] = data.receipts || [];
      if (all.length === 0) throw new Error("No receipt found for this entity");

      // Sort newest first
      const sorted = [...all].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setHistory(sorted.map((r) => ({
        id: r.id,
        score: r.score,
        risk_level: r.risk_level,
        created_at: r.created_at,
      })));
      setReceipt(sorted[0]);          // latest as default view
      setCurrentId(sorted[0].id);     // track selected
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load receipt");
    } finally {
      setLoading(false);
    }
  }

  const handleHistorySelect = (id: string) => {
    const selected = history.find((h) => h.id === id);
    if (!selected) return;
    // We need to re-fetch or look up the full receipt with report
    // Since we already have all receipts from the API response, we need to store them
    // For now, if the selected receipt has a report, parse it; otherwise keep current
    const fullReceipt = (history as any[]).find((r: any) => r.id === id);
    if (fullReceipt?.report) {
      setReceipt(fullReceipt as Receipt);
    } else {
      // Re-fetch single receipt to get the report
      fetch(`${BACKEND_URL}/receipts/${encodeURIComponent(params.entityId!)}`)
        .then((res) => res.json())
        .then((data) => {
          const found = (data.receipts || []).find((r: Receipt) => r.id === id);
          if (found) setReceipt(found);
        })
        .catch(() => {}); // silent — just keep current receipt
    }
    setCurrentId(id);
  };

  const d = receipt?.report ? parseReport(receipt.report) : null;

  const recColor = d
    ? d.hasHardEvent ? "#EF4444"
    : d.recommendation?.includes("TRUSTED") || d.recommendation?.includes("STRONGLY") ? "#10B981"
    : d.recommendation?.includes("LEGITIMATE") ? "#5EEAD4"
    : d.recommendation?.includes("MIXED") ? "#FBB92D"
    : d.recommendation?.includes("HIGH RISK") || d.recommendation?.includes("CRITICAL") ? "#EF4444"
    : "#8B96A7"
    : "#8B96A7";

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
        <Link href="/receipts" style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 13, textDecoration: "none", flexShrink: 0 }}>
          <ArrowLeft size={14} /> All receipts
        </Link>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px, 8vh, 72px) 20px 100px", boxSizing: "border-box", width: "100%" }}>

        {loading && (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              style={{
                width: 32, height: 32, borderRadius: "50%", margin: "0 auto 16px",
                border: "2px solid rgba(0,212,255,0.15)", borderTopColor: "#00D4FF",
              }}
            />
            <p style={{ color: "#8B96A7", fontSize: 14, margin: 0 }}>Loading audit…</p>
          </div>
        )}

        {error && !loading && (
          <div style={{
            background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 12, padding: "24px", textAlign: "center",
          }}>
            <p style={{ color: "#FF6B6B", fontSize: 14, margin: "0 0 16px" }}>{error}</p>
            <Link href="/receipts">
              <button style={{
                background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Back to receipts
              </button>
            </Link>
          </div>
        )}

        {!loading && !error && receipt && d && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 10 }}>
                TRUST RECEIPT
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 6vw, 2.6rem)", fontWeight: 300, margin: "0 0 10px", wordBreak: "break-word" }}>
                {receipt.entity_name}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", fontSize: 12.5, color: "#8B96A7" }}>
                {d.entityClass && <span>{d.entityClass}</span>}
                {d.founded && d.founded !== "Unknown" && <><span style={{ opacity: 0.4 }}>·</span><span>Founded {d.founded}</span></>}
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} /> {new Date(receipt.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Score Timeline */}
            {history.length > 1 && (
              <ScoreTimeline
                history={history}
                currentId={currentId}
                onSelect={handleHistorySelect}
              />
            )}

            {/* Hard event banner */}
            {d.hasHardEvent && (
              <div style={{
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 12, padding: "14px 18px", marginBottom: 20,
              }}>
                <p style={{ fontSize: 13.5, color: "#FF6B6B", fontWeight: 600, margin: 0 }}>
                  ⛔ Hard trust event confirmed — scores overridden to reflect critical risk
                </p>
              </div>
            )}

            {/* Trust Score + Verdict */}
            <div style={{
              display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 28,
              background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "28px 24px",
            }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 6px" }}>
                  Trust Score
                </p>
                <p style={{ fontSize: 52, fontWeight: 700, color: scoreColor(d.legitimacy), margin: 0, lineHeight: 1 }}>
                  {d.legitimacy ?? "—"}<span style={{ fontSize: 22, color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>/100</span>
                </p>
              </div>
              {d.recommendation && (
                <div style={{
                  background: `${recColor}14`, border: `1px solid ${recColor}33`,
                  borderRadius: 20, padding: "9px 18px",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: recColor, textTransform: "uppercase",
                }}>
                  {d.recommendation}
                </div>
              )}
            </div>

            {/* Score Breakdown */}
            <Section title="Score Breakdown">
              <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                <ScoreCard label="Legitimacy" value={d.legitimacy} color="#00D4FF" />
                <ScoreCard label="Maturity" value={d.maturity} color="#5EEAD4" />
                <ScoreCard label="Confidence" value={d.confidence} color="#A8EDEA" />
              </div>
              <Bar label="Identity" value={d.legitimacyBreakdown.identity} />
              <Bar label="Transparency" value={d.legitimacyBreakdown.transparency} />
              <Bar label="Verification" value={d.legitimacyBreakdown.verification} />
              <Bar label="Reputation" value={d.legitimacyBreakdown.reputation} />
            </Section>

            {/* Evidence Found */}
            {d.signals.length > 0 && (
              <Section title={`Evidence Found (${d.signals.length})`}>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {d.signals.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
                      <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                      <span style={{ color: "#F5F7FA", flex: 1 }}>{s.label}</span>
                      <span style={{
                        fontSize: 10, color: tierColor(s.tier), background: `${tierColor(s.tier)}14`,
                        border: `1px solid ${tierColor(s.tier)}33`, borderRadius: 4, padding: "1px 6px", flexShrink: 0,
                      }}>
                        T{s.tier}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Risk Factors */}
            {(d.incidents.length > 0 || (d.hasZeru && d.zeruFindings.length > 0)) && (
              <Section title="Risk Factors">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {d.incidents.map((inc, i) => (
                    <div key={`inc-${i}`} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#FF6B6B", flexShrink: 0 }}>⚠</span>
                      <span style={{ fontSize: 13, color: "#F5F7FA", lineHeight: 1.5 }}>{inc.replace(/^[🔴🟠🟡🟢⚠]\s*/, "")}</span>
                    </div>
                  ))}
                  {d.hasZeru && d.zeruFindings.slice(0, 5).map((f, i) => (
                    <div key={`zr-${i}`} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#FBB92D", flexShrink: 0 }}>⚠</span>
                      <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Sources Used */}
            {d.urls.length > 0 && (
              <Section title={`Sources Used (${d.urls.length})`}>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {d.urls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{
                      display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#5EEAD4",
                      textDecoration: "none", wordBreak: "break-all",
                    }}>
                      <ExternalLink size={10} style={{ flexShrink: 0 }} />
                      <span>{url}</span>
                    </a>
                  ))}
                </div>
              </Section>
            )}

            {/* ZERU Research */}
            {d.hasZeru && (
              <Section title="ZERU Research — A2A Enrichment">
                {d.zeruSummary && (
                  <p style={{ fontSize: 13.5, color: "#F5F7FA", lineHeight: 1.7, margin: "0 0 16px" }}>
                    {d.zeruSummary}
                  </p>
                )}
                {d.zeruMarketContext.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: "#8B96A7", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
                      Market Context
                    </p>
                    {d.zeruMarketContext.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: "#00D4FF", flexShrink: 0 }}>•</span>
                        <span style={{ fontSize: 13, color: "#8B96A7", lineHeight: 1.55 }}>{m}</span>
                      </div>
                    ))}
                  </div>
                )}
                {d.zeruSentiment && (
                  <div style={{
                    display: "inline-flex", alignItems: "center",
                    background: "rgba(94,234,212,0.08)", border: "1px solid rgba(94,234,212,0.2)",
                    borderRadius: 20, padding: "6px 14px",
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#5EEAD4", textTransform: "uppercase",
                  }}>
                    Sentiment: {d.zeruSentiment}
                  </div>
                )}
                <p style={{ fontSize: 11, color: "rgba(139,150,167,0.5)", margin: "16px 0 0", fontStyle: "italic" }}>
                  This audit was enriched by ZERU, a second autonomous agent on the CROO network —
                  demonstrating agent-to-agent composability.
                </p>
              </Section>
            )}

            {/* Final Reasoning */}
            {d.verdict && (
              <Section title="Final Reasoning">
                <p style={{ fontSize: 13.5, color: "#8B96A7", lineHeight: 1.75, margin: 0 }}>
                  {d.verdict}
                </p>
              </Section>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              <Link href="/audit">
                <button style={{
                  background: "#00D4FF", color: "#08090D", border: "none",
                  borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  Re-audit this entity →
                </button>
              </Link>
              {d.website && d.website !== "Not" && (
                <a href={d.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8, padding: "12px 20px", fontSize: 14, color: "#8B96A7",
                    cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    Visit website <ExternalLink size={12} />
                  </button>
                </a>
              )}
            </div>

          </motion.div>
        )}
      </main>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px",
      }} />
    </div>
  );
}
