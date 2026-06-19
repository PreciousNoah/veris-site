# veris-site

Frontend for VERIS — Trust Infrastructure for the Agent Economy.

Built with React + Vite + TypeScript. Deployed on Vercel.

---

## Stack

```
Framework:   React 18 + Vite + TypeScript
Routing:     wouter
Animation:   framer-motion
UI:          shadcn/ui + Tailwind CSS
Icons:       lucide-react
Deployment:  Vercel
```

---

## Pages

| Route | Component | Status |
|-------|-----------|--------|
| `/` | `LandingPage` | Live |
| `/audit` | `AuditPage` | Live — calls backend directly |
| `/receipts` | `ReceiptsPage` | Live — shows trust receipt history |
| `/project-audits` | `ProjectAuditsPage` | Live |
| `/agent-audits` | `AgentAuditsPage` | Live |
| `/how-it-works` | `HowVerisWorksPage` | Live |
| `/docs` | `DocsPage` | Live |
| `/demo` | `DemoPage` | Pending demo video |

---

## Quick Start

```bash
git clone https://github.com/PreciousNoah/veris-site
cd veris-site
npm install
npm run dev
```

---

## Environment

No environment variables needed for the frontend itself. The backend URL is set directly in the component files that call the API.

To update the backend URL (e.g. when switching from Railway to another host):

1. Open `src/pages/AuditPage.tsx` — update `BACKEND_URL`
2. Open `src/pages/ReceiptsPage.tsx` — update `BACKEND_URL`

Both are at the top of the file, clearly labelled.

---

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx          # Homepage — pulls from data/ files
│   ├── AuditPage.tsx            # Main audit form + result display
│   ├── ReceiptsPage.tsx         # Trust receipt history + entity search
│   ├── ProjectAuditsPage.tsx    # Product page — project due diligence
│   ├── AgentAuditsPage.tsx      # Product page — agent due diligence
│   ├── HowVerisWorksPage.tsx    # Methodology — four stage pipeline
│   ├── DocsPage.tsx             # API documentation
│   └── not-found.tsx            # 404
│
├── components/
│   ├── Hero.tsx                 # Landing hero section
│   ├── VerificationPipeline.tsx # Four-step visual
│   ├── ReportCard.tsx           # Rotating sample cards
│   ├── LiveAuditSimulator.tsx   # Interactive demo widget
│   ├── DimensionMarquee.tsx     # Scrolling signal names
│   ├── TrustScoreDashboard.tsx  # Sample score breakdown
│   ├── TrustTimeline.tsx        # Illustrative history chart
│   ├── HowVerisWorks.tsx        # Methodology section
│   ├── UseCases.tsx             # Use case cards
│   ├── ReportPreview.tsx        # Sample report preview
│   ├── TrustedByData.tsx        # Stats section
│   ├── FinalCTA.tsx             # Bottom call to action
│   └── PremiumFooter.tsx        # Footer
│
├── data/
│   ├── siteContent.ts           # Marketing copy, simulator config, platform stats
│   ├── sampleAudit.ts           # Illustrative sample data (XYZ Protocol)
│   └── navigation.ts            # Route constants
│
├── veris.css                    # Component styles (docs layout, grid, marquee, etc.)
└── index.css                    # Tailwind config + theme variables
```

---

## Data Files

### `src/data/siteContent.ts`
All static marketing copy and UI configuration. Update this file to change:
- `PLATFORM_STATS` — the four stat counters ("Trust at Scale" section)
- `SIMULATOR_TABS` — which entity types appear in the homepage demo
- `SIMULATOR_STAGES` — loading steps shown during the demo animation
- `METHODOLOGY_STEPS` — the four-stage pipeline cards
- `USE_CASES` — the two product cards (Project / Agent)

### `src/data/sampleAudit.ts`
Illustrative data used in the homepage demo widget and score dashboard.
Clearly labelled as `XYZ Protocol` — not a real audit result.
These will eventually be replaced by real API calls to `/receipts`.

---

## Backend Connection

The site connects to the VERIS backend (Node.js on Railway) for:

| Page | Endpoint | What it does |
|------|----------|--------------|
| `/audit` | `POST /audit` | Runs a live project or agent audit |
| `/receipts` | `GET /receipts` | Loads the global receipt feed |
| `/receipts` (search) | `GET /receipts/:entityId` | Loads receipt history for one entity |

The backend repo is at: [github.com/PreciousNoah/veris-agent](https://github.com/PreciousNoah/veris-agent)

---

## Audit Form — Request Format

The `AuditPage` sends requests in this format:

**Project audit:**
```json
{
  "requirements": {
    "type": "project",
    "name": "Aave",
    "website": "https://aave.com",
    "mode": "full"
  }
}
```

**Agent audit:**
```json
{
  "requirements": {
    "type": "agent",
    "agentId": "agent-id-here",
    "agentName": "ZERU",
    "mode": "full",
    "category": "research"
  }
}
```

---

## Report Parsing

The backend returns a plain-text report inside a JSON envelope:
```json
{ "report": "VERIS TRUST REPORT\n══════...\n(full text)" }
```

`AuditPage.tsx` parses the report with these regex patterns:

| Field | Pattern |
|-------|---------|
| Score (agent) | `OVERALL SCORE:\s*(\d+)\/(\d+)` |
| Score (project) | `LEGITIMACY:\s*(\d+)\/100` |
| Recommendation | `RECOMMENDATION:\s*[^\w]*([A-Z][A-Z\s]+?)` |
| Dimensions | `^\s{2}([A-Za-z]+?):\s+(\d+)\/100` |
| Incidents | `MAJOR HISTORICAL INCIDENTS` block |

---

## Trust Receipts

Every audit run through the backend is saved to Supabase as a trust receipt.
The `ReceiptsPage` displays these receipts in two modes:

- **Feed mode** — loads the 20 most recent audits across all entities
- **Entity mode** — search by entity name to see all historical scores

This is the beginning of the reputation layer CROO doesn't currently provide.

---

## Deployment

The site is deployed on Vercel with automatic deploys from `main`.

A `vercel.json` SPA rewrite rule ensures client-side routing works:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## License

MIT