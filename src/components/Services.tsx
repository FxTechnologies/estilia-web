import { Scissors, Star, Sparkles, Wind, Smile, Zap, Eye, Edit3 } from "lucide-react";

const SERVICES = [
  { icon: Scissors, label: "Barbería",        desc: "Cortes y barba de precisión",   color: "#875aa0" },
  { icon: Star,     label: "Salón de belleza", desc: "Color, cortes y tratamientos", color: "#d3b87f" },
  { icon: Sparkles, label: "Uñas",             desc: "Manicure, pedicure y nail art", color: "#875aa0" },
  { icon: Wind,     label: "Spa",              desc: "Relajación y bienestar total", color: "#d3b87f" },
  { icon: Smile,    label: "Maquillaje",       desc: "Looks para cada ocasión",       color: "#875aa0" },
  { icon: Zap,      label: "Masajes",          desc: "Terapéuticos y relajantes",     color: "#d3b87f" },
  { icon: Eye,      label: "Pestañas",         desc: "Extensions y lifting",          color: "#875aa0" },
  { icon: Edit3,    label: "Cejas",            desc: "Diseño y microblading",         color: "#d3b87f" },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 px-5" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#875aa0" }}>
            Servicios
          </p>
          <h2 className="font-serif font-semibold text-4xl md:text-5xl mb-4" style={{ color: "#1c1622" }}>
            Todo lo que necesitas,<br />
            <span className="text-gradient">en un solo lugar</span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6b5585" }}>
            Explora cientos de profesionales verificados en cada categoría.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ icon: Icon, label, desc, color }) => (
            <button key={label}
                    className="group flex flex-col items-start gap-3 p-5 rounded-2xl border text-left
                               bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                               border-[#e8d8f5] hover:border-[#c4a4d8]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                   style={{ background: `${color}18` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <div className="text-sm font-bold mb-0.5" style={{ color: "#1c1622" }}>{label}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#6b5585" }}>{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
