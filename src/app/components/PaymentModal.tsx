import { useState, useEffect } from "react";
import {
  X,
  Lock,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";

type Step = "review" | "shipping" | "payment" | "success";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface CardInfo {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const FONT = { fontFamily: "Montserrat, sans-serif" };

function detectCardBrand(num: string): string {
  const n = num.replace(/\s/g, "");
  if (n.startsWith("4")) return "VISA";
  if (n.startsWith("5") || (n >= "2221" && n <= "2720")) return "MC";
  if (n.startsWith("34") || n.startsWith("37")) return "AMEX";
  return "";
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

const steps: Step[] = ["review", "shipping", "payment", "success"];
const stepLabels = ["Review", "Shipping", "Payment", "Done"];

export function PaymentModal() {
  const { state, closePayment, clearCart, subtotal } = useCart();
  const [step, setStep] = useState<Step>("review");
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [card, setCard] = useState<CardInfo>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cvvFocused, setCvvFocused] = useState(false);

  useEffect(() => {
    if (state.isPaymentOpen) {
      setStep("review");
      setProcessing(false);
      setErrors({});
    }
  }, [state.isPaymentOpen]);

  if (!state.isPaymentOpen) return null;

  const shippingCost = subtotal >= 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const currentStepIdx = steps.indexOf(step);

  function validateShipping() {
    const e: Record<string, string> = {};
    if (!shipping.firstName.trim()) e.firstName = "Required";
    if (!shipping.lastName.trim()) e.lastName = "Required";
    if (!shipping.email.trim() || !shipping.email.includes("@"))
      e.email = "Valid email required";
    if (!shipping.address.trim()) e.address = "Required";
    if (!shipping.city.trim()) e.city = "Required";
    if (!shipping.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateCard() {
    const e: Record<string, string> = {};
    const rawNum = card.number.replace(/\s/g, "");
    if (rawNum.length < 13) e.number = "Invalid card number";
    if (!card.name.trim()) e.name = "Required";
    const [mm] = card.expiry.split("/");
    if (card.expiry.length < 5 || parseInt(mm) > 12 || parseInt(mm) < 1)
      e.expiry = "Invalid expiry";
    if (card.cvv.length < 3) e.cvv = "Invalid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === "review") setStep("shipping");
    else if (step === "shipping") {
      if (validateShipping()) setStep("payment");
    } else if (step === "payment") {
      if (validateCard()) {
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
          setStep("success");
          clearCart();
        }, 2200);
      }
    }
  }

  const brand = detectCardBrand(card.number);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => step !== "success" && closePayment()}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-[#FDFBF7] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[92vh] flex flex-col"
        style={{ borderRadius: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5 border-b border-[#E8E4DC] bg-[#0B0B0B]">
          <div className="flex items-center gap-3">
            <Lock size={14} className="text-[#C6A15B]" />
            <span
              className="text-[#F5F4F0] text-xs tracking-[0.2em] uppercase"
              style={FONT}
            >
              Secure Checkout
            </span>
          </div>
          {step !== "success" && (
            <button onClick={closePayment} className="text-[#D8D8D8]/50 hover:text-[#D8D8D8] transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Step Progress */}
        {step !== "success" && (
          <div className="flex items-center gap-0 px-5 md:px-8 py-3 md:py-4 bg-[#F5F1E8] border-b border-[#E8E4DC] overflow-x-auto no-scrollbar">
            {steps.slice(0, 3).map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-xs transition-colors duration-300 ${
                      i <= currentStepIdx
                        ? "bg-[#C6A15B] text-white"
                        : "bg-[#D8D8D8]/30 text-[#0B0B0B]/30"
                    }`}
                    style={FONT}
                  >
                    {i < currentStepIdx ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs tracking-[0.1em] uppercase transition-colors duration-300 ${
                      i <= currentStepIdx
                        ? "text-[#0B0B0B]"
                        : "text-[#0B0B0B]/30"
                    }`}
                    style={FONT}
                  >
                    {stepLabels[i]}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 h-px mx-3 transition-colors duration-300 ${
                      i < currentStepIdx ? "bg-[#C6A15B]" : "bg-[#D8D8D8]/40"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">

          {/* ── STEP: REVIEW ── */}
          {step === "review" && (
            <div className="px-5 md:px-8 py-5 md:py-6">
              <p className="text-[#0B0B0B]/50 text-xs tracking-[0.2em] uppercase mb-5" style={FONT}>
                Order Summary
              </p>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[#0B0B0B] truncate"
                        style={{ ...FONT, fontSize: "0.82rem" }}
                      >
                        {item.product.name}
                      </p>
                      <p
                        className="text-[#0B0B0B]/40 text-xs mt-0.5"
                        style={FONT}
                      >
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span
                      className="text-[#C6A15B] shrink-0"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.1rem",
                      }}
                    >
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-[#E8E4DC] pt-5 space-y-2">
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs text-[#0B0B0B]/50" style={FONT}>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E4DC] pt-3 mt-3">
                  <span className="text-[#0B0B0B] text-sm tracking-[0.1em] uppercase" style={FONT}>
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

              {subtotal >= 100 && (
                <div className="mt-4 flex items-center gap-2 bg-[#C6A15B]/10 px-4 py-2.5">
                  <Truck size={14} className="text-[#C6A15B]" />
                  <span className="text-[#C6A15B] text-xs tracking-[0.1em]" style={FONT}>
                    You qualify for free shipping!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ── STEP: SHIPPING ── */}
          {step === "shipping" && (
            <div className="px-5 md:px-8 py-5 md:py-6">
              <p className="text-[#0B0B0B]/50 text-xs tracking-[0.2em] uppercase mb-4 md:mb-5" style={FONT}>
                Shipping Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "firstName", label: "First Name", col: 1 },
                  { key: "lastName", label: "Last Name", col: 1 },
                  { key: "email", label: "Email Address", col: 2 },
                  { key: "address", label: "Street Address", col: 2 },
                  { key: "city", label: "City", col: 1 },
                  { key: "zip", label: "ZIP / Postal Code", col: 1 },
                ].map(({ key, label, col }) => (
                  <div key={key} className={col === 2 ? "sm:col-span-2" : ""}>
                    <label
                      className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5"
                      style={FONT}
                    >
                      {label}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      value={shipping[key as keyof ShippingInfo]}
                      onChange={(e) => {
                        setShipping((prev) => ({ ...prev, [key]: e.target.value }));
                        setErrors((prev) => ({ ...prev, [key]: "" }));
                      }}
                      className={`w-full bg-white border px-4 py-3 text-sm text-[#0B0B0B] outline-none transition-colors duration-200 ${
                        errors[key]
                          ? "border-red-400"
                          : "border-[#D8D8D8] focus:border-[#C6A15B]"
                      }`}
                      style={FONT}
                    />
                    {errors[key] && (
                      <p className="text-red-400 text-xs mt-1" style={FONT}>
                        {errors[key]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5" style={FONT}>
                    Country
                  </label>
                  <select
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping((prev) => ({ ...prev, country: e.target.value }))
                    }
                    className="w-full bg-white border border-[#D8D8D8] focus:border-[#C6A15B] px-4 py-3 text-sm text-[#0B0B0B] outline-none"
                    style={FONT}
                  >
                    {["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "India"].map(
                      (c) => (
                        <option key={c}>{c}</option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: PAYMENT ── */}
          {step === "payment" && (
            <div className="px-5 md:px-8 py-5 md:py-6">
              <p className="text-[#0B0B0B]/50 text-xs tracking-[0.2em] uppercase mb-5" style={FONT}>
                Payment Details
              </p>

              {/* Card Preview */}
              <div className="relative h-44 mb-6 overflow-hidden" style={{ perspective: "1000px" }}>
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: cvvFocused ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#2C2412] via-[#3D3020] to-[#0B0B0B] p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-7 bg-gradient-to-br from-[#C6A15B] to-[#8B6F47] rounded-sm" />
                      {brand && (
                        <span
                          className="text-white/80 text-sm tracking-wider"
                          style={FONT}
                        >
                          {brand === "VISA" ? "VISA" : brand === "MC" ? "MASTERCARD" : "AMEX"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-white/90 tracking-[0.25em] mb-3"
                        style={{ fontFamily: "monospace", fontSize: "1.1rem", letterSpacing: "0.2em" }}
                      >
                        {card.number || "•••• •••• •••• ••••"}
                      </p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/40 text-xs mb-0.5" style={FONT}>Card Holder</p>
                          <p
                            className="text-white/80 text-sm tracking-wider uppercase"
                            style={FONT}
                          >
                            {card.name || "Your Name"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/40 text-xs mb-0.5" style={FONT}>Expires</p>
                          <p className="text-white/80 text-sm tracking-wider" style={{ fontFamily: "monospace" }}>
                            {card.expiry || "MM/YY"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1410] to-[#0B0B0B] flex flex-col justify-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="w-full h-10 bg-[#1a1410] mb-6" />
                    <div className="px-6 flex items-center justify-end">
                      <div className="bg-[#F5F1E8] flex-1 h-9 mr-3" />
                      <div className="bg-[#F5F1E8] w-16 h-9 flex items-center justify-center">
                        <span className="text-[#0B0B0B] text-sm" style={{ fontFamily: "monospace" }}>
                          {card.cvv || "•••"}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/30 text-xs text-right pr-6 mt-2" style={FONT}>CVV</p>
                  </div>
                </div>
              </div>

              {/* Card Form */}
              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5" style={FONT}>
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={card.number}
                      onChange={(e) => {
                        setCard((p) => ({ ...p, number: formatCardNumber(e.target.value) }));
                        setErrors((p) => ({ ...p, number: "" }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full bg-white border px-4 py-3 text-sm text-[#0B0B0B] outline-none pr-12 transition-colors duration-200 ${
                        errors.number ? "border-red-400" : "border-[#D8D8D8] focus:border-[#C6A15B]"
                      }`}
                      style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}
                    />
                    <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B0B0B]/30" />
                  </div>
                  {errors.number && <p className="text-red-400 text-xs mt-1" style={FONT}>{errors.number}</p>}
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5" style={FONT}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => {
                      setCard((p) => ({ ...p, name: e.target.value }));
                      setErrors((p) => ({ ...p, name: "" }));
                    }}
                    placeholder="As shown on card"
                    className={`w-full bg-white border px-4 py-3 text-sm text-[#0B0B0B] outline-none transition-colors duration-200 ${
                      errors.name ? "border-red-400" : "border-[#D8D8D8] focus:border-[#C6A15B]"
                    }`}
                    style={FONT}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1" style={FONT}>{errors.name}</p>}
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5" style={FONT}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={card.expiry}
                      onChange={(e) => {
                        setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }));
                        setErrors((p) => ({ ...p, expiry: "" }));
                      }}
                      placeholder="MM / YY"
                      className={`w-full bg-white border px-4 py-3 text-sm text-[#0B0B0B] outline-none transition-colors duration-200 ${
                        errors.expiry ? "border-red-400" : "border-[#D8D8D8] focus:border-[#C6A15B]"
                      }`}
                      style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}
                    />
                    {errors.expiry && <p className="text-red-400 text-xs mt-1" style={FONT}>{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-[#0B0B0B]/50 tracking-[0.15em] uppercase mb-1.5" style={FONT}>
                      CVV
                    </label>
                    <input
                      type="text"
                      value={card.cvv}
                      maxLength={4}
                      onChange={(e) => {
                        setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }));
                        setErrors((p) => ({ ...p, cvv: "" }));
                      }}
                      onFocus={() => setCvvFocused(true)}
                      onBlur={() => setCvvFocused(false)}
                      placeholder="•••"
                      className={`w-full bg-white border px-4 py-3 text-sm text-[#0B0B0B] outline-none transition-colors duration-200 ${
                        errors.cvv ? "border-red-400" : "border-[#D8D8D8] focus:border-[#C6A15B]"
                      }`}
                      style={{ fontFamily: "monospace", letterSpacing: "0.2em" }}
                    />
                    {errors.cvv && <p className="text-red-400 text-xs mt-1" style={FONT}>{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              {/* Order total reminder */}
              <div className="mt-5 flex items-center justify-between border-t border-[#E8E4DC] pt-4">
                <span className="text-xs text-[#0B0B0B]/50 tracking-[0.1em] uppercase" style={FONT}>
                  Total to charge
                </span>
                <span
                  className="text-[#C6A15B]"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* ── STEP: SUCCESS ── */}
          {step === "success" && (
            <div className="px-5 md:px-8 py-12 md:py-16 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#C6A15B]/10 flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-[#C6A15B]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-[#0B0B0B] mb-3"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}
              >
                Order Confirmed
              </h3>
              <p className="text-[#0B0B0B]/50 mb-2 max-w-xs" style={{ ...FONT, fontSize: "0.8rem" }}>
                Thank you for your order! A confirmation has been sent to <strong>{shipping.email || "your email"}</strong>.
              </p>
              <p className="text-[#0B0B0B]/30 mb-8 max-w-xs" style={{ ...FONT, fontSize: "0.75rem" }}>
                Your handcrafted piece will be carefully packaged and dispatched within 2–3 business days.
              </p>
              <div className="flex items-center gap-2 bg-[#C6A15B]/10 px-5 py-3 mb-8">
                <Truck size={14} className="text-[#C6A15B]" />
                <span className="text-[#C6A15B] text-xs tracking-[0.1em]" style={FONT}>
                  Estimated delivery: 5–7 business days
                </span>
              </div>
              <button
                onClick={closePayment}
                className="bg-[#0B0B0B] text-[#F5F4F0] px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#C6A15B] transition-colors duration-300"
                style={FONT}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== "success" && (
          <div className="px-5 md:px-8 py-4 md:py-5 border-t border-[#E8E4DC] bg-[#F5F1E8] flex items-center justify-between gap-4">
            {/* Back */}
            {step !== "review" ? (
              <button
                onClick={() => {
                  if (step === "shipping") setStep("review");
                  else if (step === "payment") setStep("shipping");
                }}
                className="flex items-center gap-2 text-xs text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors tracking-[0.15em] uppercase"
                style={FONT}
              >
                <ArrowLeft size={14} />
                Back
              </button>
            ) : (
              <div className="flex items-center gap-2 text-[#0B0B0B]/30">
                <ShoppingBag size={14} />
                <span className="text-xs tracking-[0.1em]" style={FONT}>
                  {state.items.length} item{state.items.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/* Next / Pay */}
            <button
              onClick={handleNext}
              disabled={processing || state.items.length === 0}
              className="flex items-center gap-2 bg-[#0B0B0B] disabled:opacity-40 text-[#F5F4F0] px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#C6A15B] transition-colors duration-300"
              style={FONT}
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : step === "payment" ? (
                <>
                  <Lock size={13} />
                  Pay ${total.toFixed(2)}
                </>
              ) : (
                <>
                  {step === "review" ? "Proceed to Shipping" : "Continue to Payment"}
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
