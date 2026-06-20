import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// PARSER — extracts every section from a VERIS report string
// ─────────────────────────────────────────────────────────────────────

function parseFullReport(report: string) {
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

  const urls = [...report.matchAll(/└─\s*(https?:\/\/\S+)/g)].map((m) => m[1]);

  const missing = [...report.matchAll(/^\s*\?\s+(.+)$/gm)].map((m) => m[1].trim());

  const gtApplied = report.includes("GROUND TRUTH APPLIED");
  const gtNote = report.match(/GROUND TRUTH APPLIED:\s*(.+)/)?.[1]?.trim() ?? null;

  const t1Sources = num(report.match(/Official\s*\(T1\):\s*(\d+)/));
  const t2Sources = num(report.match(/Major media[^:]*\(T2\):\s*(\d+)/));
  const t3Sources = num(report.match(/Community\s*\(T3\):\s*(\d+)/));
  const t4Sources = num(report.match(/Inferred\s*\(T4\):\s*(\d+)/));
  const totalSources = num(report.match(/Total:\s*(\d+)\s+sources/));

  const hasHardEvent = report.includes("HARD TRUST EVENT");
  const incidentBlockMatch = report.match(/MAJOR HISTORICAL INCIDENTS[^\n]*\n[-─]+\n([\s\S]*?)\n[-─]+/);
  const incidents = incidentBlockMatch
    ? incidentBlockMatch[1].split("\n").filter((l) => l.trim().match(/^[🔴🟠🟡🟢⚠]/)).map((l) => l.trim())
    : [];

  const entityClass = report.match(/Entity Class:\s+(.+)/)?.[1]?.trim() ?? null;
  const founded = report.match(/Founded:\s+(\d{4})/)?.[1] ?? null;
  const audited = report.match(/Audited:\s+(.+)/)?.[1]?.trim() ?? null;
  const website = report.match(/Website:\s+(\S+)/)?.[1] ?? null;

  return {
    legitimacy, maturity, confidence, opRisk,
    legitimacyBreakdown, maturityBreakdown,
    recommendation, verdict, signals, urls, missing,
    gtApplied, gtNote,
    t1Sources, t2Sources, t3Sources, t4Sources, totalSources,
    hasHardEvent, incidents,
    entityClass, founded, audited, website,
  };
}

// ─────────────────────────────────────────────────────────────────────
// UI PIECES
// ─────────────────────────────────────────────────────────────────────

function ScoreRing({ label, value, color }: { label: string; value: number | null; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "16px 18px", textAlign: "center", flex: "1 1 100px", minWidth: 100,
    }}>
      <p style={{ fontSize: 10, color: "#8B96A7", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
        {label}
      </p>
      <p style={{ fontSize: 26, fontWeight: 700, color, margin: 0 }}>
        {value !== null ? value : "—"}
      </p>
    </div>
  );
}

function MiniBar({ label, value }: { label: string; value: number | null }) {
  const v = value ?? 0;
  const color = v >= 70 ? "#10B981" : v >= 45 ? "#FBB92D" : "#EF4444";
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, color: "#F5F7FA" }}>{label}</span>
        <span style={{ fontSize: 12, color, fontVariantNumeric: "tabular-nums" }}>
          {value !== null ? `${value}/100` : "N/A"}
        </span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 2 }}
        />
      </div>
    </div>
  );
}

const tierColor = (tier: number) => (tier === 1 ? "#5EEAD4" : tier === 2 ? "#00D4FF" : tier === 3 ? "#FBB92D" : "#8B96A7");

// ─────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────

type ReceiptLite = {
  entity_name: string;
  entity_type: "project" | "agent";
  created_at: string;
};

export function TrustDetailView({ receipt, report }: { receipt: ReceiptLite; report: string }) {
  const [showAllSignals, setShowAllSignals] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  const d = parseFullReport(report);

  const recColor =
    d.hasHardEvent ? "#EF4444" :
    d.recommendation?.includes("TRUSTED") || d.recommendation?.includes("STRONGLY") ? "#10B981" :
    d.recommendation?.includes("LEGITIMATE") ? "#5EEAD4" :
    d.recommendation?.includes("MIXED") ? "#FBB92D" :
    d.recommendation?.includes("HIGH RISK") || d.recommendation?.includes("CRITICAL") ? "#EF4444" :
    "#8B96A7";

  const visibleSignals = showAllSignals ? d.signals : d.signals.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      style={{
        background: "rgba(17,20,26,0.9)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: "24px 22px", marginBottom: 20,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 4px" }}>
          Trust Receipt
        </p>
        <h3 style={{ fontSize: 21, fontWeight: 600, margin: "0 0 6px" }}>{receipt.entity_name}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontSize: 12, color: "#8B96A7" }}>
          {d.entityClass && <span>{d.entityClass}</span>}
          {d.founded && <><span style={{ opacity: 0.4 }}>·</span><span>Founded {d.founded}</span></>}
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} /> {new Date(receipt.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hard event banner */}
      {d.hasHardEvent && (
        <div style={{
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 10, padding: "12px 16px", marginBottom: 20,
        }}>
          <p style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600, margin: 0 }}>
            ⛔ Hard trust event confirmed — all scores overridden to reflect critical risk
          </p>
        </div>
      )}

      {/* Score row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <ScoreRing label="Legitimacy" value={d.legitimacy} color="#00D4FF" />
        <ScoreRing label="Maturity" value={d.maturity} color="#5EEAD4" />
        <ScoreRing label="Confidence" value={d.confidence} color="#A8EDEA" />
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: "16px 18px", textAlign: "center", flex: "1 1 100px", minWidth: 100,
        }}>
          <p style={{ fontSize: 10, color: "#8B96A7", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
            Op. Risk
          </p>
          <p style={{
            fontSize: 16, fontWeight: 700, margin: 0,
            color: d.opRisk === "Low" ? "#10B981" : d.opRisk === "Medium" ? "#FBB92D" : d.opRisk === "High" ? "#EF4444" : "#8B96A7",
          }}>
            {d.opRisk ?? "—"}
          </p>
        </div>
      </div>

      {/* Recommendation */}
      {d.recommendation && (
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: `${recColor}14`, border: `1px solid ${recColor}33`,
          borderRadius: 20, padding: "7px 16px", marginBottom: 16,
          fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: recColor, textTransform: "uppercase",
        }}>
          {d.recommendation}
        </div>
      )}

      {d.verdict && (
        <p style={{ fontSize: 13.5, color: "#8B96A7", lineHeight: 1.65, margin: "0 0 24px" }}>
          {d.verdict}
        </p>
      )}

      {/* Ground truth note */}
      {d.gtApplied && (
        <div style={{
          background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: 10, padding: "12px 16px", marginBottom: 24,
        }}>
          <p style={{ fontSize: 12.5, color: "#00D4FF", margin: 0, lineHeight: 1.6 }}>
            📚 {d.gtNote || "Ground truth reference data applied to correct this score."}
          </p>
        </div>
      )}

      {/* Incidents */}
      {d.incidents.length > 0 && (
        <div style={{
          background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: 12, padding: "16px 18px", marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#FF6B6B", textTransform: "uppercase", margin: "0 0 10px" }}>
            Major Historical Incidents
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {d.incidents.map((inc, i) => (
              <p key={i} style={{ fontSize: 12.5, color: "#F5F7FA", margin: 0, lineHeight: 1.55 }}>{inc}</p>
            ))}
          </div>
        </div>
      )}

      {/* Legitimacy breakdown */}
      {Object.values(d.legitimacyBreakdown).some((v) => v !== null) && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 14px" }}>
            Legitimacy Breakdown
          </p>
          <MiniBar label="Identity" value={d.legitimacyBreakdown.identity} />
          <MiniBar label="Transparency" value={d.legitimacyBreakdown.transparency} />
          <MiniBar label="Verification" value={d.legitimacyBreakdown.verification} />
          <MiniBar label="Reputation" value={d.legitimacyBreakdown.reputation} />
        </div>
      )}

      {/* Maturity breakdown */}
      {Object.values(d.maturityBreakdown).some((v) => v !== null) && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 14px" }}>
            Maturity Breakdown
          </p>
          <MiniBar label="Longevity" value={d.maturityBreakdown.longevity} />
          <MiniBar label="Adoption" value={d.maturityBreakdown.adoption} />
          <MiniBar label="Ecosystem" value={d.maturityBreakdown.ecosystem} />
          <MiniBar label="Development" value={d.maturityBreakdown.development} />
          <MiniBar label="Security" value={d.maturityBreakdown.security} />
          <MiniBar label="Market" value={d.maturityBreakdown.market} />
        </div>
      )}

      {/* Confirmed signals */}
      {d.signals.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 14px" }}>
            Evidence Found ({d.signals.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {visibleSignals.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                <span style={{ color: "#F5F7FA", flex: 1 }}>{s.label}</span>
                <span style={{
                  fontSize: 10, color: tierColor(s.tier), background: `${tierColor(s.tier)}14`,
                  border: `1px solid ${tierColor(s.tier)}33`, borderRadius: 4, padding: "1px 6px", flexShrink: 0,
                }}>
                  T{s.tier}
                </span>
                <span style={{ fontSize: 11, color: "#8B96A7", flexShrink: 0, minWidth: 24, textAlign: "right" }}>
                  +{s.points}
                </span>
              </div>
            ))}
          </div>
          {d.signals.length > 6 && (
            <button
              onClick={() => setShowAllSignals(!showAllSignals)}
              style={{
                display: "flex", alignItems: "center", gap: 4, background: "transparent",
                border: "none", color: "#00D4FF", fontSize: 12, cursor: "pointer",
                fontFamily: "inherit", marginTop: 10, padding: 0,
              }}
            >
              {showAllSignals ? "Show less" : `Show ${d.signals.length - 6} more`}
              {showAllSignals ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
      )}

      {/* Source URLs */}
      {d.urls.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 10px" }}>
            Sources Cited ({d.urls.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {d.urls.slice(0, 8).map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5EEAD4",
                textDecoration: "none", wordBreak: "break-all",
              }}>
                <ExternalLink size={10} style={{ flexShrink: 0 }} />
                <span>{url.length > 60 ? url.slice(0, 60) + "…" : url}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Missing signals */}
      {d.missing.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => setShowMissing(!showMissing)}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "transparent",
              border: "none", cursor: "pointer", padding: 0, marginBottom: showMissing ? 12 : 0,
            }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: 0 }}>
              Evidence Not Found ({d.missing.length})
            </p>
            {showMissing ? <ChevronUp size={12} color="#8B96A7" /> : <ChevronDown size={12} color="#8B96A7" />}
          </button>
          {showMissing && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {d.missing.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, opacity: 0.6 }}>
                  <span style={{ color: "#8B96A7" }}>○</span>
                  <span style={{ color: "#8B96A7" }}>{m}</span>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: 11, color: "rgba(139,150,167,0.5)", margin: "8px 0 0", fontStyle: "italic" }}>
            Missing evidence is not penalized — it simply wasn't found, not confirmed absent.
          </p>
        </div>
      )}

      {/* Source breakdown */}
      {d.totalSources !== null && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 10px" }}>
            Source Authority ({d.totalSources} total)
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "Official (T1)", value: d.t1Sources, color: "#5EEAD4" },
              { label: "Media/Audit (T2)", value: d.t2Sources, color: "#00D4FF" },
              { label: "Community (T3)", value: d.t3Sources, color: "#FBB92D" },
              { label: "Inferred (T4)", value: d.t4Sources, color: "#8B96A7" },
            ].map((s) => (
              <div key={s.label} style={{
                background: `${s.color}0A`, border: `1px solid ${s.color}22`,
                borderRadius: 8, padding: "8px 12px", flex: "1 1 100px",
              }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: s.color, margin: "0 0 2px" }}>{s.value ?? 0}</p>
                <p style={{ fontSize: 10, color: "#8B96A7", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer action */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/audit">
          <button style={{
            background: "#00D4FF", color: "#08090D", border: "none",
            borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Re-audit this entity →
          </button>
        </Link>
        {d.website && (
          <a href={d.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 7, padding: "9px 16px", fontSize: 13, color: "#8B96A7",
              cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
            }}>
              Visit website <ExternalLink size={11} />
            </button>
          </a>
        )}
      </div>
    </motion.div>
  );
}
