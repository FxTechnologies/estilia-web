"use client";
import { Search, MapPin, ChevronDown, Star, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Barbería", "Salón de belleza", "Uñas", "Spa", "Maquillaje", "Masajes", "Pestañas", "Cejas"];

// Dark-theme phone mockup reflecting the current pro dashboard
function AppMockup() {
  return (
    <div className="relative w-64 mx-auto select-none">
      {/* Glow behind phone */}
      <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-30 scale-90"
           style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }} />

      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
           style={{ border: "6px solid #1c1622", background: "#1c1622", aspectRatio: "9/19" }}>

        {/* Screen — dark purple theme */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden flex flex-col"
             style={{ background: "#1c1622" }}>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
            <span className="text-[9px] font-bold text-white/60">9:41</span>
            <div className="w-16 h-3.5 rounded-full" style={{ background: "#261d34" }} />
            <div className="flex gap-1">
              <div className="w-3 h-2 rounded-sm bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Header */}
          <div className="px-4 pt-2 pb-3 flex items-center justify-between shrink-0">
            <div>
              <p className="text-[9px]" style={{ color: "#9d8ab0" }}>Buenos días</p>
              <p className="text-sm font-bold" style={{ color: "#ffffff", fontFamily: "serif" }}>Ana López ✨</p>
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                 style={{ background: "#875aa0" }}>AL</div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-1.5 px-3 mb-3 shrink-0">
            {[
              { label: "Hoy", value: "6" },
              { label: "Pendientes", value: "2" },
              { label: "Ingresos", value: "L3.2K" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-2 text-center"
                   style={{ background: "#261d34", border: "1px solid #3d2f52" }}>
                <div className="text-xs font-bold" style={{ color: "#875aa0" }}>{value}</div>
                <div className="text-[8px]" style={{ color: "#6b5585" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Agenda label */}
          <div className="px-4 mb-2 shrink-0">
            <p className="text-[9px] font-semibold" style={{ color: "#9d8ab0" }}>AGENDA DE HOY</p>
          </div>

          {/* Appointment cards */}
          {[
            { time: "10:00", client: "Sofía M.", service: "Corte + color", color: "#22c55e" },
            { time: "11:30", client: "Roberto E.", service: "Barba completa", color: "#d3b87f" },
            { time: "14:00", client: "Valeria F.", service: "Maquillaje",    color: "#875aa0" },
          ].map(({ time, client, service, color }) => (
            <div key={time} className="mx-3 mb-2 flex items-center gap-2 p-2.5 rounded-xl shrink-0"
                 style={{ background: "#261d34", border: "1px solid #3d2f52" }}>
              <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: color }} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold truncate" style={{ color: "#fff" }}>{client}</div>
                <div className="text-[8px]" style={{ color: "#6b5585" }}>{service}</div>
              </div>
              <div className="text-[9px] font-bold shrink-0" style={{ color: "#d3b87f" }}>{time}</div>
            </div>
          ))}

          {/* Bottom bar */}
          <div className="mt-auto mx-3 mb-3 py-2 rounded-xl text-center text-[10px] font-bold text-white shrink-0"
               style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
            L 18,400 esta semana
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-10 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-[#e8d8f5]">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
             style={{ background: "#f5eefb" }}>
          <CheckCircle size={13} style={{ color: "#875aa0" }} />
        </div>
        <div>
          <div className="text-[9px] font-bold" style={{ color: "#1c1622" }}>Cita confirmada</div>
          <div className="text-[8px]" style={{ color: "#6b5585" }}>Hoy · 10:00 AM</div>
        </div>
      </div>

      <div className="absolute -right-8 bottom-28 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-[#e8d8f5]">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
             style={{ background: "#fff8ec" }}>
          <Star size={12} fill="#d3b87f" stroke="none" />
        </div>
        <div>
          <div className="text-[9px] font-bold" style={{ color: "#1c1622" }}>4.9 ★ rating</div>
          <div className="text-[8px]" style={{ color: "#6b5585" }}>128 reseñas</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity]   = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city) params.set("ciudad", city);
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12"
             style={{ background: "radial-gradient(ellipse 100% 70% at 60% 0%, #f5eefb 0%, #ffffff 65%)" }}>

      {/* Blobs */}
      <div className="absolute top-32 left-[5%] w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
           style={{ background: "#875aa0" }} />
      <div className="absolute bottom-16 right-[5%] w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
           style={{ background: "#d3b87f" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-6
                          text-[#875aa0] border-[#c4a4d8] bg-[#f5eefb]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#875aa0] animate-pulse" />
            Disponible en Honduras
          </div>

          <h1 className="font-serif font-semibold leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1c1622" }}>
            Reserva servicios de{" "}
            <span className="text-gradient">belleza y bienestar</span>
            {" "}al instante
          </h1>

          <p className="text-base md:text-lg font-light max-w-lg mx-auto lg:mx-0 mb-8"
             style={{ color: "#6b5585", lineHeight: 1.7 }}>
            Conectamos a los mejores profesionales de Honduras con clientes que valoran su tiempo y su estilo.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch max-w-xl mx-auto lg:mx-0
                          bg-white rounded-2xl shadow-xl shadow-[#875aa0]/10 border border-[#e8d8f5] overflow-hidden">
            <div className="flex items-center gap-3 flex-1 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[#e8d8f5]">
              <Search size={17} className="shrink-0" style={{ color: "#875aa0" }} />
              <input className="w-full text-sm outline-none bg-transparent placeholder:text-[#9d8ab0]"
                     style={{ color: "#1c1622" }} placeholder="Servicio o profesional..."
                     value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="flex items-center gap-3 sm:w-36 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-[#e8d8f5]">
              <MapPin size={17} className="shrink-0" style={{ color: "#d3b87f" }} />
              <input className="w-full text-sm outline-none bg-transparent placeholder:text-[#9d8ab0]"
                     style={{ color: "#1c1622" }} placeholder="Ciudad"
                     value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <button type="submit" className="shine m-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #875aa0 0%, #4a2970 100%)" }}>
              Buscar
            </button>
          </form>

          {/* Category chips */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
            {CATEGORIES.map(c => (
              <a key={c} href={`/buscar?categoria=${encodeURIComponent(c)}`}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
                                 hover:bg-[#f5eefb] hover:border-[#875aa0] hover:text-[#875aa0]
                                 border-[#e8d8f5] text-[#6b5585] bg-white">
                {c}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8 mt-8 pt-6 border-t border-[#e8d8f5]">
            {[
              { value: "+500", label: "Profesionales" },
              { value: "5",   label: "Ciudades" },
              { value: "+8K", label: "Citas reservadas" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div className="font-serif font-semibold text-2xl" style={{ color: "#875aa0" }}>{value}</div>
                <div className="text-xs font-medium" style={{ color: "#6b5585" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dark-theme app mockup */}
        <div className="hidden lg:flex justify-center items-center">
          <AppMockup />
        </div>
      </div>

      <a href="#negocios" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity">
        <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#875aa0" }}>Explorar</span>
        <ChevronDown size={14} style={{ color: "#875aa0" }} />
      </a>
    </section>
  );
}
