import { Truck, RefreshCw, ShieldCheck, Award } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $100",
  },
  {
    icon: ShieldCheck,
    title: "100% Handcrafted",
    desc: "Every piece made by master artisans",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    desc: "Hassle-free returns & exchanges",
  },
  {
    icon: Award,
    title: "Lifetime Guarantee",
    desc: "Craftsmanship you can trust forever",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-[#0B0B0B] py-10 px-6 border-t border-[#C6A15B]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#C6A15B]/10">
        {badges.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-4 px-6 py-2 group"
          >
            <div className="w-10 h-10 border border-[#C6A15B]/20 flex items-center justify-center shrink-0 group-hover:border-[#C6A15B] transition-colors duration-300">
              <Icon size={18} className="text-[#C6A15B]" strokeWidth={1.5} />
            </div>
            <div>
              <p
                className="text-[#F5F4F0] text-xs tracking-[0.15em] uppercase mb-0.5"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
              >
                {title}
              </p>
              <p
                className="text-[#D8D8D8]/40 text-xs leading-snug"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
