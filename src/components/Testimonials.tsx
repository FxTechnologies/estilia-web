const REVIEWS = [
  {
    name: "Sofía Martínez",
    city: "Tegucigalpa",
    service: "Corte y color",
    text: "Encontré a mi estilista ideal en minutos. El proceso de reserva es súper fácil y llegué puntual a mi cita. ¡Nunca volvería a llamar por teléfono!",
    stars: 5,
    initials: "SM",
    bg: "#875aa0",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Roberto Elvir",
    city: "San Pedro Sula",
    service: "Barbería",
    text: "La agenda del profesional está siempre actualizada. Reservo mi corte semanal en segundos y nunca he tenido problema con las citas.",
    stars: 5,
    initials: "RE",
    bg: "#4a2970",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Daniela Cruz",
    city: "La Ceiba",
    service: "Uñas",
    text: "Las fotos del portafolio me dieron total confianza antes de ir. El resultado fue exactamente lo que quería. ¡10/10!",
    stars: 5,
    initials: "DC",
    bg: "#d3b87f",
    avatar: "https://i.pravatar.cc/80?img=29",
  },
  {
    name: "Mariana López",
    city: "Tegucigalpa",
    service: "Spa & masajes",
    text: "Ideal para días ocupados. Reservo mi spa los domingos desde el teléfono sin hablar con nadie. La app es muy intuitiva.",
    stars: 5,
    initials: "ML",
    bg: "#875aa0",
    avatar: "https://i.pravatar.cc/80?img=43",
  },
  {
    name: "Carlos Soto",
    city: "Roatán",
    service: "Barbería",
    text: "Como profesional me ayudó a llenar mi agenda los primeros meses. Los clientes llegan con las expectativas muy claras gracias a mi portafolio.",
    stars: 5,
    initials: "CS",
    bg: "#4a2970",
    avatar: "https://i.pravatar.cc/80?img=8",
  },
  {
    name: "Valeria Funes",
    city: "San Pedro Sula",
    service: "Maquillaje",
    text: "Llegué al evento perfectamente maquillada. Reservé la misma mañana y todo salió perfecto. Estilia me salvó el día.",
    stars: 5,
    initials: "VF",
    bg: "#d3b87f",
    avatar: "https://i.pravatar.cc/80?img=56",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d3b87f">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, city, service, text, stars, initials, bg, avatar }: typeof REVIEWS[0]) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white border border-[#e8d8f5] p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <Stars n={stars} />
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#1c1622" }}>"{text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#e8d8f5]">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 relative"
             style={{ borderColor: bg, background: bg }}>
          {/* Initials fallback always rendered behind */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </span>
          <img
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="w-full h-full object-cover relative z-10"
          />
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: "#1c1622" }}>{name}</div>
          <div className="text-xs" style={{ color: "#6b5585" }}>{service} · {city}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 px-5" style={{ background: "#f5eefb" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#875aa0" }}>
            Testimonios
          </p>
          <h2 className="font-serif font-semibold text-4xl md:text-5xl" style={{ color: "#1c1622" }}>
            Lo que dicen nuestros{" "}
            <span className="text-gradient">clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(r => <ReviewCard key={r.name} {...r} />)}
        </div>
      </div>
    </section>
  );
}
