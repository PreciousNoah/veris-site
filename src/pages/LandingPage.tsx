import "@/veris.css";
import { Hero } from "@/components/Hero";
import { VerificationPipeline } from "@/components/VerificationPipeline";
import { ReportCard } from "@/components/ReportCard";
import { LiveAuditSimulator } from "@/components/LiveAuditSimulator";
import { DimensionMarquee } from "@/components/DimensionMarquee";
import { TrustScoreDashboard } from "@/components/TrustScoreDashboard";
import { TrustTimeline } from "@/components/TrustTimeline";
import { HowVerisWorks } from "@/components/HowVerisWorks";
import { UseCases } from "@/components/UseCases";
import { ReportPreview } from "@/components/ReportPreview";
import { TrustedByData } from "@/components/TrustedByData";
import { FinalCTA } from "@/components/FinalCTA";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function LandingPage() {
  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#08090D"
    }}>
      <Hero />

      <section style={{ width: "100%", maxWidth: 1200, padding: "0 24px" }}>
        <VerificationPipeline />
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 40 }}>
          <ReportCard />
        </div>
      </section>

      <LiveAuditSimulator />

      <DimensionMarquee />

      <TrustScoreDashboard />

      <TrustTimeline />

      <HowVerisWorks />

      <UseCases />

      <ReportPreview />

      <TrustedByData />

      <FinalCTA />

      <PremiumFooter />
    </div>
  );
}
