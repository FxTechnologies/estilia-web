import { Search, CalendarCheck, Star } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Encuentra tu profesional",
    desc: "Busca por categoría, ciudad o nombre. Lee perfiles, fotos de portafolio y reseñas reales de clientes.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Reserva en segundos",
    desc: "Elige el servicio, fecha y hora que te convengan. Sin llamadas, sin esperas — 100% desde la app.",
  },
  {
    icon: Star,
    step: "03",
    title: "Disfruta y comparte",
    desc: "Ve a tu cita y al terminar deja tu reseña para ayudar a la comunidad. ¡Tu próxima cita ya te espera!",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-5" style={{ background: "#f5eefb" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#875aa0" }}>
            ¿Cómo funciona?
          </p>
          <h2 className="font-serif font-semibold text-4xl md:text-5xl" style={{ color: "#1c1622" }}>
            Tan simple como{" "}
            <span className="text-gradient">1, 2, 3</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px border-t-2 border-dashed border-[#c4a4d8]" />

          {STEPS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="relative flex flex-col items-center text-center gap-4">
              {/* Circle */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg z-10 relative"
                     style={{ background: "linear-gradient(135deg, #875aa0, #4a2970)" }}>
                  <Icon size={28} color="white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center
                                text-[10px] font-black text-white"
                     style={{ background: "#d3b87f" }}>
                  {step}
                </div>
              </div>
              <h3 className="font-serif font-semibold text-xl" style={{ color: "#1c1622" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b5585" }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="/buscar"
             className="shine inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm shadow-xl transition-all hover:opacity-90 hover:shadow-2xl"
             style={{ background: "linear-gradient(135deg, #875aa0 0%, #4a2970 100%)" }}>
            Reservar mi primera cita
          </a>
        </div>
      </div>
    </section>
  );
}
