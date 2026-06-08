import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import "@/veris.css";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

function VerisMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.8" />
      <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlaceholderPage({ title, subtitle, description, ctaLabel, ctaHref }: PlaceholderPageProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#08090D", color: "#F5F7FA", fontFamily: "Inter, sans-serif" }}>

      {/* ── top nav bar ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px clamp(20px, 4vw, 48px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(8,9,13,0.85)", backdropFilter: "blur(16px)"
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <VerisMark />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#F5F7FA", letterSpacing: "0.04em" }}>VERIS</span>
        </Link>
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            color: "#8B96A7", fontSize: 13, textDecoration: "none",
            transition: "color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#F5F7FA"}
          onMouseOut={(e) => e.currentTarget.style.color = "#8B96A7"}
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </nav>

      {/* ── main content ── */}
      <main style={{
        maxWidth: 640, margin: "0 auto",
        padding: "clamp(60px, 10vh, 120px) 24px",
        textAlign: "center"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: 20, padding: "6px 14px", marginBottom: 32
          }}>
            <Clock size={11} color="#00D4FF" />
            <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "#00D4FF", textTransform: "uppercase" }}>
              In Development
            </span>
          </div>

          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 16 }}>
            {subtitle}
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 24px" }}>
            {title}
          </h1>
          <p style={{ fontSize: "clamp(14px, 2.5vw, 17px)", color: "#8B96A7", lineHeight: 1.7, margin: "0 0 48px" }}>
            {description}
          </p>

          {/* divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 40px" }} />

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {ctaLabel && ctaHref && (
              <Link href={ctaHref}>
                <button style={{
                  background: "#00D4FF", color: "#08090D", border: "none",
                  borderRadius: 8, padding: "13px 28px", fontWeight: 600, fontSize: 14,
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em"
                }}>
                  {ctaLabel}
                </button>
              </Link>
            )}
            <Link href="/">
              <button style={{
                background: "transparent", color: "#8B96A7",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "13px 28px", fontSize: 14,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
              }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#F5F7FA"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8B96A7"; }}
              >
                ← Return home
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* ── subtle grid bg ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.015) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 100%)",
        backgroundSize: "48px 48px"
      }} />
    </div>
  );
}
