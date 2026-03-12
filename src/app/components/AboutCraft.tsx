const artisanImg =
  "https://images.unsplash.com/photo-1628586431263-44040b966252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnRzbWFuJTIwd29ya2luZyUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzMyOTQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080";

import { Btn17 } from "./Btn17";

export function AboutCraft() {
  return (
    <section id="craft" className="bg-[#FAFAF7] py-16 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        {/* Left – Image */}
        <div className="relative group overflow-hidden">
          <img
            src={artisanImg}
            alt="Artisan at work"
            className="w-full h-[580px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gold border accent */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C6A15B]/30 pointer-events-none" />
          {/* Label */}
          <div className="absolute bottom-6 left-6 bg-[#0B0B0B]/80 px-5 py-3">
            <p
              className="text-[#C6A15B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Est. 2010
            </p>
          </div>
        </div>

        {/* Right – Story */}
        <div className="flex flex-col justify-center">
          <p
            className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Our Philosophy
          </p>

          <h2
            className="text-[#0B0B0B] mb-8 leading-[1.15]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
            }}
          >
            Every Piece is Born
            <br />
            <em>From the Hands</em>
          </h2>

          <div className="w-12 h-px bg-[#C6A15B] mb-8" />

          <p
            className="text-[#0B0B0B]/60 mb-6 leading-relaxed"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              fontSize: "0.875rem",
            }}
          >
            At Artisan's Anchor, we believe that true luxury lies not in excess,
            but in the quiet mastery of craft. Every stitch, every carve, every
            weave is a deliberate act — a conversation between artisan and
            material that has been perfected over decades.
          </p>

          <p
            className="text-[#0B0B0B]/60 mb-10 leading-relaxed"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              fontSize: "0.875rem",
            }}
          >
            We source only the finest raw materials — premium leather from
            Tuscan tanneries, hand-spun wool from highland farms, and sustainably
            harvested timber from heritage forests. Our artisans bring years of
            training and a lifetime of passion to every creation.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mb-10 border-t border-[#D8D8D8] pt-8">
            {[
              { num: "15+", label: "Years of Craft" },
              { num: "240+", label: "Artisans" },
              { num: "12K+", label: "Pieces Crafted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[#C6A15B] mb-1"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                  }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-[#0B0B0B]/50 text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Btn17 href="#story">Discover Our Story</Btn17>
        </div>
      </div>
    </section>
  );
}