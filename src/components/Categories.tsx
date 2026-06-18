const CATS = [
  { label: "Barbería",         count: "48 pros", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80&auto=format&fit=crop", q: "Barbería" },
  { label: "Salón de belleza", count: "62 pros", img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80&auto=format&fit=crop", q: "Salón de belleza" },
  { label: "Uñas",             count: "35 pros", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop", q: "Uñas" },
  { label: "Spa",              count: "29 pros", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80&auto=format&fit=crop", q: "Spa" },
  { label: "Maquillaje",       count: "41 pros", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80&auto=format&fit=crop", q: "Maquillaje" },
  { label: "Masajes",          count: "22 pros", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80&auto=format&fit=crop", q: "Masajes" },
  { label: "Pestañas",         count: "18 pros", img: "https://images.unsplash.com/photo-1583001308675-a5a0b1ff0fb9?w=400&q=80&auto=format&fit=crop", q: "Pestañas" },
  { label: "Cejas",            count: "27 pros", img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80&auto=format&fit=crop", q: "Cejas" },
];

export function Categories() {
  return (
    <section id="categorias" style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(18px,4vw,40px)" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--gold-600)", marginBottom: 8 }}>
          Explora por categoría
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink-900)", margin: 0, fontSize: "clamp(1.9rem,3.4vw,2.8rem)" }}>
          ¿Qué te apetece hoy?
        </h2>
      </div>
      <div className="cat-grid">
        {CATS.map(({ label, count, img, q }) => (
          <a key={label} href={`/buscar?q=${encodeURIComponent(q)}`} className="cat-card">
            <img src={img} alt={label} className="cat-img" />
            <div className="cat-overlay" />
            <div className="cat-text">
              <div className="cat-label">{label}</div>
              <div className="cat-count">{count}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
