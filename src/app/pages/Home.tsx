import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustBadges } from "../components/TrustBadges";
import { AboutCraft } from "../components/AboutCraft";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { CraftProcess } from "../components/CraftProcess";
import { ArtisanShowcase } from "../components/ArtisanShowcase";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBadges />
      <AboutCraft />
      <FeaturedProducts />
      <CraftProcess />
      <ArtisanShowcase />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
