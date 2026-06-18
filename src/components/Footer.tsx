"use client";

const LINKS = {
  "Plataforma": [
    { label: "Explorar profesionales", href: "/buscar" },
    { label: "Categorías", href: "/#categorias" },
    { label: "Cómo funciona", href: "/#app" },
    { label: "Descargar app", href: "/#app" },
  ],
  "Para negocios": [
    { label: "Registrar negocio", href: "/login" },
    { label: "Dashboard pro", href: "/dashboard/pro" },
    { label: "Planes y precios", href: "/#para-negocios" },
  ],
  "Soporte": [
    { label: "Centro de ayuda", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Términos de uso", href: "#" },
    { label: "Privacidad", href: "#" },
  ],
};

const CITIES = ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Comayagua", "Choluteca"];

export function Footer() {
  return (
    <footer style={{ background: "var(--ink-900)", color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px clamp(18px,4vw,40px) 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: 48, marginBottom: 48 }}>
          <div>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
                  <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
                </svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>Estilia</span>
            </a>
            <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 20, color: "rgba(255,255,255,0.55)", maxWidth: 260, margin: "0 0 20px" }}>
              El marketplace de belleza y bienestar de Honduras. Conectamos profesionales con clientes en segundos.
            </p>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold-400)", marginBottom: 10 }}>Ciudades disponibles</div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                {CITIES.map(c => (
                  <a key={c} href={`/buscar?ciudad=${c}`} style={{ fontSize: 12, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", padding: "4px 10px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,255,255,0.10)" }}>
                    {c}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--gold-400)", marginBottom: 16 }}>{col}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(({ label, href }) => (
                  <a key={label} href={href} style={{ fontSize: 14, color: "rgba(255,255,255,0.60)", textDecoration: "none", transition: "color .15s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.60)"; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 12 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.40)" }}>© 2026 Estilia · esstiliapp.com · Honduras</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.40)" }}>Hecho con ♥ en Honduras</div>
        </div>
      </div>
    </footer>
  );
}
