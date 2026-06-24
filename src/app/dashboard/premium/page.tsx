"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft, Crown, Sparkles, Check, Star, Zap, TrendingUp,
  BadgeCheck, Image as ImageIcon, Headphones, ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

type Plan = {
  name: string;
  price: string;
  sub: string;
  tagline: string;
  highlight: boolean;
  badge?: string;
  features: { icon: React.ReactNode; text: string }[];
};

const PLANS: Plan[] = [
  {
    name: "Pro",
    price: "L 399",
    sub: "/mes",
    tagline: "Para crecer y destacar en la plataforma.",
    highlight: false,
    features: [
      { icon: <Zap size={15} />, text: "Citas ilimitadas" },
      { icon: <TrendingUp size={15} />, text: "Perfil destacado en búsquedas" },
      { icon: <ImageIcon size={15} />, text: "Galería de hasta 20 fotos" },
      { icon: <Sparkles size={15} />, text: "Recordatorios automáticos a clientes" },
      { icon: <Star size={15} />, text: "Estadísticas de tu negocio" },
      { icon: <Headphones size={15} />, text: "Soporte prioritario" },
    ],
  },
  {
    name: "Premium",
    price: "L 799",
    sub: "/mes",
    tagline: "Máxima visibilidad y herramientas avanzadas.",
    highlight: true,
    badge: "Más popular",
    features: [
      { icon: <Check size={15} />, text: "Todo lo del plan Pro" },
      { icon: <BadgeCheck size={15} />, text: "Badge Premium en tu listado" },
      { icon: <TrendingUp size={15} />, text: "Posición top en resultados" },
      { icon: <Sparkles size={15} />, text: "Anuncios destacados dentro de la app" },
      { icon: <Star size={15} />, text: "Reportes avanzados" },
      { icon: <Headphones size={15} />, text: "Manager de cuenta dedicado" },
    ],
  },
];

const SALES_EMAIL = "hola@esstiliapp.com";

export default function PremiumPage() {
  const [currentPlan, setCurrentPlan] = useState<string>("Gratis");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: pro } = await supabase.from("pros").select("premium").eq("user_id", user.id).maybeSingle();
      if (pro?.premium) setCurrentPlan("Premium");
    })();
  }, []);

  const upgradeHref = (plan: string) =>
    `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(`Quiero mejorar a ${plan}`)}&body=${encodeURIComponent(
      `Hola, quiero mejorar mi cuenta de Estilia al plan ${plan}. ¿Me pueden ayudar?`
    )}`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page,#faf7fc)", fontFamily: "var(--font-sans)", color: "var(--ink-900)" }}>
      {/* Topbar */}
      <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 24px", borderBottom: "1px solid var(--border-subtle)", background: "rgba(250,247,252,0.85)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 20 }}>
        <button onClick={() => history.back()} style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-800)", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>
          <ArrowLeft size={16} />Volver al panel
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--ink-900)" }}>Estilia</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", color: "var(--gold-600)", border: "1px solid var(--gold-300)", padding: "3px 7px", borderRadius: 999 }}>PREMIUM</span>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px 64px" }}>
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", borderRadius: 22, background: "linear-gradient(135deg,var(--ink-900),var(--plum-800))", padding: "44px 36px", marginBottom: 36, boxShadow: "var(--shadow-lg)" }}>
          <Crown size={180} style={{ position: "absolute", top: -36, right: -28, color: "rgba(221,197,155,0.12)" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(221,197,155,0.18)", color: "var(--gold-300)", border: "1px solid rgba(221,197,155,0.35)", borderRadius: 999, padding: "6px 13px", fontSize: 12, fontWeight: 700, letterSpacing: ".04em", position: "relative" }}>
            <Sparkles size={14} />Tu plan actual: {currentPlan}
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, color: "#fff", margin: "16px 0 10px", letterSpacing: "-0.01em", lineHeight: 1.05, position: "relative", maxWidth: 560 }}>
            Pásate a Premium y haz crecer tu negocio
          </h1>
          <p style={{ fontSize: 15.5, color: "rgba(245,239,227,0.78)", margin: 0, maxWidth: 520, lineHeight: 1.6, position: "relative" }}>
            Mejor posición en búsquedas, anuncios destacados y herramientas avanzadas. Sin comisiones por cita: te quedas con el 100% de tus ingresos.
          </p>
        </section>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, alignItems: "start" }}>
          {PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.name;
            return (
              <div key={plan.name} style={{
                position: "relative", borderRadius: 18, overflow: "hidden",
                border: plan.highlight ? "1.5px solid var(--gold-400)" : "1px solid var(--border-subtle)",
                background: plan.highlight ? "var(--ink-900)" : "var(--surface-card)",
                boxShadow: plan.highlight ? "var(--shadow-lg)" : "var(--shadow-sm)",
              }}>
                {plan.badge && (
                  <div style={{ textAlign: "center", padding: "7px 0", fontSize: 11.5, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", background: "linear-gradient(90deg,var(--gold-500),var(--gold-400))", color: "#2b1e0a" }}>
                    {plan.badge}
                  </div>
                )}
                <div style={{ padding: 26 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {plan.highlight && <Crown size={17} style={{ color: "var(--gold-300)" }} />}
                    <span style={{ fontSize: 14, fontWeight: 800, color: plan.highlight ? "var(--gold-300)" : "var(--brand)" }}>{plan.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, color: plan.highlight ? "#fff" : "var(--ink-900)" }}>{plan.price}</span>
                    <span style={{ fontSize: 14, color: plan.highlight ? "rgba(245,239,227,0.6)" : "var(--ink-500)" }}>{plan.sub}</span>
                  </div>
                  <p style={{ fontSize: 13, color: plan.highlight ? "rgba(245,239,227,0.7)" : "var(--ink-500)", margin: "0 0 20px", lineHeight: 1.5 }}>{plan.tagline}</p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 12 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: plan.highlight ? "rgba(245,239,227,0.92)" : "var(--ink-700)" }}>
                        <span style={{ display: "inline-flex", flexShrink: 0, color: plan.highlight ? "var(--gold-300)" : "var(--brand)" }}>{f.icon}</span>
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <div style={{ height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 700, background: plan.highlight ? "rgba(255,255,255,0.08)" : "var(--ink-100)", color: plan.highlight ? "var(--gold-300)" : "var(--ink-500)", border: plan.highlight ? "1px solid rgba(221,197,155,0.3)" : "none" }}>
                      <Check size={17} />Tu plan actual
                    </div>
                  ) : (
                    <a href={upgradeHref(plan.name)} style={{
                      height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      fontSize: 14.5, fontWeight: 700, textDecoration: "none", cursor: "pointer",
                      background: plan.highlight ? "linear-gradient(135deg,var(--gold-500),var(--gold-400))" : "var(--brand)",
                      color: plan.highlight ? "#2b1e0a" : "#fff",
                      boxShadow: plan.highlight ? "0 8px 20px rgba(194,161,92,0.35)" : "var(--shadow-brand)",
                    }}>
                      Mejorar a {plan.name}<ArrowRight size={17} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginTop: 28, fontSize: 13, color: "var(--ink-500)" }}>
          {["Sin comisiones por cita", "Cancela cuando quieras", "Precios en HNL · IVA incluido"].map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Check size={14} style={{ color: "var(--success-500)" }} />{t}
            </span>
          ))}
        </div>

        {/* Contact line */}
        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--ink-500)", marginTop: 28 }}>
          ¿Dudas sobre qué plan te conviene?{" "}
          <a href={`mailto:${SALES_EMAIL}`} style={{ color: "var(--brand)", fontWeight: 700, textDecoration: "none" }}>Escríbenos</a>
          {" "}y te ayudamos a elegir.
        </p>
      </main>
    </div>
  );
}
