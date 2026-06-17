import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchResults } from "./SearchResults";

export const metadata = {
  title: "Buscar profesionales",
  description: "Encuentra los mejores profesionales de belleza y bienestar en Honduras.",
};

export default function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; ciudad?: string; categoria?: string }>;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20" style={{ background: "#faf8fd" }}>
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function SearchContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; ciudad?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  return <SearchResults q={params.q ?? ""} ciudad={params.ciudad ?? ""} categoria={params.categoria ?? ""} />;
}

function SearchSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="h-8 w-64 bg-[#e8d8f5] rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-[#e8d8f5] rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
