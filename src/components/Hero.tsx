import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, ROUTES } from "@/data/navigation";

export function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
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

      <div className="veris-hero-content">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "24px" }}
        >
          TRUST INFRASTRUCTURE FOR THE AGENT ECONOMY
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1, margin: 0, color: "var(--text)" }}
        >
          Trust Before<br />
          <span style={{ background: "linear-gradient(90deg, #FFFFFF, #8DEBFF, #5EEAD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            You Commit
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: "620px", color: "var(--muted)", fontSize: "clamp(15px, 2.5vw, 18px)", margin: "24px auto", lineHeight: 1.65 }}
        >
          VERIS audits Web3 projects and AI agents using live evidence before investments, partnerships, hires, and transactions happen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="veris-hero-cta"
        >
          <Link href={ROUTES.audit} style={{ textDecoration: "none" }}>
            <button style={{
              background: "var(--primary)", color: "var(--bg)", border: "none",
              borderRadius: "8px", padding: "14px 32px", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s", fontFamily: "inherit", fontSize: 15
            }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.5)"}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              Run Audit
            </button>
          </Link>
          <Link href={ROUTES.demo} style={{ textDecoration: "none" }}>
            <button style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "var(--text)",
              borderRadius: "8px", padding: "14px 32px", cursor: "pointer",
              transition: "all 0.2s", fontFamily: "inherit", fontSize: 15
            }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
            >
              Watch Demo
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
