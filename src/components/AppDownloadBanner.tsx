export function AppDownloadBanner() {
  return (
    <section id="app" style={{ background: "linear-gradient(135deg, var(--plum-900) 0%, var(--plum-700) 60%, var(--plum-600) 100%)", padding: "clamp(64px,10vw,112px) clamp(18px,4vw,40px)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(135,90,160,0.18)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "rgba(194,161,92,0.10)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", position: "relative" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--gold-400)", marginBottom: 16 }}>
            Descarga la app
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
            Reserva tu cita<br />desde tu bolsillo
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, margin: "0 0 36px", maxWidth: 440 }}>
            Descarga Estilia y encuentra los mejores profesionales de belleza y bienestar cerca de ti. Agenda, paga y listo.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "var(--ink-900)", padding: "12px 22px", borderRadius: 14, textDecoration: "none", fontFamily: "var(--font-sans)", boxShadow: "0 4px 14px rgba(0,0,0,.25)", transition: "transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div>
                <div style={{ fontSize: 10, fontWeight: 500, color: "var(--ink-500)", lineHeight: 1 }}>Disponible en</div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", padding: "12px 22px", borderRadius: 14, textDecoration: "none", fontFamily: "var(--font-sans)", transition: "transform .2s, background .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5v-17c0-1.1.89-2,2-2l11,8.5-11,8.5C3.89,22.5,3,21.6,3,20.5z M21,12l-4,3.07L5,22c.44.3.99.47,1.57.43l13.12-7.59C20.75,14.38,21,13.73,21,13V11c0-.73-.25-1.38-.71-1.84L7.57 1.57C6.99 1.53 6.44 1.7 6 2l11 10-4 3.07z"/></svg>
              <div>
                <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.65)", lineHeight: 1 }}>Disponible en</div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 220, height: 400, borderRadius: 36, background: "rgba(255,255,255,0.10)", border: "2px solid rgba(255,255,255,0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#fff" }}>Estilia</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Tu app de bienestar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
