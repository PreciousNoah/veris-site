import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import AuditPage from "@/pages/AuditPage";
import PlaceholderPage from "@/pages/PlaceholderPage";

const queryClient = new QueryClient();

const DemoPage = () => (
  <PlaceholderPage
    title="Watch the Demo"
    subtitle="Product Demo"
    description="A full walkthrough of a live VERIS audit — from submitting an entity to reading the structured trust report. The demo video will be embedded here."
    ctaLabel="Run an audit instead"
    ctaHref="/audit"
  />
);

const ProjectAuditsPage = () => (
  <PlaceholderPage
    title="Project Audits"
    subtitle="Web3 & DeFi"
    description="Deep-dive trust verification for Web3 projects, DeFi protocols, and blockchain teams. Covers on-chain activity, team identity, documentation, and risk signals."
    ctaLabel="Run a project audit"
    ctaHref="/audit"
  />
);

const AgentAuditsPage = () => (
  <PlaceholderPage
    title="Agent Audits"
    subtitle="AI Agents"
    description="Reliability verification for AI agents using live task-based evaluation. VERIS tests competence, source citation accuracy, and behavioral consistency before you delegate trust."
    ctaLabel="Audit an agent"
    ctaHref="/audit"
  />
);

const HowItWorksPage = () => (
  <PlaceholderPage
    title="How VERIS Works"
    subtitle="Methodology"
    description="A detailed breakdown of the four-stage evidence collection, signal analysis, source verification, and trust intelligence generation process that powers every VERIS audit."
    ctaLabel="See it in action"
    ctaHref="/audit"
  />
);

const DocsPage = () => (
  <PlaceholderPage
    title="Documentation"
    subtitle="API & Guides"
    description="Full API reference, integration guides, webhook documentation, and audit report schema. Connect your product to the VERIS trust layer in minutes."
    ctaLabel="Run a live audit"
    ctaHref="/audit"
  />
);

function Router() {
  return (
    <Switch>
      <Route path="/"               component={LandingPage}      />
      <Route path="/audit"          component={AuditPage}        />
      <Route path="/demo"           component={DemoPage}         />
      <Route path="/project-audits" component={ProjectAuditsPage}/>
      <Route path="/agent-audits"   component={AgentAuditsPage}  />
      <Route path="/how-it-works"   component={HowItWorksPage}   />
      <Route path="/docs"           component={DocsPage}         />
      <Route                        component={NotFound}         />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
