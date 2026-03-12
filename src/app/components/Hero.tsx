import { useState, useEffect, useRef } from "react";
import { Btn17 } from "./Btn17";

export function Hero() {
  const [frameIndex, setFrameIndex] = useState(1);
  const totalFrames = 194;
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Preload frames
  useEffect(() => {
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/animation/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        imageRefs.current.push(img);
    }
  }, []);

  // Frame animation linked to scroll
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      
      // Calculate how far we've scrolled inside the container
      const scrolled = -sectionTop;
      const scrollHeight = rect.height - window.innerHeight;
      
      let progress = scrolled / scrollHeight;
      progress = Math.max(0, Math.min(progress, 1)); // Clamp 0-1
      
      const frame = Math.round(progress * (totalFrames - 1)) + 1;
      
      animationFrameId = requestAnimationFrame(() => {
        setFrameIndex(frame);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-[#0A0604]">
      {/* Sticky wrapper to pin the hero in place while scrolling */}
      <div className="sticky top-0 w-full h-[100svh] min-h-[600px] overflow-hidden">
        {/* Background Frame Sequence */}
        <img
          src={`/animation/ezgif-frame-${String(frameIndex).padStart(3, '0')}.jpg`}
          alt="Artisan's Anchor Hero Animation"
          style={{ willChange: 'src' }}
          className="absolute inset-0 w-full h-full object-contain object-top opacity-90 sm:object-cover sm:object-center filter brightness-90 saturate-150"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0A0604]/60 to-[#0A0604] mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-center px-6 pt-[14vh] mix-blend-screen isolate w-full">
          {/* Decorative line */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="block w-12 h-px bg-[#C6A15B]" />
            <span
              className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase whitespace-nowrap"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Handcrafted Goods
            </span>
            <span className="block w-12 h-px bg-[#C6A15B]" />
          </div>

          {/* CTA Buttons */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 items-center w-full justify-center px-6">
            <Btn17 href="#collection">Explore Collection</Btn17>
            <Btn17 href="#craft">Our Story</Btn17>
          </div>
        </div>
      </div>
    </section>
  );
}
