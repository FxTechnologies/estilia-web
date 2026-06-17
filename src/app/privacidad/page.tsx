import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Estilia. Cómo recopilamos y usamos tu información en Honduras.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#875aa0" }}>Legal</p>
          <h1 className="font-serif font-semibold text-4xl mb-2" style={{ color: "#1c1622" }}>Política de privacidad</h1>
          <p className="text-xs mb-10" style={{ color: "#9d8ab0" }}>Última actualización: junio 2026</p>

          {[
            {
              title: "1. Información que recopilamos",
              body: `Recopilamos: (a) Información que usted nos proporciona: nombre, correo electrónico, número de teléfono, fotos de perfil; (b) Información de uso: páginas visitadas, citas agendadas, búsquedas realizadas; (c) Información del dispositivo: modelo, sistema operativo, identificadores únicos; (d) Información de ubicación aproximada para mostrar negocios cercanos (solo con su permiso).`,
            },
            {
              title: "2. Cómo usamos su información",
              body: `Usamos su información para: operar y mejorar la Plataforma; conectarle con profesionales de belleza; enviar notificaciones de citas y recordatorios; personalizar su experiencia; cumplir con obligaciones legales aplicables en Honduras.`,
            },
            {
              title: "3. Compartición de información",
              body: `Compartimos información con: (a) Profesionales: cuando agenda una cita, el profesional ve su nombre y número de contacto; (b) Proveedores de servicios: empresas que nos ayudan a operar la plataforma (Supabase para base de datos, Expo para la app); (c) Autoridades: cuando la ley hondureña lo requiera. No vendemos su información personal a terceros.`,
            },
            {
              title: "4. Retención de datos",
              body: `Conservamos su información mientras su cuenta esté activa. Si cierra su cuenta, eliminaremos o anonimizaremos sus datos personales en un plazo de 90 días, salvo que la ley requiera conservarlos por más tiempo.`,
            },
            {
              title: "5. Seguridad",
              body: `Usamos cifrado TLS para transmisión de datos, autenticación segura vía Supabase, y acceso restringido a datos personales por parte de nuestro equipo. Aunque tomamos medidas razonables, ningún sistema es 100% seguro.`,
            },
            {
              title: "6. Sus derechos",
              body: `Usted tiene derecho a: acceder a su información personal; corregir datos inexactos; eliminar su cuenta y datos asociados; retirar su consentimiento para notificaciones de marketing; portabilidad de sus datos. Ejerza estos derechos contactándonos en privacidad@esstiliapp.com.`,
            },
            {
              title: "7. Cookies y tecnologías similares",
              body: `Nuestro sitio web usa cookies esenciales para el funcionamiento y cookies analíticas para entender el uso del sitio. Puede configurar su navegador para rechazar cookies, aunque algunas funciones pueden verse afectadas.`,
            },
            {
              title: "8. Menores de edad",
              body: `Estilia no está dirigida a menores de 18 años. No recopilamos intencionalmente información de menores. Si descubre que un menor nos ha proporcionado información, contáctenos para eliminarla.`,
            },
            {
              title: "9. Cambios a esta política",
              body: `Podemos actualizar esta política periódicamente. Le notificaremos por correo electrónico o mediante un aviso prominente en la app cuando hagamos cambios materiales.`,
            },
            {
              title: "10. Contacto",
              body: `Para preguntas sobre privacidad, contáctenos en privacidad@esstiliapp.com o en Tegucigalpa, Honduras. Responderemos en un plazo de 10 días hábiles.`,
            },
          ].map(({ title, body }) => (
            <section key={title} className="mb-8">
              <h2 className="font-semibold text-base mb-2" style={{ color: "#1c1622" }}>{title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#6b5585" }}>{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
