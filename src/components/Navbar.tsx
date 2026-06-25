"use client";
import { useState } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";

function AnimatedLogo() {
  return (
    <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`
        @keyframes estilia-line1 {
          0%,100% { stroke-dashoffset: 0; opacity: 1; }
          40%      { stroke-dashoffset: -36; opacity: 0; }
          41%      { stroke-dashoffset: 36; opacity: 0; }
          70%      { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes estilia-line2 {
          0%,100% { stroke-dashoffset: 0; opacity: 1; }
          50%      { stroke-dashoffset: -24; opacity: 0; }
          51%      { stroke-dashoffset: 24; opacity: 0; }
          78%      { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes estilia-line3 {
          0%,100% { stroke-dashoffset: 0; opacity: 1; }
          60%      { stroke-dashoffset: -36; opacity: 0; }
          61%      { stroke-dashoffset: 36; opacity: 0; }
          86%      { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes estilia-dot {
          0%,35%,100% { r: 5; opacity: 1; }
          50%          { r: 7; opacity: 0.7; }
          65%          { r: 3; opacity: 1; }
        }
        .estilia-l1 {
          stroke-dasharray: 36; stroke-dashoffset: 0;
          animation: estilia-line1 3.6s ease-in-out infinite;
        }
        .estilia-l2 {
          stroke-dasharray: 24; stroke-dashoffset: 0;
          animation: estilia-line2 3.6s ease-in-out 0.15s infinite;
        }
        .estilia-l3 {
          stroke-dasharray: 36; stroke-dashoffset: 0;
          animation: estilia-line3 3.6s ease-in-out 0.3s infinite;
        }
        .estilia-dot {
          animation: estilia-dot 3.6s ease-in-out infinite;
        }
      `}</style>
      <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
        <line className="estilia-l1" x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
        <line className="estilia-l2" x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
        <line className="estilia-l3" x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
        <circle className="estilia-dot" cx="53" cy="18" r="5" fill="#d3b87f"/>
      </svg>
    </div>
  );
}

const NAV = [
  { label: "Explorar",        href: "/buscar" },
  { label: "Categorías",      href: "/#categorias" },
  { label: "Para negocios",   href: "/#para-negocios" },
  { label: "App",             href: "/#app" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(250,247,252,0.88)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 clamp(18px,4vw,40px)",
        display: "flex", alignItems: "center", gap: 12, height: 72,
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <AnimatedLogo />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
            Estilia
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ alignItems: "center", gap: 2, marginLeft: 8, flex: 1, flexWrap: "wrap" }} className="hidden md:flex">
          {NAV.map(({ label, href }) => (
            <a key={label} href={href} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600,
              color: "var(--ink-700)", padding: "8px 12px", borderRadius: 8,
              textDecoration: "none", transition: "color .15s, background .15s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "var(--surface-muted)"; (e.target as HTMLElement).style.color = "var(--ink-900)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "var(--ink-700)"; }}>
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--surface-card)", border: "1px solid var(--border-default)",
            cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
            color: "var(--ink-800)", padding: "9px 14px", borderRadius: 999,
          }}>
            <MapPin size={15} color="var(--brand)" />
            Tegucigalpa
            <ChevronDown size={14} color="var(--ink-400)" />
          </button>
          <a href="/login" style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600,
            color: "var(--ink-800)", padding: "9px 12px", borderRadius: 8,
            textDecoration: "none",
          }}>
            Iniciar sesión
          </a>
          <a href="/login" style={{
            display: "inline-flex", alignItems: "center",
            background: "var(--brand)", color: "#fff", border: "none",
            cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 700,
            padding: "10px 20px", borderRadius: 999, textDecoration: "none",
            boxShadow: "var(--shadow-brand)",
          }}>
            Registrar negocio
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ marginLeft: "auto", padding: 8, background: "none", border: "none", cursor: "pointer", color: "var(--brand)" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border-subtle)", padding: "16px clamp(18px,4vw,40px)" }}>
          {NAV.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 0", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--ink-700)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "12px 0" }} />
          <a href="/login" onClick={() => setOpen(false)}
            style={{ display: "block", padding: "10px 0", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--ink-700)", textDecoration: "none" }}>
            Iniciar sesión
          </a>
          <a href="/login" onClick={() => setOpen(false)}
            style={{
              display: "block", marginTop: 8, textAlign: "center",
              background: "var(--brand)", color: "#fff", padding: "12px 20px",
              borderRadius: 999, fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700,
              textDecoration: "none",
            }}>
            Registrar negocio
          </a>
        </div>
      )}
    </header>
  );
}
