import { Navbar } from "../components/Navbar";
import { ArtisanShowcase } from "../components/ArtisanShowcase";
import { Footer } from "../components/Footer";

export function ArtisansPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0B0B0B] text-[#F5F4F0]">
      <Navbar />
      <ArtisanShowcase />
      <Footer />
    </div>
  );
}
