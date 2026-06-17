"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Star, Clock, ArrowLeft } from "lucide-react";
import { supabase, type Pro } from "@/lib/supabase";

const CITIES = ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Roatán", "Comayagua"];
const CATEGORIES = ["Barbería", "Salón de belleza", "Uñas", "Spa", "Maquillaje", "Masajes", "Pestañas", "Cejas"];

interface Props { q: string; ciudad: string; categoria: string }

export function SearchResults({ q: initQ, ciudad: initCiudad, categoria: initCat }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initQ);
  const [city, setCity] = useState(initCiudad);
  const [cat, setCat] = useState(initCat);
  const [pros, setPros] = useState<Pro[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string, c: string, cat: string) => {
    setLoading(true);
    setSearched(true);
    let req = supabase.from("pros").select("*").eq("role", "pro").order("avg_rating", { ascending: false }).limit(30);
    if (q)   req = req.ilike("name", `%${q}%`);
    if (c)   req = req.ilike("city", `%${c}%`);
    if (cat) req = req.ilike("category", `%${cat}%`);
    const { data } = await req;
    setPros(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (initQ || initCiudad || initCat) {
      search(initQ, initCiudad, initCat);
    }
  }, [initQ, initCiudad, initCat, search]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city) params.set("ciudad", city);
    if (cat) params.set("categoria", cat);
    router.push(`/buscar?${params.toString()}`);
    search(query, city, cat);
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Back */}
      <a href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#875aa0]" style={{ color: "#6b5585" }}>
        <ArrowLeft size={15} /> Volver al inicio
      </a>

      {/* Search bar */}
      <form onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl shadow-lg border border-[#e8d8f5] p-3 mb-8">
        <div className="flex items-center gap-3 flex-1 px-3 py-2 border border-[#e8d8f5] rounded-xl">
          <Search size={16} style={{ color: "#875aa0" }} className="shrink-0" />
          <input className="w-full text-sm outline-none bg-transparent placeholder:text-[#9d8ab0]"
                 style={{ color: "#1c1622" }} placeholder="Servicio o profesional..."
                 value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-3 sm:w-44 px-3 py-2 border border-[#e8d8f5] rounded-xl">
          <MapPin size={16} style={{ color: "#d3b87f" }} className="shrink-0" />
          <input className="w-full text-sm outline-none bg-transparent placeholder:text-[#9d8ab0]"
                 style={{ color: "#1c1622" }} placeholder="Ciudad"
                 value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <button type="submit"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
          Buscar
        </button>
      </form>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(c => (
          <button key={c} type="button"
                  onClick={() => { setCat(c === cat ? "" : c); search(query, city, c === cat ? "" : c); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${cat === c ? "bg-[#875aa0] border-[#875aa0] text-white" : "bg-white border-[#e8d8f5] text-[#6b5585] hover:border-[#875aa0]"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-[#e8d8f5] rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {!loading && searched && pros.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-semibold text-base mb-2" style={{ color: "#1c1622" }}>Sin resultados</p>
          <p className="text-sm" style={{ color: "#6b5585" }}>Intenta con otros términos o ciudad.</p>
        </div>
      )}

      {!loading && pros.length > 0 && (
        <>
          <p className="text-xs font-semibold mb-5" style={{ color: "#9d8ab0" }}>
            {pros.length} profesional{pros.length !== 1 ? "es" : ""} encontrado{pros.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pros.map(pro => <ProCard key={pro.id} pro={pro} />)}
          </div>
        </>
      )}

      {!loading && !searched && (
        <div className="text-center py-20">
          <p className="font-serif font-semibold text-2xl mb-3" style={{ color: "#1c1622" }}>
            ¿Qué servicio buscas hoy?
          </p>
          <p className="text-sm" style={{ color: "#6b5585" }}>Escribe un servicio, profesional o ciudad para comenzar.</p>
        </div>
      )}
    </div>
  );
}

function ProCard({ pro }: { pro: Pro }) {
  const initials = pro.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-[#e8d8f5] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="relative h-24 flex items-end px-4"
           style={{ background: "linear-gradient(135deg,#1c1622,#4a2970)" }}>
        <div className="w-12 h-12 rounded-xl border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg translate-y-6"
             style={{ background: "#875aa0" }}>
          {pro.avatar_url
            ? <img src={pro.avatar_url} alt={pro.name} className="w-full h-full object-cover rounded-xl" />
            : initials}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-8 pb-4 gap-2">
        <div>
          <h3 className="text-sm font-bold" style={{ color: "#1c1622" }}>{pro.name}</h3>
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "#f5eefb", color: "#875aa0" }}>
            {pro.category}
          </span>
        </div>

        {pro.avg_rating != null && (
          <div className="flex items-center gap-1">
            <Star size={11} fill="#d3b87f" stroke="none" />
            <span className="text-xs font-bold" style={{ color: "#1c1622" }}>{pro.avg_rating.toFixed(1)}</span>
            {pro.review_count != null && (
              <span className="text-xs" style={{ color: "#9d8ab0" }}>({pro.review_count})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <MapPin size={11} style={{ color: "#d3b87f" }} />
          <span className="text-[10px]" style={{ color: "#6b5585" }}>{pro.city}</span>
        </div>

        {pro.bio && (
          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "#6b5585" }}>{pro.bio}</p>
        )}

        <div className="mt-auto pt-3 border-t border-[#e8d8f5]">
          {pro.whatsapp ? (
            <a href={`https://wa.me/${pro.whatsapp.replace(/\D/g, "")}`}
               target="_blank" rel="noopener noreferrer"
               className="block text-center text-xs font-bold py-2 px-4 rounded-full text-white"
               style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
              Reservar por WhatsApp
            </a>
          ) : (
            <button className="w-full text-xs font-bold py-2 px-4 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg,#875aa0,#4a2970)" }}>
              Ver perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
