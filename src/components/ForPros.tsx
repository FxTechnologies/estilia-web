import { TrendingUp, Calendar, Bell, Image } from "lucide-react";

const PERKS = [
  { icon: Calendar, title: "Agenda inteligente",   desc: "Gestiona todas tus citas desde un solo panel. Sin papel, sin confusión." },
  { icon: TrendingUp, title: "Más visibilidad",    desc: "Tu perfil llega a clientes que buscan exactamente lo que ofreces." },
  { icon: Bell, title: "Notificaciones al instante", desc: "Recibe alertas de nuevas reservas, cancelaciones y recordatorios." },
  { icon: Image, title: "Portafolio y promociones", desc: "Publica tus trabajos y crea descuentos para atraer y fidelizar clientes." },
];

export function ForPros() {
  return (
    <section id="para-profesionales" className="py-24 px-5 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — visual card mockup */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          {/* Background blob */}
          <div className="absolute inset-0 rounded-3xl opacity-30 blur-2xl"
               style={{ background: "radial-gradient(circle, #875aa0 0%, transparent 70%)" }} />

          <div className="relative w-full max-w-sm rounded-3xl border border-[#e8d8f5] bg-white shadow-2xl p-6 space-y-4">
            {/* Dashboard header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#6b5585" }}>Hola, María 👋</p>
                <p className="font-serif font-semibold text-lg" style={{ color: "#1c1622" }}>Tu agenda de hoy</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                   style={{ background: "#875aa0" }}>M</div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Citas hoy", value: "6" },
                { label: "Pendientes", value: "2" },
                { label: "Ingresos",   value: "L 3,200" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-3 text-center border border-[#e8d8f5]" style={{ background: "#f5eefb" }}>
                  <div className="font-bold text-base" style={{ color: "#875aa0" }}>{value}</div>
                  <div className="text-[10px] font-medium mt-0.5" style={{ color: "#6b5585" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Appointment cards */}
            {[
              { time: "10:00", client: "Ana López",    service: "Corte + color",  status: "Confirmada", statusColor: "#22c55e" },
              { time: "11:30", client: "Carlos Reyes", service: "Barba completa", status: "Pendiente",  statusColor: "#f59e0b" },
            ].map(({ time, client, service, status, statusColor }) => (
              <div key={time} className="flex items-center gap-3 p-3 rounded-xl border border-[#e8d8f5]">
                <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: statusColor }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate" style={{ color: "#1c1622" }}>{client}</div>
                  <div className="text-xs" style={{ color: "#6b5585" }}>{service}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold" style={{ color: "#1c1622" }}>{time}</div>
                  <div className="text-[10px] font-semibold" style={{ color: statusColor }}>{status}</div>
                </div>
              </div>
            ))}

            {/* Income badge */}
            <div className="flex items-center justify-between rounded-xl px-4 py-3"
                 style={{ background: "linear-gradient(135deg, #875aa0, #4a2970)" }}>
              <span className="text-xs font-medium text-white/80">Esta semana</span>
              <span className="text-white font-bold text-sm">L 18,400 generados</span>
            </div>
          </div>
        </div>

        {/* Right — copy */}
        <div className="order-1 lg:order-2 space-y-6">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#875aa0" }}>
            Para Profesionales
          </p>
          <h2 className="font-serif font-semibold text-4xl md:text-5xl leading-tight" style={{ color: "#1c1622" }}>
            Haz crecer tu negocio con{" "}
            <span className="text-gradient">Estilia</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#6b5585" }}>
            Únete a la plataforma que conecta a los mejores profesionales de belleza con clientes que ya están buscando tus servicios.
          </p>

          <div className="space-y-4">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                     style={{ background: "#f5eefb" }}>
                  <Icon size={18} style={{ color: "#875aa0" }} />
                </div>
                <div>
                  <div className="text-sm font-bold mb-0.5" style={{ color: "#1c1622" }}>{title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: "#6b5585" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="#"
               className="shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg transition-all hover:opacity-90"
               style={{ background: "linear-gradient(135deg, #875aa0 0%, #4a2970 100%)" }}>
              Unirme como profesional
            </a>
            <a href="#"
               className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all hover:bg-[#f5eefb]"
               style={{ color: "#875aa0", borderColor: "#c4a4d8" }}>
              Ver demostración
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
