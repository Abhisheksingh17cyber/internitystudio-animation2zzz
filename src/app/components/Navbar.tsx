import { useState, useEffect } from "react";
import { Menu, X, Anchor, ShoppingBag } from "lucide-react";
import { Btn17 } from "./Btn17";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router";
import "../styles/nav-outline.css";

const navLinks = [
  { label: "Collection", href: "#collection" },
  { label: "Craft", href: "#craft" },
  { label: "Artisans", href: "#artisans" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0B0B]/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="flex items-center gap-2 group shrink-0"
        >
          <Anchor
            size={20}
            className="text-[#C6A15B] transition-transform duration-300 group-hover:rotate-12"
          />
          <span
            className="text-[#F5F4F0] tracking-[0.2em] uppercase text-sm"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Artisan's Anchor
          </span>
        </a>

        {/* ── Desktop Nav – Uiverse animated outline ── */}
        <div className="nav-outline-wrapper hidden md:block">
          <div className="nav-outline-container">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="nav-outline-btn"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </button>
            ))}
            <svg
              className="nav-outline-svg"
              overflow="visible"
              width="580"
              height="44"
              viewBox="0 0 580 44"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className="nav-outline-rect"
                pathLength="100"
                x="0"
                y="0"
                width="580"
                height="44"
                fill="transparent"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* ── Right: CTA + Cart ── */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Cart icon */}
          <button
            onClick={openCart}
            className="relative text-[#D8D8D8] hover:text-[#C6A15B] transition-colors duration-300"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C6A15B] flex items-center justify-center text-white text-[9px] rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <Btn17 href="#collection">Shop Now</Btn17>
        </div>

        {/* ── Mobile Right ── */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative text-[#D8D8D8] hover:text-[#C6A15B] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C6A15B] flex items-center justify-center text-white text-[9px] rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-[#F5F4F0]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0B0B]/98 px-6 pt-4 pb-8 border-t border-[#C6A15B]/20">
          <ul className="flex flex-col gap-4 mt-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className="w-full text-left py-3 text-[#D8D8D8] hover:text-[#C6A15B] transition-colors duration-300 tracking-[0.2em] uppercase text-base"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
