import { Check, ArrowRight } from "lucide-react";

const FEATURES = [
  "Perfil profesional verificado con fotos y servicios",
  "Sistema de reservas en línea las 24 horas",
  "Reseñas auténticas para construir reputación",
  "Notificaciones automáticas para clientes",
  "Estadísticas de visitas y rendimiento",
  "Soporte prioritario en español",
];

export function ForBusiness() {
  return (
    <section id="para-negocios" style={{ background: "var(--surface-beige)", padding: "clamp(56px,8vw,96px) clamp(18px,4vw,40px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--gold-600)", marginBottom: 16 }}>
            Para negocios
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.9rem,3.4vw,2.8rem)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink-900)", margin: "0 0 20px" }}>
            Lleva tu negocio<br />al siguiente nivel
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--ink-600)", lineHeight: 1.65, margin: "0 0 32px" }}>
            Únete a más de 320 profesionales que ya usan Estilia para conectar con nuevos clientes y hacer crecer su negocio en Honduras.
          </p>
          <a href="/login" className="forbiz-btn">
            Registrar mi negocio gratis
            <ArrowRight size={16} />
          </a>
        </div>
        <div style={{ background: "var(--surface-card)", border: "1.5px solid var(--border-gold)", borderRadius: 24, padding: 32, boxShadow: "var(--shadow-lg)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--ink-900)", marginBottom: 24 }}>¿Qué incluye?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FEATURES.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <Check size={16} color="var(--brand)" />
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--ink-700)", lineHeight: 1.45 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, padding: "16px 20px", background: "var(--surface-plum)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-500)", fontWeight: 500 }}>Precio de lanzamiento</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--brand)" }}>Gratis</div>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-500)", maxWidth: 140, textAlign: "right" as const }}>Sin comisiones durante los primeros 6 meses</div>
          </div>
        </div>
      </div>
    </section>
  );
}
