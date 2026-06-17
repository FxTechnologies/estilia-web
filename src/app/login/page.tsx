"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !data.user) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    // Check if user has a pro profile
    const { data: proData } = await supabase
      .from("pros")
      .select("id")
      .eq("user_id", data.user.id)
      .single();

    if (proData) {
      router.push(`/dashboard/pro`);
    } else {
      // Check profiles table for role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "negocio") {
        router.push("/dashboard/negocio");
      } else {
        router.push("/dashboard/pro");
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 flex items-center justify-center px-5"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #f5eefb, #fff)" }}>
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                 style={{ background: "#875aa0" }}>
              <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
              </svg>
            </div>
            <h1 className="font-serif font-semibold text-2xl" style={{ color: "#1c1622" }}>
              Iniciar sesión
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6b5585" }}>
              Accede a tu cuenta de Estilia
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-[#e8d8f5] shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>
                  Correo electrónico
                </label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors"
                  style={{ color: "#1c1622" }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>
                  Contraseña
                </label>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors"
                  style={{ color: "#1c1622" }}
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e8d8f5] text-center">
              <p className="text-xs" style={{ color: "#9d8ab0" }}>
                ¿No tienes cuenta? Descarga la app para registrarte.
              </p>
              <a href="https://apps.apple.com/app/estilia"
                 className="inline-block mt-3 text-xs font-semibold px-4 py-2 rounded-full border border-[#875aa0]"
                 style={{ color: "#875aa0" }}>
                Descargar Estilia
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
