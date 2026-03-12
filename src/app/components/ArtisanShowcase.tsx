const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1771523350488-32af5ba560e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwcG90dGVyJTIwY2xheSUyMGhhbmRzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzczMzI5NDYyfDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Artisan potter at work",
    span: "col-span-1 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1759738096144-b43206226765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29tYW4lMjB3ZWF2aW5nJTIwdGV4dGlsZSUyMGNyYWZ0fGVufDF8fHx8MTc3MzMyOTQ2OHww&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Artisan weaving",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1748169207012-6ed2f64aedf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBuYXR1cmFsJTIwbWF0ZXJpYWxzJTIwbGVhdGhlciUyMHJvcGUlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzMzMjk0Njd8MA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Raw materials",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1766940973188-598a6bd59ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja3NtaXRoJTIwZm9yZ2luZyUyMG1ldGFsJTIwY3JhZnQlMjBmaXJlfGVufDF8fHx8MTc3MzMyOTQ3N3ww&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Blacksmith forging",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1724436493139-b148164b8e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHdvb2RlbiUyMGRlY29yJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NzMzMjk0NTd8MA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Handcrafted wooden decor",
    span: "col-span-1 row-span-1",
  },
];

export function ArtisanShowcase() {
  return (
    <section id="artisans" className="bg-[#FAFAF7] py-16 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[#C6A15B] text-xs tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            The Makers
          </p>
          <h2
            className="text-[#0B0B0B] leading-[1.1]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
            }}
          >
            Artisans at{" "}
            <em>Work</em>
          </h2>
          <p
            className="text-[#0B0B0B]/50 max-w-md mx-auto mt-5"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            Witness the skill, patience, and passion behind every creation in
            our artisan community.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[280px]">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              className={`relative overflow-hidden group cursor-pointer ${
                idx === 0 ? "sm:row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/40 transition-all duration-400 flex items-end p-6">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="w-6 h-px bg-[#C6A15B] mb-2" />
                  <p
                    className="text-[#F5F4F0] text-sm"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: 300,
                    }}
                  >
                    {img.alt}
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
