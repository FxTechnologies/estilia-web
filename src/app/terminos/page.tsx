import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Términos de uso",
  description: "Términos y condiciones de uso de la plataforma Estilia en Honduras.",
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-5">
        <div className="max-w-3xl mx-auto prose prose-sm" style={{ color: "#1c1622" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#875aa0" }}>Legal</p>
          <h1 className="font-serif font-semibold text-4xl mb-2" style={{ color: "#1c1622" }}>Términos de uso</h1>
          <p className="text-xs mb-10" style={{ color: "#9d8ab0" }}>Última actualización: junio 2026</p>

          {[
            {
              title: "1. Aceptación de los términos",
              body: `Al acceder o usar Estilia (la "Plataforma"), ya sea a través de nuestra aplicación móvil o sitio web, usted acepta quedar vinculado por estos Términos de Uso y nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, no utilice la Plataforma.`,
            },
            {
              title: "2. Descripción del servicio",
              body: `Estilia es una plataforma de marketplace que conecta a profesionales de belleza y bienestar con clientes en Honduras. Facilitamos la reserva de citas, pero no somos proveedores de los servicios de belleza ni empleadores de los profesionales.`,
            },
            {
              title: "3. Elegibilidad",
              body: `Para usar Estilia debe tener al menos 18 años de edad o la mayoría de edad legal en Honduras. Al crear una cuenta, declara que cumple con este requisito y que la información que proporciona es veraz y actualizada.`,
            },
            {
              title: "4. Cuentas de usuario",
              body: `Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta. Notifíquenos de inmediato cualquier uso no autorizado. Estilia no será responsable de pérdidas causadas por el uso no autorizado de su cuenta.`,
            },
            {
              title: "5. Uso aceptable",
              body: `Se prohíbe: (a) usar la Plataforma para fines ilegales; (b) publicar información falsa o engañosa; (c) acosar a otros usuarios; (d) intentar acceder a sistemas no autorizados; (e) reproducir o redistribuir el contenido de la Plataforma sin autorización.`,
            },
            {
              title: "6. Pagos y facturación",
              body: `Los pagos entre clientes y profesionales se realizan directamente entre las partes. Estilia cobra a los profesionales una suscripción mensual por el uso de la plataforma, según el plan elegido. No cobramos comisión por cita reservada.`,
            },
            {
              title: "7. Cancelaciones y reembolsos",
              body: `Las políticas de cancelación de cada cita son establecidas por el profesional. Las suscripciones a planes Pro o Premium pueden cancelarse en cualquier momento; no se ofrecen reembolsos parciales por el período ya pagado.`,
            },
            {
              title: "8. Propiedad intelectual",
              body: `Todo el contenido de la Plataforma (diseño, código, logotipos, textos) es propiedad de Estilia o sus licenciantes. Los profesionales retienen los derechos de las fotos y contenido que suben a sus perfiles.`,
            },
            {
              title: "9. Limitación de responsabilidad",
              body: `Estilia no garantiza la calidad de los servicios de belleza prestados por los profesionales. En la máxima medida permitida por la ley hondureña, nuestra responsabilidad total no excederá el monto pagado por el usuario en los últimos 3 meses.`,
            },
            {
              title: "10. Ley aplicable",
              body: `Estos términos se rigen por las leyes de la República de Honduras. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de Tegucigalpa, Honduras.`,
            },
            {
              title: "11. Contacto",
              body: `Para consultas sobre estos términos, contáctenos en legal@esstiliapp.com o a través de nuestro Centro de Ayuda.`,
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
