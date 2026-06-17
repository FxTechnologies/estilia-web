"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Star, MapPin, Clock, Calendar, MessageCircle, Settings, LogOut, Scissors, TrendingUp } from "lucide-react";
import type { Pro, Service } from "@/lib/supabase";

export default function ProDashboard() {
  const router = useRouter();
  const [pro, setPro] = useState<Pro | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) { router.push("/login"); return; }

      const { data: proData } = await supabase
        .from("pros").select("*").eq("user_id", user.id).single();

      if (!proData) { router.push("/login"); return; }

      setPro(proData as Pro);

      const [{ data: svcs }, { data: apts }] = await Promise.all([
        supabase.from("services").select("*").eq("pro_id", proData.id).order("price"),
        supabase.from("appointments").select("*").eq("pro_id", proData.id)
          .order("created_at", { ascending: false }).limit(10),
      ]);

      setServices(svcs ?? []);
      setAppointments(apts ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8fd" }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#875aa0] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!pro) return null;

  const initials = pro.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen" style={{ background: "#faf8fd" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[#e8d8f5] bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#875aa0" }}>
              <svg width="16" height="16" viewBox="0 0 64 64" fill="none">
                <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
              </svg>
            </div>
            <span className="font-serif font-semibold text-base" style={{ color: "#1c1622" }}>Estilia</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#f5eefb", color: "#875aa0" }}>
              Panel Pro
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/pro/${pro.id}`} target="_blank"
               className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e8d8f5] hover:border-[#875aa0] transition-colors"
               style={{ color: "#6b5585" }}>
              Ver mi perfil público
            </a>
            <button onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e8d8f5] hover:border-red-300 hover:text-red-500 transition-colors"
                    style={{ color: "#9d8ab0" }}>
              <LogOut size={13} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">

        {/* Profile summary */}
        <div className="bg-white rounded-3xl border border-[#e8d8f5] p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative flex items-center justify-center text-xl font-bold text-white"
                 style={{ background: "#875aa0" }}>
              <span className="absolute inset-0 flex items-center justify-center">{initials}</span>
              {pro.image_url && (
                <img src={pro.image_url} alt={pro.name} className="w-full h-full object-cover relative z-10" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-serif font-semibold text-xl mb-1" style={{ color: "#1c1622" }}>{pro.name}</h1>
              <div className="flex flex-wrap gap-3 text-xs" style={{ color: "#6b5585" }}>
                <span className="flex items-center gap-1">
                  <Scissors size={12} style={{ color: "#875aa0" }} /> {pro.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: "#d3b87f" }} /> {pro.city}
                </span>
                {pro.rating != null && (
                  <span className="flex items-center gap-1">
                    <Star size={12} fill="#d3b87f" stroke="none" />
                    {pro.rating.toFixed(1)} ({pro.review_count ?? 0} reseñas)
                  </span>
                )}
                {pro.opens_at && pro.closes_at && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} style={{ color: "#875aa0" }} />
                    {pro.opens_at.slice(0,5)} – {pro.closes_at.slice(0,5)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {pro.whatsapp && (
                <a href={`https://wa.me/${pro.whatsapp.replace(/\D/g, "")}`}
                   target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                   style={{ background: "#25d366" }}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Rating", value: pro.rating ? pro.rating.toFixed(1) : "—", icon: Star, color: "#d3b87f" },
            { label: "Reseñas", value: pro.review_count ?? 0, icon: MessageCircle, color: "#875aa0" },
            { label: "Servicios", value: services.length, icon: Scissors, color: "#4a2970" },
            { label: "Citas", value: appointments.length, icon: Calendar, color: "#875aa0" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e8d8f5] p-5 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                   style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} fill={label === "Rating" ? color : "none"} stroke={label === "Rating" ? "none" : color} />
              </div>
              <p className="font-serif font-semibold text-2xl" style={{ color: "#1c1622" }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9d8ab0" }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Services */}
          <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "#1c1622" }}>
                <Scissors size={16} style={{ color: "#875aa0" }} /> Mis servicios
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f5eefb", color: "#875aa0" }}>
                {services.length} activos
              </span>
            </div>
            {services.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: "#9d8ab0" }}>
                Agrega servicios desde la app móvil.
              </p>
            ) : (
              <div className="space-y-3">
                {services.map(svc => (
                  <div key={svc.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-[#f5eefb] last:border-0">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1c1622" }}>{svc.name}</p>
                      {svc.duration_min && (
                        <p className="text-xs" style={{ color: "#9d8ab0" }}>{svc.duration_min} min</p>
                      )}
                    </div>
                    {svc.price != null && (
                      <span className="text-sm font-bold shrink-0" style={{ color: "#875aa0" }}>L {svc.price}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base flex items-center gap-2" style={{ color: "#1c1622" }}>
                <Calendar size={16} style={{ color: "#875aa0" }} /> Citas recientes
              </h2>
            </div>
            {appointments.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: "#9d8ab0" }}>
                Las citas aparecerán aquí cuando clientes reserven desde la app.
              </p>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt: any) => (
                  <div key={apt.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-[#f5eefb] last:border-0">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1c1622" }}>
                        {apt.client_name ?? "Cliente"}
                      </p>
                      {apt.service_name && (
                        <p className="text-xs" style={{ color: "#9d8ab0" }}>{apt.service_name}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {apt.date && (
                        <p className="text-xs font-semibold" style={{ color: "#875aa0" }}>
                          {new Date(apt.date).toLocaleDateString("es-HN", { day: "numeric", month: "short" })}
                        </p>
                      )}
                      {apt.status && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: apt.status === "confirmed" ? "#f0fdf4" : "#f5eefb",
                                       color: apt.status === "confirmed" ? "#16a34a" : "#875aa0" }}>
                          {apt.status === "confirmed" ? "Confirmada" : apt.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* App promo */}
        <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ background: "linear-gradient(135deg,#1c1622,#4a2970)" }}>
          <div>
            <p className="font-semibold text-white text-sm mb-1">Gestiona todo desde la app</p>
            <p className="text-xs" style={{ color: "#9d8ab0" }}>
              Agenda, clientes, pagos y más — en tu bolsillo.
            </p>
          </div>
          <a href="https://apps.apple.com/app/estilia"
             className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-white border border-[#875aa0] hover:bg-[#875aa0] transition-colors">
            Descargar Estilia
          </a>
        </div>

      </div>
    </div>
  );
}
