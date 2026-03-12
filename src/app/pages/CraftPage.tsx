import { Navbar } from "../components/Navbar";
import { AboutCraft } from "../components/AboutCraft";
import { CraftProcess } from "../components/CraftProcess";
import { Footer } from "../components/Footer";

export function CraftPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0B0B0B] text-[#F5F4F0]">
      <Navbar />
      <AboutCraft />
      <CraftProcess />
      <Footer />
    </div>
  );
}
