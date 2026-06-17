const LINKS: Record<string, { label: string; href: string }[]> = {
  Plataforma: [
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Para profesionales", href: "/#para-profesionales" },
    { label: "Precios", href: "/precios" },
    { label: "Descargar app", href: "https://apps.apple.com/app/estilia" },
  ],
  Compañía: [
    { label: "Sobre Estilia", href: "/#sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Carreras", href: "mailto:hola@esstiliapp.com" },
    { label: "Prensa", href: "mailto:prensa@esstiliapp.com" },
  ],
  Soporte: [
    { label: "Centro de ayuda", href: "mailto:ayuda@esstiliapp.com" },
    { label: "Términos de uso", href: "/terminos" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Contacto", href: "/contacto" },
  ],
  Ciudades: [
    { label: "Tegucigalpa", href: "/buscar?ciudad=Tegucigalpa" },
    { label: "San Pedro Sula", href: "/buscar?ciudad=San+Pedro+Sula" },
    { label: "La Ceiba", href: "/buscar?ciudad=La+Ceiba" },
    { label: "Roatán", href: "/buscar?ciudad=Roat%C3%A1n" },
    { label: "Comayagua", href: "/buscar?ciudad=Comayagua" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#e8d8f5]" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "#875aa0" }}>
                <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
                  <line x1="14" y1="18" x2="50" y2="18" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="14" y1="32" x2="38" y2="32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="14" y1="46" x2="50" y2="46" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <circle cx="53" cy="18" r="5" fill="#d3b87f"/>
                </svg>
              </span>
              <span className="font-serif font-semibold text-xl" style={{ color: "#1c1622" }}>Estilia</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#6b5585" }}>
              Tu tiempo, tu estilo.<br />
              El marketplace de belleza<br />
              y bienestar de Honduras.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { id: "instagram", href: "https://instagram.com/esstiliapp" },
                { id: "facebook", href: "https://facebook.com/esstiliapp" },
                { id: "tiktok", href: "https://tiktok.com/@esstiliapp" },
              ].map(({ id: s, href }) => (
                <a key={s} href={href} target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 rounded-full flex items-center justify-center border border-[#e8d8f5] hover:border-[#875aa0] hover:bg-[#f5eefb] transition-all"
                   style={{ color: "#6b5585" }}>
                  <span className="text-[10px] font-bold uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1c1622" }}>{section}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-xs transition-colors hover:text-[#875aa0]" style={{ color: "#6b5585" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[#e8d8f5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#9d8ab0" }}>
            © {new Date().getFullYear()} Estilia. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "#9d8ab0" }}>
            Hecho con <span style={{ color: "#d3b87f" }}>♥</span> en Honduras
          </p>
        </div>
      </div>
    </footer>
  );
}
