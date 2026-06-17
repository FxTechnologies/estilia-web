"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Star, MapPin, Users, Calendar, LogOut, TrendingUp, MessageCircle } from "lucide-react";

export default function NegocioDashboard() {
  const router = useRouter();
  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      setUserName(user.email ?? "");

      // Load all pros linked to this account
      const { data } = await supabase
        .from("pros").select("*").eq("user_id", user.id);

      setPros(data ?? []);
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
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#fff3e0", color: "#d3b87f" }}>
              Panel Negocio
            </span>
          </div>
          <button onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e8d8f5] hover:border-red-300 hover:text-red-500 transition-colors"
                  style={{ color: "#9d8ab0" }}>
            <LogOut size={13} /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">

        {/* Welcome */}
        <div className="bg-white rounded-3xl border border-[#e8d8f5] p-6">
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#d3b87f" }}>Bienvenido</p>
          <h1 className="font-serif font-semibold text-2xl" style={{ color: "#1c1622" }}>Panel de negocio</h1>
          <p className="text-sm mt-1" style={{ color: "#6b5585" }}>{userName}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Profesionales", value: pros.length, icon: Users, color: "#875aa0" },
            { label: "Rating promedio", value: pros.length ? (pros.reduce((s, p) => s + (p.rating ?? 0), 0) / pros.length).toFixed(1) : "—", icon: Star, color: "#d3b87f" },
            { label: "Reseñas totales", value: pros.reduce((s, p) => s + (p.review_count ?? 0), 0), icon: MessageCircle, color: "#4a2970" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e8d8f5] p-5 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                   style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="font-serif font-semibold text-2xl" style={{ color: "#1c1622" }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9d8ab0" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Pros list */}
        <div className="bg-white rounded-2xl border border-[#e8d8f5] p-6">
          <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "#1c1622" }}>
            <Users size={16} style={{ color: "#875aa0" }} /> Profesionales del negocio
          </h2>
          {pros.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: "#9d8ab0" }}>
              No hay profesionales vinculados aún. Agrégalos desde la app.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {pros.map((pro: any) => {
                const initials = pro.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
                return (
                  <a key={pro.id} href={`/pro/${pro.id}`} target="_blank"
                     className="flex items-center gap-3 p-4 rounded-2xl border border-[#e8d8f5] hover:border-[#875aa0] hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center font-bold text-sm text-white"
                         style={{ background: "#875aa0" }}>
                      <span className="absolute inset-0 flex items-center justify-center">{initials}</span>
                      {pro.image_url && (
                        <img src={pro.image_url} alt={pro.name} className="w-full h-full object-cover relative z-10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#1c1622" }}>{pro.name}</p>
                      <p className="text-xs" style={{ color: "#9d8ab0" }}>{pro.category} · {pro.city}</p>
                    </div>
                    {pro.rating != null && (
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={12} fill="#d3b87f" stroke="none" />
                        <span className="text-xs font-bold" style={{ color: "#1c1622" }}>{pro.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* App promo */}
        <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ background: "linear-gradient(135deg,#1c1622,#4a2970)" }}>
          <div>
            <p className="font-semibold text-white text-sm mb-1">Gestiona todo desde la app</p>
            <p className="text-xs" style={{ color: "#9d8ab0" }}>Agenda, equipo y reportes en tiempo real.</p>
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
