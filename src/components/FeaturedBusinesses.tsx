"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, CheckCircle, MapPin } from "lucide-react";

const FALLBACK: { id: string; name: string; category: string; city: string; rating: number; review_count: number; from_price: number; image_url: string; verified: boolean; premium: boolean }[] = [
  { id: "1", name: "Studio 21 Barbershop", category: "Barbería", city: "Tegucigalpa", rating: 4.9, review_count: 124, from_price: 250, image_url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80&auto=format&fit=crop", verified: true, premium: true },
  { id: "2", name: "Belleza Tica Salon", category: "Salón de belleza", city: "San Pedro Sula", rating: 4.8, review_count: 89, from_price: 180, image_url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80&auto=format&fit=crop", verified: true, premium: false },
  { id: "3", name: "Nail Art by Karen", category: "Uñas", city: "Tegucigalpa", rating: 4.9, review_count: 201, from_price: 320, image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&auto=format&fit=crop", verified: true, premium: true },
  { id: "4", name: "Serena Spa", category: "Spa & Masajes", city: "La Ceiba", rating: 4.7, review_count: 56, from_price: 450, image_url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80&auto=format&fit=crop", verified: true, premium: false },
  { id: "5", name: "Glam Makeup Studio", category: "Maquillaje", city: "Tegucigalpa", rating: 5.0, review_count: 43, from_price: 600, image_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80&auto=format&fit=crop", verified: true, premium: true },
];

function ProCard({ pro }: { pro: typeof FALLBACK[0] }) {
  return (
    <a href={`/pro/${pro.id}`} style={{ display: "block", textDecoration: "none", flexShrink: 0, width: 280, borderRadius: 18, overflow: "hidden", background: "var(--surface-card)", boxShadow: "var(--shadow-md)", transition: "transform .2s ease, box-shadow .2s ease", scrollSnapAlign: "start" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xl)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={pro.image_url} alt={pro.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {pro.premium && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "var(--gold-500)", color: "#2b1e0a", fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 800, padding: "3px 8px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Premium
          </div>
        )}
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-0.01em", lineHeight: 1.1 }}>{pro.name}</span>
              {pro.verified && <CheckCircle size={14} color="var(--brand)" />}
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>{pro.category}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={13} fill="var(--star)" color="var(--star)" />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--ink-800)" }}>{pro.rating.toFixed(1)}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-400)" }}>({pro.review_count})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--ink-500)" }}>
            <MapPin size={11} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12 }}>{pro.city}</span>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--ink-400)" }}>Desde </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--brand)" }}>L {pro.from_price}</span>
          </div>
          <div style={{ background: "var(--brand)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 999 }}>
            Ver perfil
          </div>
        </div>
      </div>
    </a>
  );
}

export function FeaturedBusinesses() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <section style={{ background: "var(--surface-beige)", padding: "clamp(56px,8vw,96px) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(18px,4vw,40px)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--gold-600)", marginBottom: 8 }}>
              Lo mejor de Estilia
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink-900)", margin: 0, fontSize: "clamp(1.9rem,3.4vw,2.8rem)" }}>
              Profesionales destacados
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ dir: -1, icon: <ChevronLeft size={18} /> }, { dir: 1, icon: <ChevronRight size={18} /> }].map(({ dir, icon }) => (
              <button key={dir} onClick={() => scroll(dir)}
                style={{ width: 40, height: 40, borderRadius: 999, border: "1.5px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-700)", transition: "background .15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--brand)"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-card)"; (e.currentTarget as HTMLElement).style.color = "var(--ink-700)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)"; }}>
                {icon}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} data-carousel="" style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8 }}>
          {FALLBACK.map(pro => <ProCard key={pro.id} pro={pro} />)}
        </div>
      </div>
    </section>
  );
}
