import { Smartphone } from "lucide-react";

function AppleLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.28.07 2.17.63 2.93.68.97-.17 1.89-.75 3-.82 1.99-.11 3.49.8 4.33 2.19-3.86 2.37-2.95 7.56.74 9.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1.2 0 1.5L4.5 21c-.5.33-1.5.33-1.5-.5z"/>
    </svg>
  );
}

export function AppDownload() {
  return (
    <section className="py-24 px-5" style={{ background: "#ffffff" }}>
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden px-8 py-16 md:py-20 text-center"
             style={{ background: "linear-gradient(135deg, #1c1622 0%, #3d2152 50%, #4a2970 100%)" }}>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3 pointer-events-none"
               style={{ background: "#875aa0" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 translate-y-1/3 -translate-x-1/3 pointer-events-none"
               style={{ background: "#d3b87f" }} />

          {/* Icon */}
          <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
               style={{ background: "rgba(255,255,255,0.1)" }}>
            <Smartphone size={30} color="#d3b87f" />
          </div>

          <p className="relative z-10 text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#c4a4d8" }}>
            Descarga la app
          </p>
          <h2 className="relative z-10 font-serif font-semibold text-3xl md:text-5xl text-white mb-4 leading-tight">
            Tu tiempo, tu estilo.{" "}
            <span style={{ color: "#d3b87f" }}>En tu bolsillo.</span>
          </h2>
          <p className="relative z-10 text-sm md:text-base max-w-md mx-auto mb-10" style={{ color: "#c4a4d8" }}>
            Reserva, gestiona y descubre profesionales desde cualquier lugar. Disponible pronto en iOS y Android.
          </p>

          {/* Store buttons — always side by side */}
          <div className="relative z-10 inline-flex items-center justify-center gap-3 mx-auto">
            <a href="#"
               className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
              <AppleLogo />
              <div className="text-left">
                <div className="text-[10px] text-white/60 leading-none mb-0.5">Próximamente en</div>
                <div className="text-sm font-bold text-white leading-none">App Store</div>
              </div>
            </a>

            <a href="#"
               className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
              <PlayLogo />
              <div className="text-left">
                <div className="text-[10px] text-white/60 leading-none mb-0.5">Próximamente en</div>
                <div className="text-sm font-bold text-white leading-none">Google Play</div>
              </div>
            </a>
          </div>

          <p className="relative z-10 text-xs mt-8" style={{ color: "#9d8ab0" }}>
            Más de{" "}
            <span style={{ color: "#d3b87f" }}>8,000 citas</span>{" "}
            ya se han agendado en Estilia.
          </p>
        </div>
      </div>
    </section>
  );
}
