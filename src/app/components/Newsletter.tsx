import { useState } from "react";
import { Btn17 } from "./Btn17";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-[#0B0B0B] py-16 md:py-28 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C6A15B]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#C6A15B]/8" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Anchor icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-px bg-[#C6A15B]/40" />
          <svg
            className="mx-5 text-[#C6A15B]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="22" x2="12" y2="8" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
          <div className="w-12 h-px bg-[#C6A15B]/40" />
        </div>

        <p
          className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-5"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Stay Connected
        </p>

        <h2
          className="text-[#F5F4F0] mb-5 leading-[1.1]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
          }}
        >
          Join Our{" "}
          <em className="text-[#C6A15B]">Artisan Community</em>
        </h2>

        <p
          className="text-[#D8D8D8]/50 mb-12 max-w-md mx-auto"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
          }}
        >
          Receive stories from our workshops, first access to new collections,
          and invitations to our seasonal craft events.
        </p>

        {submitted ? (
          <div className="py-6">
            <div className="w-8 h-px bg-[#C6A15B] mx-auto mb-4" />
            <p
              className="text-[#C6A15B]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.3rem",
                fontStyle: "italic",
              }}
            >
              Welcome to the community.
            </p>
            <p
              className="text-[#D8D8D8]/50 mt-2 text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Your journey begins here.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-md mx-auto w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-[#F5F4F0]/10 border border-[#C6A15B]/30 px-6 py-4 text-[#F5F4F0] placeholder-[#D8D8D8]/30 outline-none focus:border-[#C6A15B] transition-colors duration-300 sm:border-r-0"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            />
            <div className="w-full sm:w-auto">
              <Btn17 type="submit">Subscribe</Btn17>
            </div>
          </form>
        )}

        <p
          className="text-[#D8D8D8]/30 text-xs mt-6"
          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
        >
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}