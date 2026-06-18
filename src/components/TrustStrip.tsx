const STATS = [
  { value: "+320", label: "Profesionales" },
  { value: "5",    label: "Ciudades" },
  { value: "+8K",  label: "Citas reservadas" },
  { value: "4.9★", label: "Calificación promedio" },
];

export function TrustStrip() {
  return (
    <section style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "26px clamp(18px,4vw,40px)", display: "flex", flexWrap: "wrap" as const, gap: "20px 56px", alignItems: "center", justifyContent: "center" }}>
        {STATS.map(({ value, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 2 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem,2.6vw,2.3rem)", fontWeight: 700, color: "var(--ink-900)", lineHeight: 1, letterSpacing: "-0.01em" }}>{value}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--ink-500)", letterSpacing: "0.02em" }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
