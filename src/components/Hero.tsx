"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, BadgeCheck, Star } from "lucide-react";

const CHIPS = ["Barbería", "Uñas", "Spa", "Maquillaje", "Masajes", "Pestañas"];
const HERO_IMAGE = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80&auto=format&fit=crop";

export function Hero() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [city, setCity] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (service) p.set("q", service);
    if (city) p.set("ciudad", city);
    router.push(`/buscar?${p.toString()}`);
  }

  return (
    <section style={{ position: "relative", minHeight: 640, display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img src={HERO_IMAGE} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(102deg,rgba(42,24,56,0.88),rgba(42,24,56,0.44) 52%,rgba(42,24,56,0.64))" }} />

      <div className="fade-up" style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,10vw,140px) clamp(18px,4vw,40px)" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--gold-300)", display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <Star size={14} fill="var(--gold-300)" stroke="none" />
          Belleza · Bienestar · Honduras
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", fontSize: "clamp(2.6rem,5.4vw,4.5rem)", margin: "0 0 18px", maxWidth: "18ch" }}>
          Reserva belleza y bienestar en minutos.
        </h1>

        <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(16px,1.6vw,19px)", color: "rgba(255,255,255,0.84)", margin: "0 0 36px", maxWidth: "48ch", lineHeight: 1.55 }}>
          Descubre, compara y agenda con los mejores profesionales verificados cerca de ti. Recordatorios por WhatsApp.
        </p>

        <form onSubmit={handleSearch} className="hero-search" style={{ background: "#fff", borderRadius: 20, boxShadow: "var(--shadow-xl)", padding: 8, display: "flex", flexWrap: "wrap" as const, alignItems: "stretch", gap: 2, maxWidth: 800 }}>
          <label style={{ flex: "2 1 200px", minWidth: 160, display: "flex", flexDirection: "column" as const, gap: 3, padding: "9px 16px", borderRadius: 14, cursor: "text" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--ink-500)" }}>Servicio</span>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Search size={17} color="var(--brand)" style={{ flexShrink: 0 }} />
              <input value={service} onChange={e => setService(e.target.value)} placeholder="Barbería, uñas, spa…"
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 15, color: "var(--ink-900)", width: "100%", fontFamily: "var(--font-sans)" }} />
            </div>
          </label>

          <span className="hero-search-sep" style={{ width: 1, alignSelf: "center", height: 40, background: "var(--border-subtle)" }} />

          <label style={{ flex: "1 1 140px", minWidth: 130, display: "flex", flexDirection: "column" as const, gap: 3, padding: "9px 16px", borderRadius: 14, cursor: "pointer" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--ink-500)" }}>Ubicación</span>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <MapPin size={17} color="var(--brand)" style={{ flexShrink: 0 }} />
              <input value={city} onChange={e => setCity(e.target.value)} list="es-cities" placeholder="Ciudad"
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 15, color: "var(--ink-900)", width: "100%", fontFamily: "var(--font-sans)" }} />
            </div>
          </label>

          <datalist id="es-cities">
            {["Tegucigalpa","San Pedro Sula","La Ceiba","Roatán","Comayagua"].map(c => <option key={c} value={c} />)}
          </datalist>

          <button type="submit" style={{ flex: "0 0 auto", alignSelf: "stretch", minHeight: 58, padding: "0 28px", border: "none", borderRadius: 14, background: "var(--brand)", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15.5, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9, boxShadow: "var(--shadow-brand)" }}>
            <Search size={18} /> Buscar
          </button>
        </form>

        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" as const }}>
          {CHIPS.map(c => (
            <button key={c} onClick={() => router.push(`/buscar?q=${encodeURIComponent(c)}`)}
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 999, padding: "7px 15px", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 26, flexWrap: "wrap" as const, color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <BadgeCheck size={16} color="var(--gold-300)" /> +320 profesionales verificados
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Star size={16} fill="var(--gold-300)" stroke="none" /> 4.9 calificación promedio
          </span>
        </div>
      </div>
    </section>
  );
}
