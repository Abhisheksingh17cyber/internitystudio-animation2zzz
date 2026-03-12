import { useRef, useEffect, useCallback } from "react";
import { Leaf, Hammer, Sparkles, Package, ChevronDown } from "lucide-react";
import "../styles/craft-carousel.css";

/* ── content ── */
const steps = [
  {
    num: "01",
    icon: Leaf,
    title: "Raw Material",
    subtitle: "Sourced with Intent",
    description:
      "We travel to find the finest materials — Tuscan leather, highland wool, heritage timber — ethically sourced from trusted artisan suppliers.",
  },
  {
    num: "02",
    icon: Hammer,
    title: "Handcrafting",
    subtitle: "Made by Hand",
    description:
      "Each piece is shaped, stitched, carved, or woven entirely by hand. No shortcuts. No compromises. Only the quiet focus of a master at work.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Finishing",
    subtitle: "Every Detail",
    description:
      "Our final stage is pure refinement — hand-polishing, natural finishing oils, quality checks, and the small touches that elevate a good piece to a great one.",
  },
  {
    num: "04",
    icon: Package,
    title: "Final Product",
    subtitle: "Ready to Cherish",
    description:
      "Packaged with the same care it was created — in natural, sustainable materials — arriving ready to be gifted, displayed, or passed down.",
  },
];

const SPEED_WHEEL = 0.08;
const SPEED_DRAG = -0.25;

function getZIndex(total: number, active: number, i: number): number {
  return i === active ? total : total - Math.abs(active - i);
}

/* ─────────────────────────────────────────────── */
export function CraftProcess() {
  const progressRef = useRef(50);
  const startXRef   = useRef(0);
  const isDownRef   = useRef(false);
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  /* update CSS custom-properties on every item */
  const animate = useCallback(() => {
    progressRef.current = Math.max(0, Math.min(progressRef.current, 100));
    const active = Math.floor(
      (progressRef.current / 100) * (steps.length - 1)
    );
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.setProperty("--zIndex", String(getZIndex(steps.length, active, i)));
      el.style.setProperty("--active",  String((i - active) / steps.length));
    });
  }, []);

  useEffect(() => {
    animate();

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    /* ── wheel ── */
    const onWheel = (e: WheelEvent) => {
      const isAtStart = progressRef.current <= 0 && e.deltaY < 0;
      const isAtEnd = progressRef.current >= 100 && e.deltaY > 0;

      if (isAtStart || isAtEnd) {
        return; // Allow native page scroll
      }

      e.preventDefault();
      progressRef.current += e.deltaY * SPEED_WHEEL;
      animate();
    };

    /* ── pointer / touch ── */
    const getX = (e: MouseEvent | TouchEvent) =>
      "clientX" in e ? e.clientX : e.touches[0]?.clientX ?? 0;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDownRef.current = true;
      startXRef.current = getX(e);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDownRef.current) return;
      const x = getX(e);
      progressRef.current += (x - startXRef.current) * SPEED_DRAG;
      startXRef.current = x;
      animate();
    };
    const onUp = () => { isDownRef.current = false; };

    wrapper.addEventListener("wheel",      onWheel,  { passive: false });
    wrapper.addEventListener("mousedown",  onDown);
    wrapper.addEventListener("touchstart", onDown,   { passive: true });
    window.addEventListener( "mousemove",  onMove);
    window.addEventListener( "mouseup",    onUp);
    wrapper.addEventListener("touchmove",  onMove,   { passive: true });
    wrapper.addEventListener("touchend",   onUp);

    return () => {
      wrapper.removeEventListener("wheel",      onWheel);
      wrapper.removeEventListener("mousedown",  onDown);
      wrapper.removeEventListener("touchstart", onDown);
      window.removeEventListener( "mousemove",  onMove);
      window.removeEventListener( "mouseup",    onUp);
      wrapper.removeEventListener("touchmove",  onMove);
      wrapper.removeEventListener("touchend",   onUp);
    };
  }, [animate]);

  /* click on a card → bring it forward */
  const handleCardClick = (i: number) => {
    progressRef.current = (i / steps.length) * 100 + 10;
    animate();
  };

  return (
    <section
      id="story"
      style={{ background: "#0B0B0B", position: "relative", overflow: "hidden" }}
    >
      {/* ── Header ── */}
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "0",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C6A15B",
            marginBottom: "16px",
          }}
        >
          The Making
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 300,
            color: "#F5F4F0",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          From Earth to{" "}
          <em style={{ color: "#C6A15B", fontStyle: "italic" }}>Your Hands</em>
        </h2>

        {/* scroll hint */}
        <div
          className="craft-scroll-hint"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "20px",
            color: "rgba(198,161,91,0.45)",
          }}
        >
          <ChevronDown size={14} />
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Scroll or drag to explore
          </span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={wrapperRef}
        className="craft-carousel-wrapper"
        style={{ height: "580px" }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="craft-carousel-item"
              onClick={() => handleCardClick(i)}
            >
              <div
                className="craft-carousel-box"
                style={{
                  background:
                    "linear-gradient(160deg, #1c1710 0%, #111008 55%, #0B0B0B 100%)",
                  border: "1px solid rgba(198,161,91,0.18)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "32px 28px 28px",
                }}
              >
                {/* ── top row: icon circle + large number ── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "28px",
                  }}
                >
                  {/* icon circle */}
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      border: "1px solid rgba(198,161,91,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: "rgba(198,161,91,0.06)",
                    }}
                  >
                    <Icon size={22} color="#C6A15B" strokeWidth={1.5} />
                  </div>

                  {/* decorative number */}
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                      fontWeight: 300,
                      color: "rgba(198,161,91,0.12)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* ── title ── */}
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.65rem",
                    fontWeight: 400,
                    color: "#F5F4F0",
                    margin: "0 0 6px",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>

                {/* ── gold subtitle ── */}
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#C6A15B",
                    margin: "0 0 20px",
                  }}
                >
                  {step.subtitle}
                </p>

                {/* ── gold rule divider ── */}
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background:
                      "linear-gradient(to right, #C6A15B, transparent)",
                    marginBottom: 20,
                  }}
                />

                {/* ── description ── */}
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 300,
                    color: "rgba(216,216,216,0.52)",
                    lineHeight: 1.75,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {step.description}
                </p>

                {/* ── bottom gold accent line ── */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 20,
                    borderTop: "1px solid rgba(198,161,91,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 1,
                      background: "#C6A15B",
                      opacity: 0.4,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(198,161,91,0.35)",
                    }}
                  >
                    Artisan's Anchor
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── step dots ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          paddingBottom: 40,
          position: "relative",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.num}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(198,161,91,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
