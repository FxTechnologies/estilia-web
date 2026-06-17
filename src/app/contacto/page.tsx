"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Abre cliente de correo con los datos
    const subject = encodeURIComponent(`[Estilia] ${form.asunto}`);
    const body = encodeURIComponent(`Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`);
    window.open(`mailto:hola@estilia.hn?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 px-5 text-center" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #f5eefb, #fff)" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#875aa0" }}>Contacto</p>
          <h1 className="font-serif font-semibold text-4xl md:text-5xl mb-5" style={{ color: "#1c1622" }}>
            ¿En qué podemos{" "}
            <span style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ayudarte?
            </span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6b5585" }}>
            Escríbenos y te respondemos en menos de 24 horas hábiles.
          </p>
        </section>

        <section className="py-16 px-5 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif font-semibold text-2xl mb-6" style={{ color: "#1c1622" }}>Información de contacto</h2>
              {[
                { icon: Mail, label: "Email general", value: "hola@estilia.hn", href: "mailto:hola@estilia.hn" },
                { icon: MessageCircle, label: "WhatsApp soporte", value: "+504 9999-0000", href: "https://wa.me/50499990000" },
                { icon: MapPin, label: "Ubicación", value: "Tegucigalpa, Honduras", href: null },
                { icon: Clock, label: "Horario de atención", value: "Lun–Vie 8am–6pm (HN)", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                       style={{ background: "#f5eefb" }}>
                    <Icon size={18} style={{ color: "#875aa0" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#9d8ab0" }}>{label}</p>
                    {href
                      ? <a href={href} className="text-sm font-medium hover:text-[#875aa0] transition-colors" style={{ color: "#1c1622" }}>{value}</a>
                      : <p className="text-sm font-medium" style={{ color: "#1c1622" }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="rounded-2xl p-6 border border-[#e8d8f5]" style={{ background: "#f5eefb" }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "#1c1622" }}>Contáctanos según tu consulta</h3>
              <div className="space-y-2">
                {[
                  { label: "Clientes — reservas y citas", email: "clientes@estilia.hn" },
                  { label: "Profesionales — registro y planes", email: "pros@estilia.hn" },
                  { label: "Prensa y alianzas", email: "prensa@estilia.hn" },
                  { label: "Problemas técnicos", email: "soporte@estilia.hn" },
                ].map(({ label, email }) => (
                  <div key={email} className="flex items-center justify-between gap-4">
                    <span className="text-xs" style={{ color: "#6b5585" }}>{label}</span>
                    <a href={`mailto:${email}`} className="text-xs font-semibold hover:text-[#4a2970] transition-colors shrink-0"
                       style={{ color: "#875aa0" }}>
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="rounded-2xl border border-[#e8d8f5] p-8 shadow-sm bg-white">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-serif font-semibold text-xl mb-2" style={{ color: "#1c1622" }}>¡Mensaje enviado!</h3>
                  <p className="text-sm" style={{ color: "#6b5585" }}>
                    Tu cliente de correo debió abrirse. Si no, escríbenos directamente a{" "}
                    <a href="mailto:hola@estilia.hn" className="underline" style={{ color: "#875aa0" }}>hola@estilia.hn</a>.
                  </p>
                  <button onClick={() => setSent(false)}
                          className="mt-6 text-sm font-semibold px-6 py-2.5 rounded-full border border-[#875aa0]"
                          style={{ color: "#875aa0" }}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif font-semibold text-xl mb-2" style={{ color: "#1c1622" }}>Envíanos un mensaje</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>Nombre *</label>
                      <input name="nombre" required value={form.nombre} onChange={handleChange}
                             placeholder="Tu nombre"
                             className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors"
                             style={{ color: "#1c1622" }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                             placeholder="tu@correo.com"
                             className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors"
                             style={{ color: "#1c1622" }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>Asunto *</label>
                    <select name="asunto" required value={form.asunto} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors bg-white"
                            style={{ color: form.asunto ? "#1c1622" : "#9d8ab0" }}>
                      <option value="">Selecciona un tema...</option>
                      <option>Soy cliente — tengo una consulta</option>
                      <option>Quiero registrarme como profesional</option>
                      <option>Información sobre planes y precios</option>
                      <option>Problema técnico</option>
                      <option>Prensa y alianzas</option>
                      <option>Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5" style={{ color: "#6b5585" }}>Mensaje *</label>
                    <textarea name="mensaje" required value={form.mensaje} onChange={handleChange}
                              rows={5} placeholder="Cuéntanos cómo podemos ayudarte..."
                              className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8f5] text-sm outline-none focus:border-[#875aa0] transition-colors resize-none"
                              style={{ color: "#1c1622" }} />
                  </div>

                  <button type="submit"
                          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                          style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
