import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Search, Clock, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";
import { TrustDetailView } from "@/components/TrustDetailView";
import "@/veris.css";

const BACKEND_URL = "https://veris-agent-production.up.railway.app";

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Receipt = {
  id: string;
  entity_type: "project" | "agent";
  entity_name: string;
  score: number | null;
  risk_level: string;
  signals_verified: number;
  signals_total: number;
  created_at: string;
  report?: string;
};

function scoreColor(score: number | null) {
  if (score === null) return "#8B96A7";
  if (score >= 70) return "#10B981";
  if (score >= 45) return "#FBB92D";
  return "#EF4444";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function ReceiptCard({ receipt, selected, onClick }: { receipt: Receipt; selected: boolean; onClick: () => void }) {
  const c = scoreColor(receipt.score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      style={{
        background: selected ? "rgba(0,212,255,0.04)" : "rgba(17,20,26,0.7)",
        border: `1px solid ${selected ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12, padding: "16px 18px",
        cursor: "pointer", transition: "border-color 0.2s, background 0.2s",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 12,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#F5F7FA", wordBreak: "break-word" }}>
            {receipt.entity_name}
          </span>
          <span style={{
            fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
            color: receipt.entity_type === "agent" ? "#5EEAD4" : "#00D4FF",
            background: receipt.entity_type === "agent" ? "rgba(94,234,212,0.08)" : "rgba(0,212,255,0.08)",
            border: `1px solid ${receipt.entity_type === "agent" ? "rgba(94,234,212,0.2)" : "rgba(0,212,255,0.2)"}`,
            borderRadius: 4, padding: "2px 6px", flexShrink: 0,
          }}>
            {receipt.entity_type}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8B96A7", fontSize: 12 }}>
          <Clock size={11} />
          {timeAgo(receipt.created_at)}
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{receipt.signals_verified}/{receipt.signals_total} signals</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{
          background: `${c}14`, border: `1px solid ${c}33`, color: c,
          borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700,
        }}>
          {receipt.score !== null ? `${receipt.score}/100` : "N/A"}
        </div>
        <ChevronRight size={14} color="#8B96A7" style={{
          transform: selected ? "rotate(90deg)" : "none", transition: "transform 0.2s",
        }} />
      </div>
    </motion.div>
  );
}

type PageState = "feed" | "entity";

export default function ReceiptsPage() {
  const [pageState, setPageState] = useState<PageState>("feed");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [feed, setFeed] = useState<Receipt[]>([]);
  const [entityReceipts, setEntityReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/receipts`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setFeed(data.receipts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load receipts");
    } finally {
      setLoading(false);
    }
  }

  async function searchEntity(query: string) {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSelectedReceipt(null);
    setPageState("entity");
    setSearchQuery(query.trim());
    try {
      const entityId = query.trim().toLowerCase().replace(/\s+/g, "-");
      const res = await fetch(`${BACKEND_URL}/receipts/${encodeURIComponent(entityId)}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setEntityReceipts(data.receipts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load receipts");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    if (searchInput.trim()) searchEntity(searchInput);
  };

  const handleBack = () => {
    setPageState("feed");
    setSelectedReceipt(null);
    setEntityReceipts([]);
    setSearchQuery("");
    setError(null);
  };

  const handleCardClick = (receipt: Receipt) => {
    setSelectedReceipt(selectedReceipt?.id === receipt.id ? null : receipt);
  };

  const activeReceipts = pageState === "entity" ? entityReceipts : feed;

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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px, 8vh, 72px) 20px 100px", boxSizing: "border-box", width: "100%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 12 }}>
              TRUST RECEIPTS
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 12px" }}>
              Audit History
            </h1>
            <p style={{ color: "#8B96A7", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
              Every VERIS audit is stored as a permanent trust receipt. Search any entity to view its
              score history, or browse recent audits below.
            </p>
          </div>

          {/* Search */}
          <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px", position: "relative", minWidth: 0 }}>
              <Search size={14} color="#8B96A7" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                placeholder="Search entity — e.g. Aave, ZERU"
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8, padding: "12px 14px 12px 38px",
                  color: "#F5F7FA", fontSize: 14, outline: "none",
                  fontFamily: "inherit", transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchInput.trim()}
              style={{
                background: searchInput.trim() ? "#00D4FF" : "rgba(0,212,255,0.3)",
                color: "#08090D", border: "none", borderRadius: 8,
                padding: "12px 20px", fontWeight: 600, fontSize: 14,
                cursor: searchInput.trim() ? "pointer" : "not-allowed",
                fontFamily: "inherit", flexShrink: 0, whiteSpace: "nowrap",
              }}
            >
              Search
            </button>
          </div>

          {/* Entity breadcrumb */}
          {pageState === "entity" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <button onClick={handleBack} style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "transparent", border: "none", color: "#8B96A7",
                fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0,
              }}>
                <RotateCcw size={12} /> All receipts
              </button>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
              <span style={{ fontSize: 13, color: "#F5F7FA", fontWeight: 500 }}>{searchQuery}</span>
              <span style={{ fontSize: 12, color: "#8B96A7" }}>
                ({entityReceipts.length} audit{entityReceipts.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}

          {/* Feed header */}
          {pageState === "feed" && !loading && feed.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontSize: 12, color: "#8B96A7", margin: 0 }}>
                {feed.length} most recent audit{feed.length !== 1 ? "s" : ""}
              </p>
              <button onClick={loadFeed} style={{
                display: "flex", alignItems: "center", gap: 5, background: "transparent",
                border: "none", color: "#8B96A7", fontSize: 12, cursor: "pointer",
                fontFamily: "inherit",
              }}>
                <RotateCcw size={11} /> Refresh
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 32, height: 32, borderRadius: "50%", margin: "0 auto 16px",
                  border: "2px solid rgba(0,212,255,0.15)", borderTopColor: "#00D4FF",
                }}
              />
              <p style={{ color: "#8B96A7", fontSize: 14, margin: 0 }}>Loading receipts…</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{
              background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 12, padding: "20px 24px", textAlign: "center",
            }}>
              <p style={{ color: "#FF6B6B", fontSize: 14, margin: "0 0 12px" }}>{error}</p>
              <button onClick={pageState === "feed" ? loadFeed : () => searchEntity(searchQuery)} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6, padding: "7px 16px", color: "#8B96A7", fontSize: 13,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && activeReceipts.length === 0 && (
            <div style={{
              border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12,
              padding: "48px 24px", textAlign: "center",
            }}>
              <p style={{ color: "#8B96A7", fontSize: 14, margin: "0 0 16px" }}>
                {pageState === "entity"
                  ? `No receipts found for "${searchQuery}". Run an audit first.`
                  : "No audits yet. Run the first one to see it appear here."}
              </p>
              <Link href="/audit">
                <button style={{
                  background: "#00D4FF", color: "#08090D", border: "none",
                  borderRadius: 7, padding: "10px 20px", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  Run an audit →
                </button>
              </Link>
            </div>
          )}

          {/* Receipt list with inline expanding detail */}
          {!loading && !error && activeReceipts.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeReceipts.map((receipt) => (
                <div key={receipt.id}>
                  <ReceiptCard
                    receipt={receipt}
                    selected={selectedReceipt?.id === receipt.id}
                    onClick={() => handleCardClick(receipt)}
                  />
                  <AnimatePresence>
                    {selectedReceipt?.id === receipt.id && (
                      <div style={{ marginTop: 10 }}>
                        {receipt.report ? (
                          <TrustDetailView receipt={receipt} report={receipt.report} />
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{
                              background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 12, padding: 20, textAlign: "center",
                            }}
                          >
                            <p style={{ color: "#8B96A7", fontSize: 13, margin: 0 }}>
                              Full report unavailable for this receipt.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

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
