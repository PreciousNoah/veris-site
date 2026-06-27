import { motion } from "framer-motion";
import { Link } from "wouter";
import { FOOTER_NAV, ROUTES } from "@/data/navigation";

const SOCIAL_LINKS = [
  {
    href: "https://x.com/Amon_moc",
    label: "X (Twitter)",
    Icon: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/PreciousNoah",
    label: "GitHub",
    Icon: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    href: "https://t.me/PreciousNoah",
    label: "Telegram",
    Icon: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    href: "https://discord.com/users/preciousnoah",
    label: "Discord",
    Icon: () => (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.12 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
];

function GlowIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 36, height: 36, borderRadius: 8,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#8B96A7", textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
        e.currentTarget.style.color = "#00D4FF";
        e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.2)";
        e.currentTarget.style.background = "rgba(0,212,255,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "#8B96A7";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      {children}
    </a>
  );
}

export function PremiumFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      style={{ width: "calc(100% - 48px)", maxWidth: 1400, margin: "0 auto 32px", padding: 0 }}
    >
      <div style={{
        background: "rgba(17,20,26,0.6)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 32,
        boxShadow: "0 0 0 1px rgba(0,212,255,0.04), 0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), rgba(94,234,212,0.15), transparent)" }} />

        <div className="veris-footer-inner">
          <div className="veris-footer-grid">

            {/* Brand */}
            <div>
              <Link href={ROUTES.home} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, textDecoration: "none" }}>
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.5" />
                  <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontWeight: 700, fontSize: 18, color: "#F5F7FA", letterSpacing: "0.04em" }}>VERIS</span>
              </Link>
              <p style={{ fontSize: 13.5, color: "#8B96A7", lineHeight: 1.7, maxWidth: 260, margin: "0 0 20px" }}>
                Trust infrastructure for the agent economy. Three autonomous agents. Real A2A workflow. Base Mainnet.
              </p>
              <a
                href="https://agent.croo.network"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11.5, color: "#00D4FF", fontWeight: 600, letterSpacing: "0.06em",
                  background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 20, padding: "5px 12px", textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.14)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                Live on CROO Agent Store
              </a>
            </div>

            {/* Nav columns */}
            {FOOTER_NAV.map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#8B96A7", textTransform: "uppercase", marginBottom: 20 }}>
                  {title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {links.map(({ label, href }) => (
                    href.startsWith("/") ? (
                      <Link
                        key={label} href={href}
                        style={{ fontSize: 13.5, color: "rgba(245,247,250,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#F5F7FA"}
                        onMouseOut={(e) => e.currentTarget.style.color = "rgba(245,247,250,0.55)"}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        key={label} href={href}
                        target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 13.5, color: "rgba(245,247,250,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#F5F7FA"}
                        onMouseOut={(e) => e.currentTarget.style.color = "rgba(245,247,250,0.55)"}
                      >
                        {label}
                      </a>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 28 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <span style={{ fontSize: 12, color: "rgba(139,150,167,0.55)", letterSpacing: "0.04em" }}>
              © 2026 VERIS. Built by{" "}
              <a
                href="https://x.com/Amon_moc"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(0,212,255,0.7)", textDecoration: "none" }}
                onMouseOver={(e) => e.currentTarget.style.color = "#00D4FF"}
                onMouseOut={(e) => e.currentTarget.style.color = "rgba(0,212,255,0.7)"}
              >
                @Amon_moc
              </a>
            </span>
            <span style={{ fontSize: 12, color: "rgba(139,150,167,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", fontStyle: "italic" }}>
              Trust Before You Commit
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <GlowIcon key={label} href={href} label={label}>
                  <Icon />
                </GlowIcon>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 
