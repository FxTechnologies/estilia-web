"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLogo } from "./NavLogo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8d8f5]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo — animated mark + wordmark */}
        <a href="#" className="flex items-center gap-3">
          <NavLogo />
          <span className="font-serif text-2xl font-semibold" style={{ color: "#1c1622" }}>
            Estilia
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#servicios" className="text-sm font-medium text-[#6b5585] hover:text-[#875aa0] transition-colors">Servicios</a>
          <a href="/#para-profesionales" className="text-sm font-medium text-[#6b5585] hover:text-[#875aa0] transition-colors">Para Profesionales</a>
          <a href="/precios" className="text-sm font-medium text-[#6b5585] hover:text-[#875aa0] transition-colors">Precios</a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://apps.apple.com/app/estilia" target="_blank" rel="noopener noreferrer"
             className="text-sm font-semibold text-[#875aa0] hover:text-[#4a2970] transition-colors px-4 py-2">
            Iniciar sesión
          </a>
          <a href="/buscar"
             className="shine text-sm font-bold text-white px-5 py-2.5 rounded-full transition-all hover:opacity-90 hover:shadow-lg"
             style={{ background: "linear-gradient(135deg, #875aa0 0%, #4a2970 100%)" }}>
            Reservar ahora
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2 text-[#875aa0]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e8d8f5] px-5 py-4 flex flex-col gap-4">
          <a href="/#servicios" className="text-sm font-medium text-[#6b5585]" onClick={() => setOpen(false)}>Servicios</a>
          <a href="/#para-profesionales" className="text-sm font-medium text-[#6b5585]" onClick={() => setOpen(false)}>Para Profesionales</a>
          <a href="/precios" className="text-sm font-medium text-[#6b5585]" onClick={() => setOpen(false)}>Precios</a>
          <hr className="border-[#e8d8f5]" />
          <a href="https://apps.apple.com/app/estilia" target="_blank" rel="noopener noreferrer"
             className="text-sm font-semibold text-[#875aa0]">Iniciar sesión</a>
          <a href="/buscar"
             className="text-center text-sm font-bold text-white px-5 py-3 rounded-full"
             style={{ background: "linear-gradient(135deg, #875aa0 0%, #4a2970 100%)" }}>
            Reservar ahora
          </a>
        </div>
      )}
    </header>
  );
}
