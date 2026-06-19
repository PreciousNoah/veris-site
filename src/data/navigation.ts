// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION — routes and link labels
// Update href values here when real pages are ready.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

// ─── App routes ───────────────────────────────────────────────────────────────
export const ROUTES = {
  home:          "/",
  audit:         "/audit",
  demo:          "/demo",
  projectAudits: "/project-audits",
  agentAudits:   "/agent-audits",
  howItWorks:    "/how-it-works",
  docs:          "/docs",
  receipts:      "/receipts",        // ← Add this
} as const;

// ─── Primary navigation (header) ─────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Project Audits", href: ROUTES.projectAudits },
  { label: "Agent Audits",   href: ROUTES.agentAudits   },
  { label: "How It Works",   href: ROUTES.howItWorks    },
  { label: "Docs",           href: ROUTES.docs          },
  { label: "Receipts",       href: ROUTES.receipts      }, // ← Add this
];

// ─── Footer navigation ────────────────────────────────────────────────────────
export const FOOTER_NAV: FooterSection[] = [
  {
    title: "PLATFORM",
    links: [
      { label: "Project Audits",   href: ROUTES.projectAudits },
      { label: "Agent Audits",     href: ROUTES.agentAudits   },
      { label: "Trust Engine",     href: ROUTES.howItWorks    },
      { label: "Trust Scores",     href: ROUTES.audit         },
      { label: "Monitoring",       href: ROUTES.audit         },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation",    href: ROUTES.docs          },
      { label: "Methodology",      href: ROUTES.howItWorks    },
      { label: "API Access",       href: ROUTES.docs          },
      { label: "Audit Reports",    href: ROUTES.audit         },
      { label: "Knowledge Base",   href: ROUTES.docs          },
      { label: "Receipts",         href: ROUTES.receipts      }, // ← Add this
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About",            href: "#" },
      { label: "Contact",          href: "#" },
      { label: "Careers",          href: "#" },
      { label: "Partners",         href: "#" },
      { label: "Security",         href: "#" },
    ],
  },
];
