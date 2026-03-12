import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "I received my leather journal and I was moved to tears. The craftsmanship is extraordinary — you can feel years of mastery in every stitch. It's not an object, it's a heirloom.",
    name: "Eleanor Whitfield",
    location: "London, UK",
    initials: "EW",
  },
  {
    id: 2,
    quote:
      "The woven throw blanket I ordered has become the centrepiece of my home. The quality of the wool and the precision of the weave are unlike anything I've seen in modern retail.",
    name: "Marco Pellegrini",
    location: "Florence, Italy",
    initials: "MP",
  },
  {
    id: 3,
    quote:
      "Artisan's Anchor restored my faith that truly beautiful things are still being made. The oak bowl I purchased is perfection — every meal I prepare feels like a ceremony.",
    name: "Saoirse Ó'Brien",
    location: "Dublin, Ireland",
    initials: "SÓ",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#F5F4F0] py-16 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Voices
          </p>
          <h2
            className="text-[#0B0B0B] leading-[1.1]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
            }}
          >
            What Our Collectors{" "}
            <em>Say</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAFAF7] p-6 md:p-8 border border-[#D8D8D8] hover:border-[#C6A15B]/50 hover:shadow-lg transition-all duration-400 group"
              style={{ boxShadow: "0 2px 20px rgba(11,11,11,0.04)" }}
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-[#C6A15B]/40 mb-6 group-hover:text-[#C6A15B]/70 transition-colors duration-300"
              />

              {/* Quote text */}
              <p
                className="text-[#0B0B0B]/70 leading-relaxed mb-8 italic"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.05rem",
                  fontWeight: 300,
                }}
              >
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-[#C6A15B] mb-5" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C6A15B]/20 flex items-center justify-center shrink-0">
                  <span
                    className="text-[#C6A15B] text-xs"
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[#0B0B0B]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.05rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#0B0B0B]/40 text-xs tracking-[0.1em]"
                    style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
