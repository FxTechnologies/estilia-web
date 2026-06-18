"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login"|"register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"pro"|"negocio">("pro");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const sb = createClient();
    const { data, error: authErr } = await sb.auth.signInWithPassword({ email, password });
    if (authErr || !data.user) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false); return;
    }
    // Determine role: check pros table first, then profiles
    const { data: proData } = await sb.from("pros").select("id").eq("user_id", data.user.id).maybeSingle();
    if (proData) { router.push("/dashboard/pro"); return; }
    const { data: profile } = await sb.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
    if (profile?.role === "negocio") { router.push("/dashboard/negocio"); return; }
    router.push("/dashboard/pro");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    const sb = createClient();
    const { data, error: signUpErr } = await sb.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role } }
    });
    if (signUpErr) { setError(signUpErr.message); setLoading(false); return; }
    if (data.user) {
      await sb.from("profiles").upsert({ id: data.user.id, full_name: fullName, role });
    }
    setSuccess("¡Cuenta creada! Revisa tu correo para confirmar y luego inicia sesión.");
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    border: "1.5px solid var(--border-default)", fontFamily: "var(--font-sans)",
    fontSize: 14.5, color: "var(--ink-900)", background: "#fff",
    outline: "none", boxSizing: "border-box",
    transition: "border-color .15s",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
    color: "var(--ink-600)", display: "block", marginBottom: 6,
    letterSpacing: "0.04em", textTransform: "uppercase",
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse 80% 60% at 50% 0%,var(--plum-100),var(--bg-page))", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ padding: "20px clamp(18px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
              <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
              <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
              <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)" }}>Estilia</span>
        </a>
        <a href="/" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-500)", textDecoration: "none" }}>← Volver al inicio</a>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px clamp(18px,4vw,40px)" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem,3vw,2.4rem)", letterSpacing: "-0.02em", color: "var(--ink-900)", margin: "0 0 8px" }}>
              {tab === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-500)", margin: 0 }}>
              {tab === "login" ? "Accede a tu panel de Estilia" : "Comienza a crecer con Estilia"}
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: "var(--surface-muted)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {(["login","register"] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, transition: "all .2s",
                  background: tab === t ? "var(--surface-card)" : "transparent",
                  color: tab === t ? "var(--ink-900)" : "var(--ink-500)",
                  boxShadow: tab === t ? "var(--shadow-sm)" : "none",
                }}>
                {t === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          <div style={{ background: "var(--surface-card)", borderRadius: 20, border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)", padding: "28px 28px 24px" }}>
            {tab === "login" ? (
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" style={inputStyle} onFocus={e=>(e.target as HTMLInputElement).style.borderColor="var(--brand)"} onBlur={e=>(e.target as HTMLInputElement).style.borderColor="var(--border-default)"} />
                </div>
                <div>
                  <label style={labelStyle}>Contraseña</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: 44 }} onFocus={e=>(e.target as HTMLInputElement).style.borderColor="var(--brand)"} onBlur={e=>(e.target as HTMLInputElement).style.borderColor="var(--border-default)"} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-400)", padding: 0 }}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>
                {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#c0493b", textAlign: "center", margin: 0 }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 0", borderRadius: 999, border: "none", cursor: "pointer", background: "var(--brand)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, boxShadow: "var(--shadow-brand)", opacity: loading ? 0.65 : 1, transition: "opacity .2s" }}>
                  {loading ? "Iniciando..." : (<>Entrar <ArrowRight size={16}/></>)}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Tu nombre" style={inputStyle} onFocus={e=>(e.target as HTMLInputElement).style.borderColor="var(--brand)"} onBlur={e=>(e.target as HTMLInputElement).style.borderColor="var(--border-default)"} />
                </div>
                <div>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" style={inputStyle} onFocus={e=>(e.target as HTMLInputElement).style.borderColor="var(--brand)"} onBlur={e=>(e.target as HTMLInputElement).style.borderColor="var(--border-default)"} />
                </div>
                <div>
                  <label style={labelStyle}>Contraseña</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" style={{ ...inputStyle, paddingRight: 44 }} onFocus={e=>(e.target as HTMLInputElement).style.borderColor="var(--brand)"} onBlur={e=>(e.target as HTMLInputElement).style.borderColor="var(--border-default)"} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-400)", padding: 0 }}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Tipo de cuenta</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {([["pro","Profesional","Barbero, esteticista, etc."],["negocio","Negocio","Salón, spa, centro..."]] as const).map(([val, title, desc]) => (
                      <button key={val} type="button" onClick={() => setRole(val)}
                        style={{ padding: "14px 12px", borderRadius: 12, border: `2px solid ${role===val?"var(--brand)":"var(--border-default)"}`, background: role===val?"var(--surface-plum)":"var(--surface-card)", cursor: "pointer", textAlign: "left" as const, transition: "all .15s" }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: role===val?"var(--brand)":"var(--ink-800)" }}>{title}</div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--ink-400)", marginTop: 2 }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#c0493b", textAlign: "center", margin: 0 }}>{error}</p>}
                {success && <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#2e9e5b", textAlign: "center", margin: 0 }}>{success}</p>}
                <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 0", borderRadius: 999, border: "none", cursor: "pointer", background: "var(--brand)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, boxShadow: "var(--shadow-brand)", opacity: loading ? 0.65 : 1, transition: "opacity .2s" }}>
                  {loading ? "Creando cuenta..." : (<>Crear cuenta <ArrowRight size={16}/></>)}
                </button>
              </form>
            )}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-400)", textAlign: "center", margin: "20px 0 0" }}>
              Al continuar aceptas los{" "}
              <a href="/terminos" style={{ color: "var(--brand)", textDecoration: "none" }}>Términos de uso</a>
              {" "}y la{" "}
              <a href="/privacidad" style={{ color: "var(--brand)", textDecoration: "none" }}>Política de privacidad</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
