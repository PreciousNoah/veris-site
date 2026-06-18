// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — static marketing copy and UI configuration
// These values are editorial/product decisions, not API data.
// Update copy here without touching component files.
// ─────────────────────────────────────────────────────────────────────────────
import { Database, BarChart2, GitMerge, Award, Briefcase, Cpu, Globe, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Dimension marquee ────────────────────────────────────────────────────────
export const MARQUEE_ITEMS: string[] = [
  "TEAM TRANSPARENCY",
  "DOCUMENTATION QUALITY",
  "SOCIAL CREDIBILITY",
  "DEVELOPMENT ACTIVITY",
  "RISK FLAGS",
  "SOURCE VERIFICATION",
  "DOMAIN COMPETENCE",
  "RELIABILITY",
  "TRANSPARENCY",
  "PERFORMANCE",
];

// ─── Platform stats ───────────────────────────────────────────────────────────
// IMPORTANT: These must reflect real, verifiable claims.
// Replace with: await fetch(`${BACKEND_URL}/receipts`).then(r => r.json())
// and derive counts from the actual receipts array once volume justifies it.
//
// Until real audit volume is meaningful, these stats describe verifiable
// infrastructure facts rather than inflated usage numbers.
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const PLATFORM_STATS: StatItem[] = [
  { value: 2,   suffix: "",   label: "Live Agents on Base Mainnet"        },
  { value: 4,   suffix: "",   label: "Verified On-Chain Transactions"     },
  { value: 27,  suffix: "",   label: "Trust Signals Evaluated Per Audit"  },
  { value: 3,   suffix: "",   label: "Verification Layers Per Report"    },
];

// ─── Methodology steps ────────────────────────────────────────────────────────
export interface MethodologyStep {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  iconColor: string;
  glow: string;
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    num: "01",
    Icon: Database,
    title: "Collect Evidence",
    desc: "Websites, repositories, social accounts, team identities, public records — gathered from primary sources via live web search.",
    iconColor: "#00D4FF",
    glow: "rgba(0,212,255,0.1)",
  },
  {
    num: "02",
    Icon: BarChart2,
    title: "Analyze Signals",
    desc: "Structured evidence extraction evaluates trust indicators and resolves them against known ground truth for established entities.",
    iconColor: "#8DEBFF",
    glow: "rgba(141,235,255,0.1)",
  },
  {
    num: "03",
    Icon: GitMerge,
    title: "Verify Sources",
    desc: "Evidence is weighted by source authority — official documentation and GitHub carry more weight than social media mentions.",
    iconColor: "#5EEAD4",
    glow: "rgba(94,234,212,0.1)",
  },
  {
    num: "04",
    Icon: Award,
    title: "Generate Trust Intelligence",
    desc: "A final trust score, signal breakdown, and an evidence-backed recommendation are produced and delivered on-chain.",
    iconColor: "#A8EDEA",
    glow: "rgba(168,237,234,0.1)",
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
export interface UseCase {
  Icon: LucideIcon;
  iconColor: string;
  tag: string;
  title: string;
  desc: string;
  gradient: string;
  border: string;
  hoverGlow: string;
  points: string[];
}

export const USE_CASES: UseCase[] = [
  {
    Icon: Briefcase,
    iconColor: "#00D4FF",
    tag: "WEB3 & DeFi",
    title: "Project Due Diligence",
    desc: "Audit Web3 projects before investing, partnering, or joining. VERIS surfaces team authenticity, documentation quality, development activity, and risk signals — all backed by live evidence.",
    gradient: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(17,20,26,0.95) 60%)",
    border: "rgba(0,212,255,0.2)",
    hoverGlow: "rgba(0,212,255,0.12)",
    points: [
      "Multi-query web evidence collection",
      "Team identity & documentation checks",
      "Known incident detection (ground truth)",
    ],
  },
  {
    Icon: Cpu,
    iconColor: "#5EEAD4",
    tag: "AI AGENTS",
    title: "Agent Due Diligence",
    desc: "Investigate AI agents across metadata, web presence, and live verification before transacting. VERIS reports signal coverage honestly — including what can't be verified yet.",
    gradient: "linear-gradient(135deg, rgba(94,234,212,0.08) 0%, rgba(17,20,26,0.95) 60%)",
    border: "rgba(94,234,212,0.2)",
    hoverGlow: "rgba(94,234,212,0.12)",
    points: [
      "CROO store metadata verification",
      "Public web presence checks",
      "Optional live endpoint & order testing",
    ],
  },
];

// ─── Audit simulator ──────────────────────────────────────────────────────────
// Tabs must match what the real backend actually supports.
export interface SimulatorTab {
  id: string;
  label: string;
  short: string;
  Icon: LucideIcon;
  placeholder: string;
}

export const SIMULATOR_TABS: SimulatorTab[] = [
  { id: "project", label: "Web3 Project", short: "Project", Icon: Globe, placeholder: "Aave, https://aave.com, or project name" },
  { id: "agent",   label: "AI Agent",     short: "Agent",   Icon: Bot,   placeholder: "Agent name or CROO agent ID" },
];

export const SIMULATOR_STAGES: string[] = [
  "Collecting Evidence...",
  "Analyzing Signals...",
  "Verifying Sources...",
  "Calculating Trust Score...",
  "Generating Recommendation...",
];