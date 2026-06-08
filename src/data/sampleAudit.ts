// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE AUDIT DATA
// Each export is annotated with the API endpoint that will replace it.
// When your backend is ready, swap the constant for a fetch / React Query call.
// ─────────────────────────────────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type EntityType = "project" | "agent";
export type RecommendationKey = "PROCEED" | "PROCEED_WITH_CAUTION" | "DO_NOT_PROCEED";

export interface AuditDimension {
  label: string;
  score: number;   // raw score
  max: number;     // maximum possible
  pct: number;     // percentage (for progress bars)
  color: string;   // accent colour hex
}

export interface DashboardMetric {
  label: string;
  score: number;  // 0–100
  color: string;
}

export interface AuditReport {
  entityName: string;
  entityType: EntityType;
  reportDate: string;        // ISO date string
  trustScore: number;        // 0–100
  maxScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
  badge: {
    background: string;
    border: string;
    color: string;
  };
  dimensions: AuditDimension[];
}

export interface AuditCard {
  id: number;
  name: string;
  metric: string;
  score: string;
  scoreColor: string;
  items: { label: string; ok: boolean }[];
  badge: string;
  badgeStyle: { background: string; border: string; color: string };
}

export interface SimulatorResult {
  label: string;
  ok: boolean;
}

export interface TimelinePoint {
  month: string;
  score: number;
  events: string[];
}

// ─── Primary sample audit ────────────────────────────────────────────────────
// Replace with: await fetch('/api/audits/:id').then(r => r.json())
export const SAMPLE_AUDIT: AuditReport = {
  entityName: "XYZ Protocol",
  entityType: "project",
  reportDate: "2025-06-04",
  trustScore: 87,
  maxScore: 100,
  riskLevel: "MEDIUM",
  recommendation: "PROCEED WITH CAUTION",
  badge: {
    background: "rgba(251,185,45,0.1)",
    border: "1px solid rgba(251,185,45,0.3)",
    color: "#FBB92D",
  },
  dimensions: [
    { label: "Team Transparency",    score: 18, max: 20, pct: 90, color: "#00D4FF" },
    { label: "Documentation",        score: 17, max: 20, pct: 85, color: "#00D4FF" },
    { label: "Development Activity", score: 19, max: 20, pct: 95, color: "#00D4FF" },
    { label: "Social Credibility",   score: 14, max: 20, pct: 70, color: "#FBB92D" },
    { label: "Risk Flags",           score: 19, max: 20, pct: 95, color: "#5EEAD4" },
  ],
};

// ─── Dashboard metrics (six dimensions, 0–100 scale) ─────────────────────────
// Replace with: await fetch('/api/audits/:id/metrics').then(r => r.json())
export const DASHBOARD_METRICS: DashboardMetric[] = [
  { label: "Team Identity",           score: 95, color: "#00D4FF" },
  { label: "Documentation",           score: 91, color: "#00D4FF" },
  { label: "Development Activity",    score: 84, color: "#5EEAD4" },
  { label: "Treasury Verification",   score: 88, color: "#5EEAD4" },
  { label: "Community Signals",       score: 74, color: "#8DEBFF" },
  { label: "Risk Flags",             score: 63, color: "#FBB92D" },
];

// ─── Rotating hero cards ──────────────────────────────────────────────────────
// Replace with: await fetch('/api/audits/recent?limit=2').then(r => r.json())
export const SAMPLE_CARDS: AuditCard[] = [
  {
    id: 1,
    name: "XYZ Protocol",
    metric: "Trust Score",
    score: "87/100",
    scoreColor: "#00D4FF",
    items: [
      { label: "Team Transparency",    ok: true  },
      { label: "Documentation",        ok: true  },
      { label: "Development Activity", ok: true  },
      { label: "Social Credibility",   ok: false },
    ],
    badge: "PROCEED WITH CAUTION",
    badgeStyle: {
      background: "rgba(251,191,36,0.1)",
      border: "1px solid rgba(251,191,36,0.3)",
      color: "#FBB92D",
    },
  },
  {
    id: 2,
    name: "Research Agent",
    metric: "Reliability",
    score: "92/100",
    scoreColor: "#5EEAD4",
    items: [
      { label: "Competence",           ok: true },
      { label: "Source Verification",  ok: true },
      { label: "Performance",          ok: true },
      { label: "Transparency",         ok: true },
    ],
    badge: "SUITABLE",
    badgeStyle: {
      background: "rgba(94,234,212,0.1)",
      border: "1px solid rgba(94,234,212,0.3)",
      color: "#5EEAD4",
    },
  },
];

// ─── Simulator verification results ──────────────────────────────────────────
// Replace with: the real check results returned by POST /api/audits/run
export const SIMULATOR_RESULTS: SimulatorResult[] = [
  { label: "Team Transparency",       ok: true  },
  { label: "Documentation Quality",   ok: true  },
  { label: "Development Activity",    ok: true  },
  { label: "Source Verification",     ok: true  },
  { label: "Social Credibility Risks",ok: false },
];

// ─── Trust timeline ───────────────────────────────────────────────────────────
// Replace with: await fetch('/api/audits/:id/timeline').then(r => r.json())
export const TRUST_TIMELINE: TimelinePoint[] = [
  {
    month: "Jan", score: 91,
    events: [
      "3 new core contributors added",
      "Full technical documentation published",
      "Social mentions +240%",
      "No risk events detected",
    ],
  },
  {
    month: "Feb", score: 88,
    events: [
      "Minor documentation gaps identified",
      "Development velocity stable",
      "Community growth slowed",
      "1 low-severity risk flag",
    ],
  },
  {
    month: "Mar", score: 76,
    events: [
      "Lead developer departure",
      "Commit frequency dropped 60%",
      "Social sentiment shift negative",
      "2 medium risk flags raised",
    ],
  },
  {
    month: "Apr", score: 87,
    events: [
      "New technical lead onboarded",
      "Development resumed full pace",
      "Community AMA — high engagement",
      "Risk flags resolved",
    ],
  },
  {
    month: "May", score: 89,
    events: [
      "Third-party security audit passed",
      "Docs expanded significantly",
      "Partnership announcements verified",
      "Trend: positive",
    ],
  },
];
