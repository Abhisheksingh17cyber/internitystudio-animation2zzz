import { Navbar } from "../components/Navbar";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0B0B0B] text-[#F5F4F0]">
      <Navbar />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
