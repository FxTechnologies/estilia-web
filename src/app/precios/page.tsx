import { Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Precios",
  description: "Planes para profesionales de belleza y bienestar en Honduras. Empieza gratis.",
};

const PLANS = [
  {
    name: "Básico",
    price: "Gratis",
    sub: "Para siempre",
    description: "Ideal para comenzar a usar Estilia y recibir tus primeras reservas.",
    cta: "Empezar gratis",
    ctaHref: "https://apps.apple.com/app/estilia",
    highlight: false,
    features: [
      "Perfil profesional en Estilia",
      "Hasta 20 citas por mes",
      "Agenda básica",
      "Notificaciones por WhatsApp",
      "1 foto de portada",
    ],
  },
  {
    name: "Pro",
    price: "L 399",
    sub: "por mes",
    description: "Para profesionales que quieren crecer y destacar en la plataforma.",
    cta: "Comenzar prueba gratis",
    ctaHref: "https://apps.apple.com/app/estilia",
    highlight: true,
    features: [
      "Todo lo del plan Básico",
      "Citas ilimitadas",
      "Perfil destacado en búsquedas",
      "Galería de hasta 20 fotos",
      "Recordatorios automáticos a clientes",
      "Estadísticas de negocio",
      "Soporte prioritario",
    ],
  },
  {
    name: "Premium",
    price: "L 799",
    sub: "por mes",
    description: "Para salones, spas y negocios con múltiples profesionales.",
    cta: "Contactar ventas",
    ctaHref: "mailto:hola@esstiliapp.com",
    highlight: false,
    features: [
      "Todo lo del plan Pro",
      "Hasta 5 perfiles de profesionales",
      "Badge Premium en el listado",
      "Posición top en resultados",
      "Integración con redes sociales",
      "Reportes avanzados",
      "Manager de cuenta dedicado",
    ],
  },
];

export default function PreciosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 px-5 text-center" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #f5eefb, #fff)" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#875aa0" }}>Planes y Precios</p>
          <h1 className="font-serif font-semibold text-4xl md:text-5xl mb-5" style={{ color: "#1c1622" }}>
            Invierte en tu negocio,<br />
            <span style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              nosotros hacemos el resto
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6b5585" }}>
            Sin comisiones por cita. Paga solo la suscripción mensual y quédate con el 100% de tus ingresos.
          </p>
        </section>

        {/* Plans */}
        <section id="precios" className="py-16 px-5" style={{ background: "#fff" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map(({ name, price, sub, description, cta, ctaHref, highlight, features }) => (
              <div key={name}
                   className={`rounded-3xl overflow-hidden border flex flex-col ${highlight ? "shadow-2xl shadow-[#875aa0]/20 scale-105" : "shadow-sm"}`}
                   style={{ borderColor: highlight ? "#875aa0" : "#e8d8f5", background: highlight ? "#1c1622" : "#fff" }}>
                {highlight && (
                  <div className="text-center py-2 text-xs font-bold tracking-widest uppercase"
                       style={{ background: "#875aa0", color: "#fff" }}>
                    Más popular
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-sm font-bold mb-1" style={{ color: highlight ? "#d3b87f" : "#875aa0" }}>{name}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-serif font-semibold text-4xl" style={{ color: highlight ? "#fff" : "#1c1622" }}>{price}</span>
                    {price !== "Gratis" && <span className="text-sm" style={{ color: highlight ? "#9d8ab0" : "#6b5585" }}>/{sub.replace("por ", "")}</span>}
                  </div>
                  {price === "Gratis" && <span className="text-sm mb-1" style={{ color: highlight ? "#9d8ab0" : "#6b5585" }}>{sub}</span>}
                  <p className="text-xs mt-2 mb-6" style={{ color: highlight ? "#9d8ab0" : "#6b5585" }}>{description}</p>

                  <ul className="space-y-3 flex-1 mb-7">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: highlight ? "#d3b87f" : "#875aa0" }} />
                        <span className="text-xs" style={{ color: highlight ? "#e8d8f5" : "#6b5585" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={ctaHref}
                     className="block text-center text-sm font-bold py-3 px-6 rounded-full transition-all hover:opacity-90"
                     style={highlight
                       ? { background: "linear-gradient(135deg,#875aa0,#4a2970)", color: "#fff" }
                       : { background: "#f5eefb", color: "#875aa0" }}>
                    {cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-10" style={{ color: "#9d8ab0" }}>
            Precios en Lempiras hondureños (HNL). IVA incluido. Cancela cuando quieras.
          </p>
        </section>

        {/* FAQ snippet */}
        <section className="py-16 px-5 max-w-2xl mx-auto">
          <h2 className="font-serif font-semibold text-2xl text-center mb-10" style={{ color: "#1c1622" }}>Preguntas frecuentes</h2>
          {[
            { q: "¿Cobran comisión por cada cita?", a: "No. Paga solo la suscripción mensual y el 100% de tus ingresos son tuyos." },
            { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, puedes cancelar tu suscripción cuando quieras desde la app, sin penalizaciones." },
            { q: "¿Hay prueba gratis del plan Pro?", a: "Sí, tienes 14 días de prueba gratuita al suscribirte al plan Pro por primera vez." },
            { q: "¿Cómo me pagan mis clientes?", a: "Los clientes te pagan directamente a ti (efectivo, transferencia, etc.). Estilia no intermedia el pago." },
          ].map(({ q, a }) => (
            <details key={q} className="border-b border-[#e8d8f5] py-5 group">
              <summary className="cursor-pointer text-sm font-semibold list-none flex justify-between items-center"
                       style={{ color: "#1c1622" }}>
                {q}
                <span className="text-[#875aa0] ml-2 shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed" style={{ color: "#6b5585" }}>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
