import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import AuditPage from "@/pages/AuditPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import ProjectAuditsPage from "@/pages/ProjectAuditsPage";
import AgentAuditsPage from "@/pages/AgentAuditsPage";
import DocsPage from "@/pages/DocsPage";
import HowVerisWorksPage from "@/pages/HowVerisWorksPage";

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

function Router() {
  return (
    <Switch>
      <Route path="/"               component={LandingPage}      />
      <Route path="/audit"          component={AuditPage}        />
      <Route path="/demo"           component={DemoPage}         />
      <Route path="/project-audits" component={ProjectAuditsPage}/>
      <Route path="/agent-audits"   component={AgentAuditsPage}  />
      <Route path="/how-it-works"   component={HowVerisWorksPage}/>
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
