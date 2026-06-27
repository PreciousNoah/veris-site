// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION — routes and link labels
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
  receipts:      "/receipts",
} as const;

// ─── Primary navigation (header) ─────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Project Audits", href: ROUTES.projectAudits },
  { label: "Agent Audits",   href: ROUTES.agentAudits   },
  { label: "How It Works",   href: ROUTES.howItWorks    },
  { label: "Docs",           href: ROUTES.docs          },
  { label: "Receipts",       href: ROUTES.receipts      },
];

// ─── Footer navigation ────────────────────────────────────────────────────────
export const FOOTER_NAV: FooterSection[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "Project Audits",  href: ROUTES.projectAudits },
      { label: "Agent Audits",    href: ROUTES.agentAudits   },
      { label: "How It Works",    href: ROUTES.howItWorks    },
      { label: "Audit Receipts",  href: ROUTES.receipts      },
      { label: "Watch Demo",      href: ROUTES.demo          },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation",   href: ROUTES.docs          },
      { label: "API Reference",   href: ROUTES.docs          },
      { label: "Methodology",     href: ROUTES.howItWorks    },
      { label: "Run an Audit",    href: ROUTES.audit         },
      { label: "GitHub",          href: "https://github.com/PreciousNoah/veris-agent" },
    ],
  },
  {
    title: "BUILT ON",
    links: [
      { label: "CROO Protocol",   href: "https://agent.croo.network"              },
      { label: "Base Mainnet",    href: "https://base.org"                        },
      { label: "ZERU Agent",      href: "https://agent.croo.network"              },
      { label: "SENTINEL Agent",  href: "https://agent.croo.network"              },
      { label: "View on BaseScan", href: "https://basescan.org"                  },
    ],
  },
];
