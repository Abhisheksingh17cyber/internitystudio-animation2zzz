import { useNavigate } from "react-router";
import { featuredProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";
import { Btn17 } from "./Btn17";

const FONT = { fontFamily: "Montserrat, sans-serif" };

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();

  function handleAddToCart(e: React.MouseEvent, product: (typeof featuredProducts)[0]) {
    e.stopPropagation();
    addItem(product);
    openCart();
  }

  return (
    <section id="collection" className="bg-[#F5F4F0] py-16 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <p
              className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-4"
              style={FONT}
            >
              Curated Selection
            </p>
            <h2
              className="text-[#0B0B0B] leading-[1.1]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
              }}
            >
              Featured
              <br />
              <em>Collection</em>
            </h2>
          </div>
          <Btn17 onClick={() => navigate("/shop")}>View All Pieces</Btn17>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image container */}
              <div className="relative overflow-hidden mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/30 transition-all duration-400 flex items-end justify-between p-5 opacity-0 group-hover:opacity-100">
                  <span
                    className="text-[#F5F4F0] text-xs tracking-[0.2em] uppercase border border-[#F5F4F0]/60 px-5 py-2.5 hover:bg-white/10 transition-colors"
                    style={FONT}
                  >
                    View Piece
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-10 h-10 bg-[#C6A15B] flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ShoppingBag size={15} className="text-white group-hover:text-[#C6A15B]" />
                  </button>
                </div>
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#C6A15B] px-3 py-1.5">
                    <p
                      className="text-white text-xs tracking-[0.15em] uppercase"
                      style={FONT}
                    >
                      {product.badge}
                    </p>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-4 right-4 bg-[#0B0B0B]/70 px-3 py-1.5">
                  <p
                    className="text-[#C6A15B] text-xs tracking-[0.12em] uppercase"
                    style={FONT}
                  >
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Card content */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-[#0B0B0B] group-hover:text-[#C6A15B] transition-colors duration-300"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.35rem",
                      fontWeight: 400,
                    }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-[#C6A15B] shrink-0"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.1rem",
                      fontWeight: 300,
                    }}
                  >
                    ${product.price}
                  </span>
                </div>
                <p
                  className="text-[#0B0B0B]/50 leading-relaxed"
                  style={{
                    ...FONT,
                    fontWeight: 300,
                    fontSize: "0.78rem",
                  }}
                >
                  {product.description.slice(0, 110)}…
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
