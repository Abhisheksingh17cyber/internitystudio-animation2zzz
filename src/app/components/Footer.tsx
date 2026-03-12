import { Anchor, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import logoImage from "../../assets/logo.png";

const footerLinks = {
  collection: [
    { label: "Handmade Decor", href: "/collection" },
    { label: "Artisan Jewelry", href: "/collection" },
    { label: "Handwoven Textiles", href: "/collection" },
    { label: "Wooden Crafts", href: "/collection" },
    { label: "Ceramics", href: "/collection" }
  ],
  company: [
    { label: "Our Story", href: "/craft" },
    { label: "The Artisans", href: "/artisans" },
    { label: "Craft Process", href: "/craft" },
    { label: "Sustainability", href: "/craft" },
    { label: "Press", href: "/contact" }
  ]
};

export function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#0B0B0B] border-t border-[#C6A15B]/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div 
              onClick={(e) => handleLinkClick(e as any, "/")}
              className="flex items-center justify-center md:justify-start gap-2 mb-6 group cursor-pointer"
            >
              <img 
                src={logoImage} 
                alt="Artisan's Anchor Logo" 
                className="w-6 h-6 object-contain transition-transform duration-300 group-hover:rotate-12"
              />
              <span
                className="text-[#F5F4F0] tracking-[0.2em] uppercase text-sm font-medium"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Artisan's Anchor
              </span>
            </div>

            <p
              className="text-[#D8D8D8]/60 mb-8 leading-relaxed max-w-sm mx-auto md:mx-0 text-sm md:text-[0.8rem]"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              Handcrafted goods made with intention, passed down with meaning.
              We exist to preserve the art of making — one piece at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 md:w-9 md:h-9 border border-[#C6A15B]/20 flex items-center justify-center text-[#D8D8D8]/40 hover:border-[#C6A15B] hover:text-[#C6A15B] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div className="text-center md:text-left">
            <p
              className="text-[#F5F4F0] text-sm md:text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              Collection
            </p>
            <ul className="space-y-4 md:space-y-3">
              {footerLinks.collection.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#D8D8D8]/60 hover:text-[#C6A15B] transition-colors duration-300 text-sm md:text-xs tracking-[0.08em]"
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <p
              className="text-[#F5F4F0] text-sm md:text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              Company
            </p>
            <ul className="space-y-4 md:space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#D8D8D8]/60 hover:text-[#C6A15B] transition-colors duration-300 text-sm md:text-xs tracking-[0.08em]"
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <p
              className="text-[#F5F4F0] text-sm md:text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              Contact
            </p>
            <ul className="space-y-5 md:space-y-4">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={16} className="text-[#C6A15B] shrink-0 mt-0.5" />
                <span
                  className="text-[#D8D8D8]/60 text-sm md:text-xs leading-relaxed"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                >
                  12 Craft Lane, Artisan Quarter
                  <br />
                  Edinburgh, EH1 2AB
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} className="text-[#C6A15B] shrink-0" />
                <a
                  href="mailto:hello@artisansanchor.com"
                  className="text-[#D8D8D8]/60 hover:text-[#C6A15B] transition-colors duration-300 text-sm md:text-xs"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                >
                  hello@artisansanchor.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} className="text-[#C6A15B] shrink-0" />
                <span
                  className="text-[#D8D8D8]/60 text-sm md:text-xs"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                >
                  +44 131 000 0000
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C6A15B]/10 px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p
            className="text-[#D8D8D8]/40 text-sm md:text-xs tracking-[0.1em]"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
          >
            © 2026 Artisan's Anchor. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#D8D8D8]/40 hover:text-[#C6A15B]/70 transition-colors duration-300 text-sm md:text-xs tracking-[0.08em]"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
