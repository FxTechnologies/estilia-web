"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Star, MapPin, Clock, Calendar, LogOut, CheckCircle, Edit3, ExternalLink, MessageCircle, TrendingUp, Scissors } from "lucide-react";
import type { Pro, Service, Review, Appointment } from "@/lib/supabase";

function StatCard({ icon, value, label, sub }: { icon: React.ReactNode; value: string; label: string; sub?: string }) {
  return (
    <div style={{ background: "var(--surface-card)", borderRadius: 16, padding: "20px 24px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
      <div style={{ color: "var(--brand)", marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--ink-900)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-500)", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--gold-600)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function ProDashboard() {
  const router = useRouter();
  const [pro, setPro] = useState<Pro | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sb = createClient();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserEmail(user.email ?? "");

      const { data: proData } = await sb.from("pros").select("*").eq("user_id", user.id).maybeSingle();
      if (!proData) { router.push("/login"); return; }
      setPro(proData as Pro);

      const [{ data: svcs }, { data: revs }, { data: apts }] = await Promise.all([
        sb.from("services").select("*").eq("pro_id", proData.id).order("price"),
        sb.from("reviews").select("*").eq("pro_id", proData.id).order("created_at", { ascending: false }).limit(10),
        sb.from("appointments").select("*").eq("pro_id", proData.id).order("scheduled_at", { ascending: false }).limit(20),
      ]);
      setServices((svcs ?? []) as Service[]);
      setReviews((revs ?? []) as Review[]);
      setAppointments((apts ?? []) as Appointment[]);
      setLoading(false);
    })();
  }, [router]);

  async function handleLogout() {
    const sb = createClient();
    await sb.auth.signOut();
    router.push("/");
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-page)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--brand)" }}>Cargando tu panel…</div>
    </div>
  );

  const todayApts = appointments.filter(a => {
    if (!a.scheduled_at) return false;
    const d = new Date(a.scheduled_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });
  const pendingApts = appointments.filter(a => a.status === "pending" || a.status === "confirmed");
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1) : pro?.rating?.toFixed(1) ?? "—";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "var(--font-sans)" }}>
      {/* Sidebar + content layout */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside style={{ width: 240, background: "var(--ink-900)", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
          <div style={{ padding: "0 20px 28px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 64 64" fill="none"><line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><circle cx="53" cy="18" r="5" fill="#d3b87f"/></svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "#fff" }}>Estilia</span>
            </a>
          </div>

          {pro && (
            <div style={{ padding: "0 16px 24px", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                {pro.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "#fff" }}>{pro.name}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{pro.category}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                {pro.verified && <CheckCircle size={12} color="var(--plum-300)" />}
                {pro.premium && <span style={{ fontSize: 10, background: "var(--gold-500)", color: "#2b1e0a", fontWeight: 800, padding: "1px 6px", borderRadius: 999 }}>Premium</span>}
              </div>
            </div>
          )}

          <nav style={{ padding: "16px 8px", flex: 1 }}>
            {[
              { icon: <TrendingUp size={16}/>, label: "Resumen", href: "#resumen" },
              { icon: <Calendar size={16}/>, label: "Citas", href: "#citas" },
              { icon: <Scissors size={16}/>, label: "Servicios", href: "#servicios" },
              { icon: <Star size={16}/>, label: "Reseñas", href: "#resenas" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.70)", marginBottom: 2, transition: "background .15s, color .15s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.08)";(e.currentTarget as HTMLElement).style.color="#fff";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.70)";}}>
                {icon}{label}
              </a>
            ))}
          </nav>

          <div style={{ padding: "0 8px 8px", marginTop: "auto" }}>
            {pro && (
              <a href={`/pro/${pro.id}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>
                <ExternalLink size={14}/>Ver perfil público
              </a>
            )}
            <button onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>
              <LogOut size={14}/>Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "32px clamp(20px,3vw,48px)", overflow: "auto" }}>
          <div id="resumen" style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink-900)", margin: "0 0 4px" }}>
                Hola, {pro?.name?.split(" ")[0]} 👋
              </h1>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-500)", margin: 0 }}>{userEmail}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard icon={<Star size={20}/>} value={String(avgRating)} label="Calificación promedio" sub={`${pro?.review_count ?? reviews.length} reseñas`} />
              <StatCard icon={<Calendar size={20}/>} value={String(todayApts.length)} label="Citas hoy" sub={`${pendingApts.length} pendientes`} />
              <StatCard icon={<Scissors size={20}/>} value={String(services.length)} label="Servicios activos" />
              <StatCard icon={<TrendingUp size={20}/>} value={pro?.from_price ? `L ${pro.from_price}` : "—"} label="Precio desde" />
            </div>

            {/* Pro info card */}
            <div style={{ background: "var(--surface-card)", borderRadius: 18, border: "1px solid var(--border-subtle)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {pro?.image_url
                      ? <img src={pro.image_url} alt={pro?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 700, color: "#fff" }}>{pro?.name?.charAt(0)}</span>
                    }
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--ink-900)" }}>{pro?.name}</span>
                      {pro?.verified && <CheckCircle size={16} color="var(--brand)"/>}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--ink-500)", marginTop: 3 }}>{pro?.category}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--ink-600)" }}><MapPin size={13}/>{pro?.city}</div>
                      {pro?.opens_at && <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--ink-600)" }}><Clock size={13}/>{pro.opens_at} – {pro?.closes_at}</div>}
                      {pro?.whatsapp && <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#25d366" }}><MessageCircle size={13}/>+{pro.whatsapp}</div>}
                    </div>
                  </div>
                </div>
                <a href={`/pro/${pro?.id}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, border: "1.5px solid var(--border-default)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--ink-700)", textDecoration: "none" }}>
                  <ExternalLink size={14}/>Ver perfil
                </a>
              </div>
            </div>
          </div>

          {/* Appointments */}
          <div id="citas" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink-900)", margin: "0 0 16px" }}>Próximas citas</h2>
            {appointments.length === 0 ? (
              <div style={{ background: "var(--surface-card)", borderRadius: 16, border: "1px solid var(--border-subtle)", padding: "32px", textAlign: "center", color: "var(--ink-400)", fontSize: 14 }}>
                No hay citas registradas aún. Cuando los clientes reserven aparecerán aquí.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {appointments.slice(0, 10).map(apt => (
                  <div key={apt.id} style={{ background: "var(--surface-card)", borderRadius: 14, border: "1px solid var(--border-subtle)", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface-plum)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Calendar size={18} color="var(--brand)"/>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>
                          {apt.scheduled_at ? new Date(apt.scheduled_at).toLocaleString("es-HN", { dateStyle: "medium", timeStyle: "short" }) : "Sin fecha"}
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-400)", marginTop: 2 }}>ID: {apt.id.slice(0, 8)}…</div>
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                      background: apt.status === "confirmed" ? "var(--success-100)" : apt.status === "pending" ? "var(--warning-100)" : "var(--surface-muted)",
                      color: apt.status === "confirmed" ? "var(--success-500)" : apt.status === "pending" ? "var(--warning-500)" : "var(--ink-500)"
                    }}>
                      {apt.status ?? "pendiente"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div id="servicios" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink-900)", margin: "0 0 16px" }}>Mis servicios</h2>
            {services.length === 0 ? (
              <div style={{ background: "var(--surface-card)", borderRadius: 16, border: "1px solid var(--border-subtle)", padding: 32, textAlign: "center", color: "var(--ink-400)", fontSize: 14 }}>
                No tienes servicios agregados. Agrégalos desde la app Estilia.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
                {services.map(svc => (
                  <div key={svc.id} style={{ background: "var(--surface-card)", borderRadius: 14, border: "1px solid var(--border-subtle)", padding: "16px 18px" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--ink-900)", marginBottom: 6 }}>{svc.name}</div>
                    {svc.description && <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-500)", marginBottom: 10, lineHeight: 1.5 }}>{svc.description}</div>}
                    <div style={{ display: "flex", gap: 16 }}>
                      {svc.duration_min && <div style={{ fontSize: 13, color: "var(--ink-600)" }}><Clock size={12} style={{ verticalAlign: "middle", marginRight: 4 }}/>{svc.duration_min} min</div>}
                      {svc.price && <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--brand)" }}>L {svc.price}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div id="resenas">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink-900)", margin: "0 0 16px" }}>Reseñas recientes</h2>
            {reviews.length === 0 ? (
              <div style={{ background: "var(--surface-card)", borderRadius: 16, border: "1px solid var(--border-subtle)", padding: 32, textAlign: "center", color: "var(--ink-400)", fontSize: 14 }}>
                Aún no tienes reseñas. Comparte tu perfil para que los clientes te califiquen.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {reviews.map(rev => (
                  <div key={rev.id} style={{ background: "var(--surface-card)", borderRadius: 14, border: "1px solid var(--border-subtle)", padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: rev.rating ?? 0 }).map((_, i) => <Star key={i} size={13} fill="var(--star)" color="var(--star)"/>)}
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-400)" }}>
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString("es-HN") : ""}
                      </span>
                    </div>
                    {rev.comment && <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontStyle: "italic", color: "var(--ink-700)", margin: 0, lineHeight: 1.55 }}>"{rev.comment}"</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
