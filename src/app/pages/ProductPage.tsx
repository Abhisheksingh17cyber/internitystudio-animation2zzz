import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
  ChevronRight,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const FONT = { fontFamily: "Montserrat, sans-serif" };

const reviews = [
  {
    name: "Eleanor M.",
    rating: 5,
    text: "Absolutely stunning craftsmanship. The quality far exceeded my expectations — truly a heirloom piece.",
  },
  {
    name: "James T.",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and the product itself is simply extraordinary. Worth every penny.",
  },
  {
    name: "Sophia K.",
    rating: 4,
    text: "Beautifully made. The attention to detail is remarkable. I've received so many compliments already.",
  },
];

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, openCart, openPayment } = useCart();

  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Related products (same category, excluding this one)
  const related = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 3);
  const fallbackRelated = products.filter((p) => p.id !== id).slice(0, 3);
  const relatedProducts = related.length >= 2 ? related : fallbackRelated;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <p
            className="text-[#0B0B0B]/40 mb-4"
            style={{ ...FONT, fontSize: "0.875rem" }}
          >
            Product not found.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-[#C6A15B] text-sm underline underline-offset-4"
            style={FONT}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product!, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  }

  function handleBuyNow() {
    addItem(product!, qty);
    openPayment();
  }

  return (
    <div
      className="min-h-screen bg-[#FDFBF7]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="pt-24 md:pt-28 pb-0 px-6 bg-[#F5F1E8] border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button
            onClick={() => navigate("/")}
            className="text-[#0B0B0B]/40 hover:text-[#C6A15B] transition-colors text-xs tracking-[0.1em] uppercase flex items-center gap-1 shrink-0"
            style={FONT}
          >
            <ArrowLeft size={12} />
            Home
          </button>
          <ChevronRight size={12} className="text-[#0B0B0B]/20 shrink-0" />
          <span className="text-[#0B0B0B]/40 text-xs tracking-[0.1em] uppercase shrink-0" style={FONT}>
            {product.category}
          </span>
          <ChevronRight size={12} className="text-[#0B0B0B]/20 shrink-0" />
          <span className="text-[#0B0B0B] text-xs tracking-[0.1em] uppercase shrink-0" style={FONT}>
            {product.name}
          </span>
        </div>
      </div>

      {/* ── Main Product Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left: Images */}
          <div className="space-y-4">
            {/* Hero image */}
            <div className="relative overflow-hidden aspect-square md:aspect-[4/5] bg-[#F5F1E8]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-[#C6A15B] px-3 py-1.5">
                  <span className="text-white text-xs tracking-[0.15em] uppercase" style={FONT}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnail strip (same image, different crops) */}
            <div className="grid grid-cols-3 gap-3">
              {["top", "center", "bottom"].map((pos, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#C6A15B] transition-colors"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: pos }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:sticky lg:top-28">
            {/* Category */}
            <p className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-3" style={FONT}>
              {product.category}
            </p>

            {/* Name */}
            <h1
              className="text-[#0B0B0B] leading-[1.1] mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 8vw, 3rem)",
                fontWeight: 300,
              }}
            >
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    className={s <= 5 ? "text-[#C6A15B]" : "text-[#D8D8D8]"}
                    fill={s <= 5 ? "#C6A15B" : "none"}
                  />
                ))}
              </div>
              <span className="text-[#0B0B0B]/40 text-xs" style={FONT}>
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 md:mb-8">
              <span
                className="text-[#C6A15B]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "2.4rem",
                  fontWeight: 300,
                }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[#0B0B0B]/30 text-xs tracking-[0.1em]" style={FONT}>
                USD
              </span>
            </div>

            {/* Description */}
            <p
              className="text-[#0B0B0B]/60 leading-relaxed mb-6 md:mb-8"
              style={{ ...FONT, fontWeight: 300, fontSize: "0.9rem" }}
            >
              {product.description}
            </p>

            {/* Highlights */}
            <div className="mb-6 md:mb-8">
              <p className="text-[#0B0B0B] text-xs tracking-[0.2em] uppercase mb-4" style={FONT}>
                Highlights
              </p>
              <ul className="space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-[#C6A15B]/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Check size={10} className="text-[#C6A15B]" />
                    </div>
                    <span
                      className="text-[#0B0B0B]/60"
                      style={{ ...FONT, fontSize: "0.85rem", fontWeight: 300 }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-xs tracking-[0.15em] uppercase text-[#0B0B0B]/50 shrink-0" style={FONT}>
                Quantity
              </p>
              <div className="flex items-center border border-[#E8E4DC] w-full max-w-[120px]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex-1 h-10 flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#F5F1E8] transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span
                  className="w-10 h-10 flex items-center justify-center text-[#0B0B0B] border-x border-[#E8E4DC]"
                  style={FONT}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex-1 h-10 flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#F5F1E8] transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 border border-[#0B0B0B] text-[#0B0B0B] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#0B0B0B] hover:text-[#F5F4F0] transition-all duration-300"
                style={FONT}
              >
                {addedToCart ? (
                  <>
                    <Check size={14} className="text-[#C6A15B]" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-[#C6A15B] text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#0B0B0B] transition-all duration-300"
                style={FONT}
              >
                Buy Now
              </button>
            </div>

            {/* Trust signals */}
            <div className="border-t border-[#E8E4DC] pt-6 space-y-4">
              {[
                { icon: Truck, text: "Free shipping on orders over $100" },
                { icon: RefreshCw, text: "30-day hassle-free returns" },
                { icon: ShieldCheck, text: "Lifetime craftsmanship guarantee" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-[#C6A15B] shrink-0" strokeWidth={1.5} />
                  <span className="text-[#0B0B0B]/60 text-sm md:text-xs" style={FONT}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <section className="bg-[#F5F1E8] py-12 md:py-20 px-6 border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-4 text-center md:text-left" style={FONT}>
            Customer Reviews
          </p>
          <h2
            className="text-[#0B0B0B] mb-8 md:mb-12 text-center md:text-left"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 300 }}
          >
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-[#FDFBF7] p-6 md:p-7">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className={s <= review.rating ? "text-[#C6A15B]" : "text-[#D8D8D8]"}
                      fill={s <= review.rating ? "#C6A15B" : "none"}
                    />
                  ))}
                </div>
                <p
                  className="text-[#0B0B0B]/60 leading-relaxed mb-5"
                  style={{ ...FONT, fontWeight: 300, fontSize: "0.85rem" }}
                >
                  "{review.text}"
                </p>
                <p className="text-[#0B0B0B] text-xs tracking-[0.1em]" style={FONT}>
                  — {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      <section className="py-12 md:py-20 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-4" style={FONT}>
            You May Also Like
          </p>
          <h2
            className="text-[#0B0B0B] mb-12"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 300 }}
          >
            Related <em>Pieces</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/20 transition-all duration-300" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-[#0B0B0B] group-hover:text-[#C6A15B] transition-colors"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem" }}
                    >
                      {p.name}
                    </h3>
                    <p className="text-[#0B0B0B]/40 text-xs mt-1" style={FONT}>
                      {p.category}
                    </p>
                  </div>
                  <span
                    className="text-[#C6A15B] shrink-0"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}
                  >
                    ${p.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
