import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, ExternalLink, Star } from "lucide-react";
import { NAV_LINKS, ROUTES } from "@/data/navigation";

// ─── Spotlight Modal ─────────────────────────────────────────────────

function SpotlightModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#11141A", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20, padding: "28px 24px", maxWidth: 480, width: "100%",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* Modal header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Star size={15} color="#FBB92D" fill="#FBB92D" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#F5F7FA" }}>CROO Spotlight</span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent", border: "none", color: "#8B96A7",
                cursor: "pointer", display: "flex", alignItems: "center", padding: 4,
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Screenshot */}
          <div style={{
            borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20,
            background: "#08090D",
          }}>
            <img
              src="https://res.cloudinary.com/dxmogjxg6/image/upload/v1782535203/Screenshot_20260627_053831_X_cflvwj.jpg"
              alt="CROO Spotlight — VERIS"
              style={{ width: "100%", display: "block" }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href="https://x.com/i/status/2070090045093302639"
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, textDecoration: "none" }}
            >
              <button style={{
                width: "100%", background: "#00D4FF", color: "#08090D", border: "none",
                borderRadius: 8, padding: "11px 0", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                Open on X <ExternalLink size={11} />
              </button>
            </a>
            <button
              onClick={onClose}
              style={{
                flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "11px 0", fontSize: 13, color: "#8B96A7",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────

export function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  return (
    <>
      {spotlightOpen && <SpotlightModal onClose={() => setSpotlightOpen(false)} />}

      <div className="veris-hero-card">
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 50% -60%, transparent 58%, rgba(0,212,255,0.03) 62%, rgba(0,212,255,0.08) 67%, rgba(0,212,255,0.18) 72%, rgba(0,212,255,0.35) 77%, rgba(94,234,212,0.55) 84%, rgba(220,255,255,0.95) 92%, white 96%)"
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(rgba(255,255,255,0.02) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 100%)",
          backgroundSize: "40px 40px"
        }} />

        {/* Nav */}
        <nav className="veris-nav">
          <Link href={ROUTES.home} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="2" />
              <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: "20px", color: "var(--text)", letterSpacing: "0.04em" }}>VERIS</span>
          </Link>

          <div className="veris-nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label} href={href}
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.color = "var(--text)"}
                onMouseOut={(e) => e.currentTarget.style.color = "var(--muted)"}
              >
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href={ROUTES.audit} style={{ textDecoration: "none" }}>
              <button style={{
                background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
                color: "var(--primary)", borderRadius: "8px", padding: "8px 20px",
                cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(4px)",
                fontFamily: "inherit", fontSize: 14, fontWeight: 500
              }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.2)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,212,255,0.4)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Run Audit
              </button>
            </Link>
            <button
              className="veris-hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="veris-mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={label} href={href} className="veris-mobile-link" onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link href={ROUTES.audit} style={{ textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                <button style={{
                  marginTop: 16, background: "#00D4FF", color: "#08090D", border: "none",
                  borderRadius: 8, padding: "14px 0", fontWeight: 600, fontSize: 15,
                  cursor: "pointer", fontFamily: "inherit", width: "100%"
                }}>
                  Run Audit
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero content */}
        <div className="veris-hero-content">

          {/* CROO Spotlight badge */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSpotlightOpen(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(251,185,45,0.08)", border: "1px solid rgba(251,185,45,0.25)",
              borderRadius: 20, padding: "6px 14px", marginBottom: 24,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(251,185,45,0.14)"; e.currentTarget.style.borderColor = "rgba(251,185,45,0.4)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "rgba(251,185,45,0.08)"; e.currentTarget.style.borderColor = "rgba(251,185,45,0.25)"; }}
          >
            <Star size={11} color="#FBB92D" fill="#FBB92D" />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "#FBB92D", letterSpacing: "0.04em" }}>
              Featured by CROO · View Spotlight
            </span>
          </motion.button>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "24px" }}
          >
            TRUST INFRASTRUCTURE FOR THE AGENT ECONOMY
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1, margin: 0, color: "var(--text)" }}
          >
            Trust Before<br />
            <span style={{ background: "linear-gradient(90deg, #FFFFFF, #8DEBFF, #5EEAD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              You Commit
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: "580px", color: "var(--muted)", fontSize: "clamp(15px, 2.5vw, 18px)", margin: "24px auto 0", lineHeight: 1.65 }}
          >
            Verify Web3 projects and AI agents through autonomous multi-agent due diligence — delivered on Base Mainnet.
          </motion.p>

          {/* Social proof — single clean line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "6px 0", margin: "28px 0" }}
          >
            {[
              "3 autonomous agents",
              "Base Mainnet",
              "30+ on-chain transactions",
              "Real A2A workflow",
            ].map((item, i, arr) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12.5, color: "rgba(245,247,250,0.55)", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#10B981", marginRight: 4 }}>✓</span>{item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 8px", fontSize: 12 }}>·</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="veris-hero-cta"
          >
            {/* Primary — solid cyan, high contrast */}
            <Link href={ROUTES.audit} style={{ textDecoration: "none" }}>
              <button style={{
                background: "#00D4FF",
                color: "#08090D",
                border: "none",
                borderRadius: "10px",
                padding: "16px 36px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 15,
                letterSpacing: "0.01em",
                boxShadow: "0 0 32px rgba(0,212,255,0.35)",
                transition: "all 0.2s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 0 48px rgba(0,212,255,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = "0 0 32px rgba(0,212,255,0.35)"; e.currentTarget.style.transform = "none"; }}
              >
                Run Live Audit
              </button>
            </Link>

            {/* Secondary — white border, white text, clearly visible */}
            <Link href={ROUTES.demo} style={{ textDecoration: "none" }}>
              <button style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#F5F7FA",
                borderRadius: "10px",
                padding: "16px 36px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                Watch Demo
              </button>
            </Link>

            {/* Tertiary — GitHub, subdued */}
            <a
              href="https://github.com/PreciousNoah/veris-agent"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(245,247,250,0.65)",
                borderRadius: "10px",
                padding: "16px 28px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 15,
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
              }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#F5F7FA"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(245,247,250,0.65)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View GitHub
              </button>
            </a>
          </motion.div>

        </div>
      </div>
    </>
  );
} 
