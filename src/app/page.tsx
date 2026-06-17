import { Navbar }              from "@/components/Navbar";
import { Hero }                from "@/components/Hero";
import { FeaturedBusinesses }  from "@/components/FeaturedBusinesses";
import { Services }            from "@/components/Services";
import { HowItWorks }          from "@/components/HowItWorks";
import { ForPros }             from "@/components/ForPros";
import { Testimonials }        from "@/components/Testimonials";
import { AppDownload }         from "@/components/AppDownload";
import { Footer }              from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedBusinesses />
        <Services />
        <HowItWorks />
        <ForPros />
        <Testimonials />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
