import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Clock } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

export const metadata = {
  title: "Blog",
  description: "Consejos de belleza, tendencias y novedades de Estilia en Honduras.",
};

const POSTS = [
  {
    slug: "como-elegir-tu-estilista",
    category: "Consejos",
    title: "Cómo elegir al estilista ideal para tu tipo de cabello",
    excerpt: "Encontrar al profesional correcto puede transformar tu experiencia. Te contamos qué buscar en un perfil antes de reservar.",
    date: "10 jun 2026",
    readTime: "4 min",
    color: "#875aa0",
  },
  {
    slug: "tendencias-belleza-2026",
    category: "Tendencias",
    title: "Las 5 tendencias de belleza que dominarán el 2026 en Honduras",
    excerpt: "Desde el balayage natural hasta el microblading de cejas, los estilos que están marcando la pauta en salones hondureños.",
    date: "5 jun 2026",
    readTime: "6 min",
    color: "#d3b87f",
  },
  {
    slug: "beneficios-reservar-cita-online",
    category: "Plataforma",
    title: "7 razones para reservar tu cita de belleza en línea",
    excerpt: "Desde evitar esperas hasta elegir con calma tu servicio — la reserva digital tiene ventajas que no imaginabas.",
    date: "28 may 2026",
    readTime: "3 min",
    color: "#4a2970",
  },
  {
    slug: "guia-profesionales-estilia",
    category: "Para profesionales",
    title: "Guía completa: cómo hacer crecer tu negocio con Estilia",
    excerpt: "Configura tu perfil, sube tu portafolio y empieza a recibir reservas desde el primer día. Todo lo que necesitas saber.",
    date: "20 may 2026",
    readTime: "8 min",
    color: "#875aa0",
  },
  {
    slug: "cuidado-cabello-hondureno",
    category: "Consejos",
    title: "Rutina de cuidado capilar para el clima hondureño",
    excerpt: "La humedad y el calor afectan tu cabello diferente. Estos tips te ayudarán a mantenerlo sano todo el año.",
    date: "12 may 2026",
    readTime: "5 min",
    color: "#d3b87f",
  },
  {
    slug: "spa-dias-de-semana",
    category: "Bienestar",
    title: "Por qué deberías reservar tu spa entre semana",
    excerpt: "Menos espera, mejores precios y más atención personalizada. Los beneficios de escapar del rush del fin de semana.",
    date: "3 may 2026",
    readTime: "3 min",
    color: "#4a2970",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 px-5 text-center" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #f5eefb, #fff)" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#875aa0" }}>Blog</p>
          <h1 className="font-serif font-semibold text-4xl md:text-5xl mb-5" style={{ color: "#1c1622" }}>
            Consejos, tendencias<br />
            <span style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              y novedades de belleza
            </span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6b5585" }}>
            Todo lo que necesitas saber sobre belleza, bienestar y el ecosistema Estilia en Honduras.
          </p>
        </section>

        {/* Posts grid */}
        <section className="py-16 px-5 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map(({ slug, category, title, excerpt, date, readTime, color }) => (
              <article key={slug}
                       className="group flex flex-col rounded-2xl overflow-hidden border border-[#e8d8f5] bg-white
                                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Color banner */}
                <div className="h-3 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: `${color}15`, color }}>
                      {category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: "#9d8ab0" }}>
                      <Clock size={10} /> {readTime}
                    </div>
                  </div>

                  <h2 className="font-serif font-semibold text-base leading-snug"
                      style={{ color: "#1c1622" }}>
                    {title}
                  </h2>

                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#6b5585" }}>
                    {excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e8d8f5]">
                    <span className="text-[10px]" style={{ color: "#9d8ab0" }}>{date}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-[#4a2970]"
                          style={{ color: "#875aa0" }}>
                      Leer más <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-5" style={{ background: "#f5eefb" }}>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif font-semibold text-2xl mb-3" style={{ color: "#1c1622" }}>
              Recibe los mejores tips en tu correo
            </h2>
            <p className="text-sm mb-6" style={{ color: "#6b5585" }}>
              Suscríbete al newsletter de Estilia y sé el primero en conocer tendencias, ofertas y novedades.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
