"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Star, MapPin, LogOut, ExternalLink, Users, TrendingUp, CheckCircle, Scissors } from "lucide-react";
import type { Pro } from "@/lib/supabase";

export default function NegocioDashboard() {
  const router = useRouter();
  const [pros, setPros] = useState<Pro[]>([]);
  const [profile, setProfile] = useState<{ full_name: string | null; role: string | null } | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sb = createClient();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserEmail(user.email ?? "");

      const [{ data: prof }, { data: prosData }] = await Promise.all([
        sb.from("profiles").select("full_name,role").eq("id", user.id).maybeSingle(),
        sb.from("pros").select("*").eq("user_id", user.id),
      ]);
      setProfile(prof);
      if (prof?.role !== "negocio" && !prosData?.length) { router.push("/login"); return; }
      setPros((prosData ?? []) as Pro[]);
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
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--brand)" }}>Cargando panel…</div>
    </div>
  );

  const totalRating = pros.reduce((s, p) => s + (p.rating ?? 0), 0);
  const avgRating = pros.length ? (totalRating / pros.length).toFixed(1) : "—";
  const totalReviews = pros.reduce((s, p) => s + (p.review_count ?? 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside style={{ width: 240, background: "var(--ink-900)", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
          <div style={{ padding: "0 20px 28px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 64 64" fill="none"><line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/><circle cx="53" cy="18" r="5" fill="#d3b87f"/></svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "#fff" }}>Estilia</span>
            </a>
          </div>

          <div style={{ padding: "0 16px 24px", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gold-500)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#2b1e0a", marginBottom: 10 }}>
              {(profile?.full_name ?? userEmail).charAt(0).toUpperCase()}
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "#fff" }}>{profile?.full_name ?? userEmail}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Panel negocio</div>
          </div>

          <div style={{ padding: "16px 8px", flex: 1 }}>
            {[
              { icon: <TrendingUp size={16}/>, label: "Resumen", href: "#resumen" },
              { icon: <Users size={16}/>, label: `Mis profesionales (${pros.length})`, href: "#profesionales" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.70)", marginBottom: 2 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.08)";(e.currentTarget as HTMLElement).style.color="#fff";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.70)";}}>
                {icon}{label}
              </a>
            ))}
          </div>

          <div style={{ padding: "0 8px 8px" }}>
            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>
              <LogOut size={14}/>Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "32px clamp(20px,3vw,48px)", overflow: "auto" }}>
          <div id="resumen" style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink-900)", margin: "0 0 4px" }}>
              Panel de negocio
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-500)", margin: "0 0 28px" }}>{userEmail}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { icon: <Users size={20}/>, val: String(pros.length), label: "Profesionales" },
                { icon: <Star size={20}/>, val: avgRating, label: "Rating promedio" },
                { icon: <TrendingUp size={20}/>, val: String(totalReviews), label: "Total reseñas" },
                { icon: <CheckCircle size={20}/>, val: String(pros.filter(p=>p.verified).length), label: "Verificados" },
              ].map(({ icon, val, label }) => (
                <div key={label} style={{ background: "var(--surface-card)", borderRadius: 16, padding: "20px 24px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ color: "var(--brand)", marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--ink-900)", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-500)", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pros list */}
          <div id="profesionales">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink-900)", margin: "0 0 16px" }}>Mis profesionales</h2>
            {pros.length === 0 ? (
              <div style={{ background: "var(--surface-card)", borderRadius: 18, border: "1px solid var(--border-subtle)", padding: "48px 32px", textAlign: "center" }}>
                <Scissors size={40} color="var(--ink-300)" style={{ marginBottom: 16 }}/>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-500)", margin: "0 0 20px" }}>Aún no tienes profesionales vinculados a tu cuenta.</p>
                <a href="https://esstiliapp.com" style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--brand)", textDecoration: "none" }}>
                  Agrégalos desde la app Estilia →
                </a>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {pros.map(pro => (
                  <div key={pro.id} style={{ background: "var(--surface-card)", borderRadius: 18, border: "1px solid var(--border-subtle)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ height: 120, background: "var(--surface-plum)", position: "relative", overflow: "hidden" }}>
                      {pro.image_url && <img src={pro.image_url} alt={pro.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}
                      {pro.premium && <div style={{ position: "absolute", top: 10, right: 10, background: "var(--gold-500)", color: "#2b1e0a", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>Premium</div>}
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--ink-900)" }}>{pro.name}</span>
                        {pro.verified && <CheckCircle size={14} color="var(--brand)"/>}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 10 }}>{pro.category}</div>
                      <div style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" as const }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--ink-600)" }}><MapPin size={12}/>{pro.city}</div>
                        {pro.rating && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}><Star size={12} fill="var(--star)" color="var(--star)"/>{pro.rating.toFixed(1)}</div>}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={`/pro/${pro.id}`} target="_blank" rel="noopener noreferrer"
                          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 999, border: "1.5px solid var(--border-default)", fontSize: 13, fontWeight: 700, color: "var(--ink-700)", textDecoration: "none" }}>
                          <ExternalLink size={13}/>Ver perfil
                        </a>
                        {pro.whatsapp && (
                          <a href={`https://wa.me/${pro.whatsapp}`} target="_blank" rel="noopener noreferrer"
                            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 0", borderRadius: 999, background: "#25d366", fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
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
