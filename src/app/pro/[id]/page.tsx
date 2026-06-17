import { notFound } from "next/navigation";
import { supabase, type Pro, type Service, type Review } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Star, Clock, CheckCircle, MessageCircle, Scissors } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase.from("pros").select("name, category, city").eq("id", id).single();
  if (!data) return { title: "Profesional no encontrado" };
  return {
    title: `${data.name} — ${data.category} en ${data.city}`,
    description: `Reserva una cita con ${data.name}, ${data.category} en ${data.city}. Disponible en Estilia.`,
  };
}

export default async function ProPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: pro }, { data: services }, { data: reviews }] = await Promise.all([
    supabase.from("pros").select("*").eq("id", id).single(),
    supabase.from("services").select("*").eq("pro_id", id).order("price"),
    supabase.from("reviews").select("*").eq("pro_id", id).order("created_at", { ascending: false }).limit(10),
  ]);

  if (!pro) notFound();

  const p = pro as Pro;
  const svcs = (services ?? []) as Service[];
  const revs = (reviews ?? []) as Review[];
  const initials = p.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
  const waLink = p.whatsapp ? `https://wa.me/${p.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${p.name}, vi tu perfil en Estilia y me gustaría reservar una cita.`)}` : null;

  function formatTime(t: string | null) {
    if (!t) return null;
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20" style={{ background: "#faf8fd" }}>

        {/* Hero banner */}
        <div className="h-40 w-full" style={{ background: "linear-gradient(135deg,#1c1622,#4a2970)" }} />

        <div className="max-w-4xl mx-auto px-5 -mt-16 pb-20">

          {/* Profile card */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#e8d8f5] p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden shrink-0 relative"
                   style={{ background: "#875aa0" }}>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                  {initials}
                </span>
                {p.image_url && (
                  <img src={p.image_url} alt={p.name}
                       className="w-full h-full object-cover relative z-10" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-serif font-semibold text-2xl" style={{ color: "#1c1622" }}>{p.name}</h1>
                  {p.verified && (
                    <CheckCircle size={18} style={{ color: "#875aa0" }} />
                  )}
                  {p.premium && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#d3b87f20", color: "#d3b87f" }}>PREMIUM</span>
                  )}
                </div>

                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                      style={{ background: "#f5eefb", color: "#875aa0" }}>
                  {p.category}
                </span>

                <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#6b5585" }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} style={{ color: "#d3b87f" }} /> {p.city}
                  </span>
                  {p.rating != null && (
                    <span className="flex items-center gap-1">
                      <Star size={13} fill="#d3b87f" stroke="none" />
                      <strong style={{ color: "#1c1622" }}>{p.rating.toFixed(1)}</strong>
                      {p.review_count != null && <span>({p.review_count} reseñas)</span>}
                    </span>
                  )}
                  {p.opens_at && p.closes_at && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} style={{ color: "#875aa0" }} />
                      {formatTime(p.opens_at)} – {formatTime(p.closes_at)}
                    </span>
                  )}
                  {p.from_price != null && (
                    <span className="font-semibold" style={{ color: "#1c1622" }}>
                      Desde L {p.from_price}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shrink-0 hover:opacity-90 transition-opacity"
                   style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}>
                  <MessageCircle size={16} /> Reservar por WhatsApp
                </a>
              )}
            </div>

            {p.bio && (
              <p className="mt-5 pt-5 border-t border-[#e8d8f5] text-sm leading-relaxed" style={{ color: "#6b5585" }}>
                {p.bio}
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Services */}
            <div className="lg:col-span-2 space-y-4">
              {svcs.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6">
                  <h2 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: "#1c1622" }}>
                    <Scissors size={18} style={{ color: "#875aa0" }} /> Servicios
                  </h2>
                  <div className="space-y-3">
                    {svcs.map(svc => (
                      <div key={svc.id} className="flex items-start justify-between gap-4 py-3 border-b border-[#f5eefb] last:border-0">
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ color: "#1c1622" }}>{svc.name}</p>
                          {svc.description && (
                            <p className="text-xs mt-0.5" style={{ color: "#9d8ab0" }}>{svc.description}</p>
                          )}
                          {svc.duration_min && (
                            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#9d8ab0" }}>
                              <Clock size={10} /> {svc.duration_min} min
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          {svc.price != null && (
                            <span className="text-sm font-bold" style={{ color: "#875aa0" }}>L {svc.price}</span>
                          )}
                          {waLink && (
                            <a href={`${waLink} — Servicio: ${svc.name}`} target="_blank" rel="noopener noreferrer"
                               className="block mt-1 text-[10px] font-semibold px-3 py-1 rounded-full text-white"
                               style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
                              Reservar
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6">
                <h2 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: "#1c1622" }}>
                  <Star size={18} fill="#d3b87f" stroke="none" /> Reseñas
                </h2>
                {revs.length === 0 ? (
                  <p className="text-sm text-center py-6" style={{ color: "#9d8ab0" }}>
                    Aún no hay reseñas. ¡Sé el primero en dejar una desde la app!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {revs.map(r => (
                      <div key={r.id} className="pb-4 border-b border-[#f5eefb] last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold" style={{ color: "#1c1622" }}>
                            {r.client_name ?? "Cliente"}
                          </span>
                          {r.rating != null && (
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} width="11" height="11" viewBox="0 0 24 24"
                                     fill={i < r.rating! ? "#d3b87f" : "#e8d8f5"}>
                                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                                </svg>
                              ))}
                            </div>
                          )}
                        </div>
                        {r.comment && (
                          <p className="text-xs leading-relaxed" style={{ color: "#6b5585" }}>{r.comment}</p>
                        )}
                        {r.created_at && (
                          <p className="text-[10px] mt-1" style={{ color: "#9d8ab0" }}>
                            {new Date(r.created_at).toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Book CTA */}
              <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6 text-center">
                <p className="text-sm font-semibold mb-1" style={{ color: "#1c1622" }}>¿Listo para reservar?</p>
                <p className="text-xs mb-4" style={{ color: "#9d8ab0" }}>Contacta directamente por WhatsApp</p>
                {waLink ? (
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                     style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}>
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                ) : (
                  <p className="text-xs" style={{ color: "#9d8ab0" }}>Contacto no disponible</p>
                )}
              </div>

              {/* App download */}
              <div className="rounded-2xl p-5 text-center"
                   style={{ background: "linear-gradient(135deg,#1c1622,#4a2970)" }}>
                <p className="text-xs font-bold mb-1 text-white">Gestiona tus citas en la app</p>
                <p className="text-[10px] mb-4" style={{ color: "#9d8ab0" }}>Descarga Estilia y reserva al instante</p>
                <a href="https://apps.apple.com/app/estilia"
                   className="block w-full py-2.5 rounded-xl text-xs font-bold text-white border border-[#875aa0] hover:bg-[#875aa0] transition-colors">
                  Descargar app
                </a>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border border-[#e8d8f5] p-5">
                <h3 className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: "#9d8ab0" }}>Ubicación</h3>
                <div className="flex items-start gap-2">
                  <MapPin size={14} style={{ color: "#d3b87f" }} className="mt-0.5 shrink-0" />
                  <p className="text-sm" style={{ color: "#1c1622" }}>{p.city}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
