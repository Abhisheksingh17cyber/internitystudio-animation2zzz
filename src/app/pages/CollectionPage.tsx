import { Navbar } from "../components/Navbar";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export function CollectionPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0B0B0B] text-[#F5F4F0]">
      <Navbar />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </div>
  );
}
