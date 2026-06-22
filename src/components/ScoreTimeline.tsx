import { useState } from "react";
import { motion } from "framer-motion";

type HistoryPoint = {
  id: string;
  score: number | null;
  risk_level: string;
  created_at: string;
};

function scoreColor(score: number | null) {
  if (score === null) return "#8B96A7";
  if (score >= 70) return "#10B981";
  if (score >= 45) return "#FBB92D";
  return "#EF4444";
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleString("default", { month: "short" })} ${d.getDate()}`;
}

// ─── Mini SVG line chart ─────────────────────────────────────────────

function SparkLine({ points }: { points: { score: number; x: number; y: number }[] }) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${d} L ${points[points.length - 1].x} 60 L ${points[0].x} 60 Z`;
  return (
    <>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkGrad)" />
      <motion.path
        d={d} stroke="#00D4FF" strokeWidth="2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </>
  );
}

// ─── Main component ──────────────────────────────────────────────────

export function ScoreTimeline({
  history,
  currentId,
  onSelect,
}: {
  history: HistoryPoint[];
  currentId: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Only show points with actual scores, newest last for the chart
  const scored = [...history].filter((h) => h.score !== null).reverse();

  if (scored.length < 2) return null; // nothing to show if only one data point

  // Build SVG coordinates
  const W = 400;
  const H = 60;
  const PAD_X = 20;
  const PAD_Y = 8;
  const plotW = W - PAD_X * 2;
  const plotH = H - PAD_Y * 2;
  const scores = scored.map((p) => p.score as number);
  const minS = Math.max(0, Math.min(...scores) - 10);
  const maxS = Math.min(100, Math.max(...scores) + 10);
  const toX = (i: number) => PAD_X + (i / (scored.length - 1)) * plotW;
  const toY = (s: number) => PAD_Y + plotH - ((s - minS) / (maxS - minS)) * plotH;
  const svgPoints = scored.map((p, i) => ({
    score: p.score as number,
    x: toX(i),
    y: toY(p.score as number),
  }));

  // Trend calculation
  const first = scores[0];
  const last = scores[scores.length - 1];
  const diff = last - first;
  const trendColor = diff > 0 ? "#10B981" : diff < 0 ? "#EF4444" : "#8B96A7";
  const trendLabel = diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : "stable";

  return (
    <div style={{
      background: "rgba(17,20,26,0.7)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "22px 20px", marginBottom: 16,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8B96A7", textTransform: "uppercase", margin: "0 0 4px" }}>
            Trust History
          </p>
          <p style={{ fontSize: 13, color: "#8B96A7", margin: 0 }}>
            {scored.length} audits · {formatDate(scored[0].created_at)} – {formatDate(scored[scored.length - 1].created_at)}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "#8B96A7", margin: "0 0 2px", letterSpacing: "0.08em" }}>TREND</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: trendColor, margin: 0 }}>{trendLabel}</p>
        </div>
      </div>

      {/* Score pill row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {scored.map((point, i) => {
          const isActive = point.id === currentId;
          const c = scoreColor(point.score);
          const isFirst = i === 0;
          const isLast = i === scored.length - 1;
          const prev = i > 0 ? (scored[i - 1].score ?? 0) : null;
          const change = prev !== null ? (point.score ?? 0) - prev : null;

          return (
            <button
              key={point.id}
              onClick={() => onSelect(point.id)}
              style={{
                background: isActive ? `${c}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? c : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10, padding: "10px 14px", cursor: "pointer",
                fontFamily: "inherit", textAlign: "center", minWidth: 72, transition: "all 0.18s",
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700, color: c, margin: "0 0 2px" }}>
                {point.score}
              </p>
              <p style={{ fontSize: 10, color: "#8B96A7", margin: "0 0 2px" }}>
                {formatDate(point.created_at)}
              </p>
              {change !== null && (
                <p style={{ fontSize: 10, color: change > 0 ? "#10B981" : change < 0 ? "#EF4444" : "#8B96A7", margin: 0 }}>
                  {change > 0 ? `+${change}` : change < 0 ? change : "—"}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Spark line */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", minWidth: 240, display: "block", overflow: "visible" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <SparkLine points={svgPoints} />
          {svgPoints.map((p, i) => {
            const point = scored[i];
            const isActive = point.id === currentId;
            const isHov = hovered === i;
            const c = scoreColor(point.score);
            return (
              <g key={i}>
                <circle
                  cx={p.x} cy={p.y} r={16} fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(point.id)}
                />
                <circle
                  cx={p.x} cy={p.y}
                  r={isActive || isHov ? 6 : 4}
                  fill={isActive || isHov ? c : "#11141A"}
                  stroke={c} strokeWidth="2"
                  style={{ pointerEvents: "none", transition: "r 0.15s ease" }}
                />
                <text
                  x={p.x} y={H + 4}
                  fill={isActive ? c : "#8B96A7"}
                  fontSize="9" textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {formatDate(point.created_at)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Trend sentence */}
      <p style={{ fontSize: 12, color: "rgba(139,150,167,0.5)", margin: "12px 0 0", fontStyle: "italic" }}>
        {diff > 0
          ? `Trust score improved by ${diff} points across ${scored.length} audits.`
          : diff < 0
          ? `Trust score declined by ${Math.abs(diff)} points across ${scored.length} audits.`
          : `Trust score has remained stable across ${scored.length} audits.`}
        {" "}Click any point to view that audit.
      </p>
    </div>
  );
}
