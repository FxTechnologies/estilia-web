import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sofía Ramírez", role: "Cliente frecuente", avatar: "SR", comment: "Encontré a mi estilista favorita a través de Estilia. El proceso de reserva es increíblemente fácil y los profesionales son de primera calidad.", rating: 5, service: "Corte & Color" },
  { name: "Carlos Medina", role: "Cliente verificado", avatar: "CM", comment: "Llevaba meses buscando un buen barbero. En menos de 2 minutos encontré Studio 21 y quedé fascinado con el resultado. Muy recomendado.", rating: 5, service: "Barbería clásica" },
  { name: "Andrea López", role: "Cliente frecuente", avatar: "AL", comment: "La app es hermosa y funciona perfecto. Reservé un masaje de spa para mi mamá y quedó encantada. Sin duda la mejor plataforma de belleza en Honduras.", rating: 5, service: "Spa & Masajes" },
];

export function Testimonials() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(18px,4vw,40px)" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--gold-600)", marginBottom: 8 }}>
          Lo que dicen nuestros usuarios
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink-900)", margin: 0, fontSize: "clamp(1.9rem,3.4vw,2.8rem)" }}>
          Experiencias reales
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
        {TESTIMONIALS.map(({ name, role, avatar, comment, rating, service }) => (
          <div key={name} style={{ background: "var(--surface-card)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: rating }).map((_, i) => <Star key={i} size={15} fill="var(--star)" color="var(--star)" />)}
            </div>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic", color: "var(--ink-800)", lineHeight: 1.55, fontWeight: 500 }}>
              "{comment}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {avatar}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>{name}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-400)" }}>{role} · {service}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
