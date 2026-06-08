// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — static marketing copy and UI configuration
// These values are editorial/product decisions, not API data.
// Update copy here without touching component files.
// ─────────────────────────────────────────────────────────────────────────────

import { Database, BarChart2, GitMerge, Award, Briefcase, Cpu, Globe, Github, Bot, Wallet } from "lucide-react";
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
// Replace with: await fetch('/api/stats').then(r => r.json())
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const PLATFORM_STATS: StatItem[] = [
  { value: 12847, suffix: "+",  label: "Verifications Generated" },
  { value: 3200,  suffix: "+",  label: "Projects Audited"        },
  { value: 98,    suffix: "M+", label: "Data Points Analyzed"    },
  { value: 1400,  suffix: "+",  label: "Agents Verified"         },
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
    desc: "Wallets, repositories, social accounts, team identities, public records — gathered from primary sources.",
    iconColor: "#00D4FF",
    glow: "rgba(0,212,255,0.1)",
  },
  {
    num: "02",
    Icon: BarChart2,
    title: "Analyze Signals",
    desc: "Machine intelligence evaluates trust indicators and behavioral patterns across all collected vectors.",
    iconColor: "#8DEBFF",
    glow: "rgba(141,235,255,0.1)",
  },
  {
    num: "03",
    Icon: GitMerge,
    title: "Verify Sources",
    desc: "Evidence is cross-referenced across multiple independent verification layers to eliminate false signals.",
    iconColor: "#5EEAD4",
    glow: "rgba(94,234,212,0.1)",
  },
  {
    num: "04",
    Icon: Award,
    title: "Generate Trust Intelligence",
    desc: "A final trust score, structured findings, and an actionable recommendation are produced and delivered.",
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
      "Smart contract analysis",
      "Team identity verification",
      "On-chain activity scoring",
    ],
  },
  {
    Icon: Cpu,
    iconColor: "#5EEAD4",
    tag: "AI AGENTS",
    title: "Agent Reliability Audits",
    desc: "Test AI agents using live CROO orders before transacting. Evaluate competence, source verification, output performance, and transparency before you delegate trust.",
    gradient: "linear-gradient(135deg, rgba(94,234,212,0.08) 0%, rgba(17,20,26,0.95) 60%)",
    border: "rgba(94,234,212,0.2)",
    hoverGlow: "rgba(94,234,212,0.12)",
    points: [
      "Live task-based evaluation",
      "Source citation auditing",
      "Behavioral consistency tracking",
    ],
  },
];

// ─── Audit simulator ──────────────────────────────────────────────────────────
export interface SimulatorTab {
  id: string;
  label: string;
  short: string;
  Icon: LucideIcon;
  placeholder: string;
}

export const SIMULATOR_TABS: SimulatorTab[] = [
  { id: "project", label: "Project Website",    short: "Website", Icon: Globe,  placeholder: "https://yourproject.xyz" },
  { id: "github",  label: "GitHub Repository",  short: "GitHub",  Icon: Github, placeholder: "https://github.com/org/repo" },
  { id: "agent",   label: "Agent ID",           short: "Agent",   Icon: Bot,    placeholder: "agent-xyz-001 or a DID" },
  { id: "wallet",  label: "Wallet Address",     short: "Wallet",  Icon: Wallet, placeholder: "0x... or a Solana address" },
];

export const SIMULATOR_STAGES: string[] = [
  "Collecting Evidence...",
  "Analyzing Activity...",
  "Verifying Sources...",
  "Calculating Trust Score...",
  "Generating Recommendation...",
];
