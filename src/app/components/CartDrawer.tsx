import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const FONT = { fontFamily: "Montserrat, sans-serif" };

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, openPayment, subtotal } =
    useCart();

  const shippingCost = subtotal >= 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-[110] bg-[#FDFBF7] shadow-2xl flex flex-col transition-transform duration-400 ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-7 py-4 md:py-5 border-b border-[#E8E4DC] bg-[#0B0B0B]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-[#C6A15B]" />
            <span
              className="text-[#F5F4F0] text-xs tracking-[0.2em] uppercase"
              style={FONT}
            >
              Your Cart
            </span>
            {state.items.length > 0 && (
              <span className="w-5 h-5 bg-[#C6A15B] flex items-center justify-center text-white text-xs">
                {state.items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-[#D8D8D8]/50 hover:text-[#D8D8D8] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Empty State */}
        {state.items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-8">
            <div className="w-16 h-16 bg-[#C6A15B]/10 flex items-center justify-center mb-5">
              <ShoppingBag size={28} className="text-[#C6A15B]/50" strokeWidth={1} />
            </div>
            <p
              className="text-[#0B0B0B]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                fontWeight: 300,
              }}
            >
              Your cart is empty
            </p>
            <p
              className="text-[#0B0B0B]/40 mt-2 max-w-xs"
              style={{ ...FONT, fontSize: "0.78rem" }}
            >
              Discover our handcrafted collection and find something timeless.
            </p>
            <button
              onClick={closeCart}
              className="mt-6 bg-[#0B0B0B] text-[#F5F4F0] px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#C6A15B] transition-colors duration-300"
              style={FONT}
            >
              Explore Collection
            </button>
          </div>
        )}

        {/* Cart Items */}
        {state.items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-4 md:py-5 space-y-5 md:space-y-6">
              {state.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-5 md:pb-6 border-b border-[#E8E4DC] last:border-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <div>
                        <p
                          className="text-[#0B0B0B] leading-snug mb-0.5"
                          style={{ ...FONT, fontSize: "0.8rem" }}
                        >
                          {item.product.name}
                        </p>
                        <p
                          className="text-[#0B0B0B]/40 text-xs"
                          style={FONT}
                        >
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 -mr-2 text-[#0B0B0B]/20 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center gap-0 border border-[#E8E4DC]">
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#F5F1E8] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="w-8 h-8 flex items-center justify-center text-[#0B0B0B] text-sm border-x border-[#E8E4DC]"
                          style={FONT}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#0B0B0B]/40 hover:text-[#0B0B0B] hover:bg-[#F5F1E8] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      {/* Price */}
                      <span
                        className="text-[#C6A15B]"
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals + CTA */}
            <div className="border-t border-[#E8E4DC] px-5 md:px-7 py-4 md:py-5 bg-[#F5F1E8]">
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-[#C6A15B]" : ""}>
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E4DC] pt-3 mt-2">
                  <span className="text-sm text-[#0B0B0B] tracking-[0.1em] uppercase" style={FONT}>
                    Total
                  </span>
                  <span
                    className="text-[#C6A15B]"
                    style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {subtotal < 100 && (
                <p className="text-xs text-[#0B0B0B]/40 mb-4 text-center" style={FONT}>
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <button
                onClick={openPayment}
                className="w-full flex items-center justify-center gap-2 bg-[#0B0B0B] text-[#F5F4F0] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C6A15B] transition-colors duration-300"
                style={FONT}
              >
                Checkout
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
