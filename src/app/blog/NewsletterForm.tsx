"use client";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm font-semibold" style={{ color: "#875aa0" }}>
        ¡Gracias! Te avisaremos con las últimas novedades.
      </p>
    );
  }

  return (
    <form className="flex gap-2 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="tu@correo.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors"
        style={{ color: "#1c1622" }}
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shrink-0"
        style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}
      >
        Suscribir
      </button>
    </form>
  );
}
