import { Navbar }             from "@/components/Navbar";
import { Hero }               from "@/components/Hero";
import { TrustStrip }         from "@/components/TrustStrip";
import { Categories }         from "@/components/Categories";
import { FeaturedBusinesses } from "@/components/FeaturedBusinesses";
import { AppDownloadBanner }  from "@/components/AppDownloadBanner";
import { Testimonials }       from "@/components/Testimonials";
import { ForBusiness }        from "@/components/ForBusiness";
import { Footer }             from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Categories />
        <FeaturedBusinesses />
        <AppDownloadBanner />
        <Testimonials />
        <ForBusiness />
      </main>
      <Footer />
    </>
  );
}
