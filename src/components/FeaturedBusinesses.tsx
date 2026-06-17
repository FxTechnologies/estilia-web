import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { supabase, type Pro } from "@/lib/supabase";

const FALLBACK: Pro[] = [
  {
    id: "1", name: "Urban Face Barbershop", category: "Barbería",
    city: "Col. Palmira, Tegucigalpa", bio: null,
    avatar_url: null, avg_rating: 4.9, review_count: 142, whatsapp: null, role: "pro",
  },
  {
    id: "2", name: "Glam Studio HN", category: "Salón de belleza",
    city: "Zona Viva, La Ceiba", bio: null,
    avatar_url: null, avg_rating: 4.8, review_count: 98, whatsapp: null, role: "pro",
  },
  {
    id: "3", name: "Nail Art Studio", category: "Uñas",
    city: "Barrio Río de Piedras, SPS", bio: null,
    avatar_url: null, avg_rating: 4.7, review_count: 75, whatsapp: null, role: "pro",
  },
  {
    id: "4", name: "Zen Spa & Wellness", category: "Spa",
    city: "West Bay, Roatán", bio: null,
    avatar_url: null, avg_rating: 5.0, review_count: 61, whatsapp: null, role: "pro",
  },
];

const CARD_COLORS = [
  { bg: "#1c1622", accent: "#875aa0" },
  { bg: "#4a2970", accent: "#d3b87f" },
  { bg: "#875aa0", accent: "#d3b87f" },
  { bg: "#2d1b4e", accent: "#875aa0" },
];

async function getTopPros(): Promise<Pro[]> {
  const { data } = await supabase
    .from("pros")
    .select("*")
    .eq("role", "pro")
    .not("avg_rating", "is", null)
    .order("avg_rating", { ascending: false })
    .limit(4);
  return data && data.length >= 2 ? (data as Pro[]) : FALLBACK;
}

function ProCard({ pro, index }: { pro: Pro; index: number }) {
  const { bg, accent } = CARD_COLORS[index % CARD_COLORS.length];
  const initials = pro.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
  const isPremium = (pro.avg_rating ?? 0) >= 4.8;
  const href = pro.whatsapp
    ? `https://wa.me/${pro.whatsapp.replace(/\D/g, "")}`
    : `/buscar?q=${encodeURIComponent(pro.name)}`;

  return (
    <a href={href}
       target={pro.whatsapp ? "_blank" : undefined}
       rel={pro.whatsapp ? "noopener noreferrer" : undefined}
       className="group flex flex-col rounded-2xl overflow-hidden border border-[#e8d8f5] bg-white
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Header banner */}
      <div className="relative h-28 flex items-end px-4 pb-0"
           style={{ background: `linear-gradient(135deg, ${bg} 0%, ${accent}55 100%)` }}>
        {isPremium && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
               style={{ background: "#d3b87f", color: "#1c1622" }}>
            <Star size={8} fill="#1c1622" stroke="none" /> Premium
          </div>
        )}
        <div className="w-14 h-14 rounded-2xl border-2 border-white flex items-center justify-center
                        text-base font-bold text-white shadow-lg translate-y-7 overflow-hidden"
             style={{ background: bg }}>
          {pro.avatar_url
            ? <img src={pro.avatar_url} alt={pro.name} className="w-full h-full object-cover" />
            : initials}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-9 pb-4 gap-3">
        <div>
          <h3 className="text-sm font-bold leading-snug" style={{ color: "#1c1622" }}>{pro.name}</h3>
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "#f5eefb", color: "#875aa0" }}>
            {pro.category}
          </span>
        </div>

        {pro.avg_rating != null && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24"
                     fill={i <= Math.round(pro.avg_rating!) ? "#d3b87f" : "#e8d8f5"}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold" style={{ color: "#1c1622" }}>{pro.avg_rating.toFixed(1)}</span>
            {pro.review_count != null && (
              <span className="text-xs" style={{ color: "#9d8ab0" }}>({pro.review_count})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <MapPin size={11} style={{ color: "#d3b87f" }} />
          <span className="text-[10px] truncate" style={{ color: "#6b5585" }}>{pro.city}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock size={11} style={{ color: "#875aa0" }} />
          <span className="text-[10px]" style={{ color: "#875aa0" }}>Disponible hoy</span>
        </div>

        {pro.bio && (
          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "#6b5585" }}>{pro.bio}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e8d8f5]">
          <span className="text-xs font-semibold" style={{ color: "#6b5585" }}>Ver perfil</span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white transition-all
                           group-hover:shadow-md"
                style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
            Reservar
          </span>
        </div>
      </div>
    </a>
  );
}

export async function FeaturedBusinesses() {
  const pros = await getTopPros();

  return (
    <section id="negocios" className="py-24 px-5" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#875aa0" }}>
              Negocios destacados
            </p>
            <h2 className="font-serif font-semibold text-4xl md:text-5xl" style={{ color: "#1c1622" }}>
              Los mejores cerca{" "}
              <span className="text-gradient">de ti</span>
            </h2>
          </div>
          <a href="/buscar" className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-colors hover:text-[#4a2970]"
             style={{ color: "#875aa0" }}>
            Ver todos <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pros.map((pro, i) => <ProCard key={pro.id} pro={pro} index={i} />)}
        </div>
      </div>
    </section>
  );
}
