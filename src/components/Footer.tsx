export function Footer() {
  return (
    <footer style={{
      width: "100%",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#00D4FF" strokeWidth="1.5" />
            <path d="M9 14L13 18L19 10" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#F5F7FA" }}>VERIS</span>
        </div>

        <span style={{ fontSize: 13, color: "#8B96A7", textAlign: "center" }}>
          Trust Infrastructure for the Agent Economy.
        </span>

        <span style={{ fontSize: 12, color: "rgba(139,150,167,0.5)" }}>
          © 2026 VERIS. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
