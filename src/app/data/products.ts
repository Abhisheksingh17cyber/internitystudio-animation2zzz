export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  highlights: string[];
  image: string;
  featured?: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "handmade-leather-wallet",
    name: "Handmade Leather Wallet",
    category: "Leather Goods",
    price: 89,
    description:
      "Crafted from premium full-grain leather, this handcrafted wallet blends timeless design with everyday functionality. Each piece is carefully stitched by hand, ensuring durability and a unique character that improves with age. Designed to keep your essentials organized, it features multiple card slots and a spacious compartment for cash while maintaining a slim, elegant profile. Perfect for those who appreciate authentic craftsmanship and long-lasting quality.",
    highlights: [
      "Full-grain genuine leather",
      "Hand-stitched craftsmanship",
      "Multiple card slots",
      "Slim and durable design",
      "Ages beautifully with use",
    ],
    image:
      "https://images.unsplash.com/photo-1620109176813-e91290f6c795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "vintage-canvas-duffel-bag",
    name: "Vintage Canvas & Leather Duffel Bag",
    category: "Leather Goods",
    price: 189,
    description:
      "Built for travel and adventure, this rugged duffel bag combines durable waxed canvas with premium leather accents. Designed for both style and strength, it offers ample storage while maintaining a classic vintage aesthetic. The reinforced leather handles and adjustable shoulder strap provide comfort and reliability, making it the perfect companion for weekend trips or daily use.",
    highlights: [
      "Heavy-duty waxed canvas",
      "Genuine leather detailing",
      "Spacious travel storage",
      "Brass hardware accents",
      "Durable and stylish design",
    ],
    image:
      "https://images.unsplash.com/photo-1536238349444-c05ffb6837e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
  },
  {
    id: "brass-leather-keychain",
    name: "Brass & Leather Keychain",
    category: "Accessories",
    price: 39,
    description:
      "This handcrafted keychain combines solid brass hardware with genuine leather for a refined everyday accessory. Built for durability and style, it securely holds your keys while adding a touch of artisan craftsmanship to your daily carry. The natural leather develops a unique patina over time, making every piece truly one of a kind.",
    highlights: [
      "Solid brass clip",
      "Premium leather strap",
      "Handcrafted finish",
      "Durable everyday carry",
      "Develops natural patina over time",
    ],
    image:
      "https://images.unsplash.com/photo-1679453082082-906a6b557a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    badge: "New Arrival",
  },
  {
    id: "damascus-steel-knife-set",
    name: "Damascus Steel Chef Knife Set",
    category: "Metalwork",
    price: 249,
    description:
      "Engineered for precision and beauty, this Damascus steel knife set showcases exceptional craftsmanship and cutting performance. Each blade features distinctive layered patterns and razor-sharp edges designed for professional-level control in the kitchen. The elegant wooden handles provide a comfortable grip while enhancing the knife's sophisticated appearance.",
    highlights: [
      "Authentic Damascus steel blades",
      "Razor-sharp cutting edge",
      "Ergonomic wooden handles",
      "Exceptional durability",
      "Perfect for professional and home chefs",
    ],
    image:
      "https://images.unsplash.com/photo-1762514795314-2f921ad397b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
    badge: "Premium",
  },
  {
    id: "anchor-leather-bracelet",
    name: "Anchor Leather Bracelet",
    category: "Accessories",
    price: 65,
    description:
      "Inspired by strength and adventure, this handcrafted leather bracelet features a bold anchor clasp that symbolizes stability and resilience. Made from high-quality braided leather and durable metal hardware, it offers both style and durability, making it a perfect everyday accessory for modern explorers.",
    highlights: [
      "Braided genuine leather",
      "Anchor-style clasp design",
      "Comfortable and durable",
      "Symbolic nautical style",
      "Perfect everyday accessory",
    ],
    image:
      "https://images.unsplash.com/photo-1640551855927-78d8ce33c586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "handmade-leather-belt",
    name: "Handmade Leather Belt",
    category: "Leather Goods",
    price: 79,
    description:
      "Crafted from premium full-grain leather, this handcrafted belt delivers both durability and classic style. The solid brass buckle complements the rich leather texture, creating a timeless accessory suitable for any occasion. With reinforced stitching and sturdy construction, it is built to last for years while developing a distinctive patina over time.",
    highlights: [
      "Full-grain leather construction",
      "Solid brass buckle",
      "Handcrafted stitching",
      "Durable and long-lasting",
      "Timeless classic design",
    ],
    image:
      "https://images.unsplash.com/photo-1711548244678-be7019032b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
  },
  {
    id: "classic-leather-boots",
    name: "Classic Leather Boots & Shoes",
    category: "Leather Goods",
    price: 299,
    description:
      "Designed for comfort and durability, these handcrafted leather boots and shoes combine traditional craftsmanship with modern functionality. Made from high-quality leather and reinforced with precise stitching, they provide exceptional support and style, whether worn for work or casual outings.",
    highlights: [
      "Premium leather construction",
      "Durable stitched soles",
      "Comfortable everyday wear",
      "Classic vintage style",
      "Long-lasting craftsmanship",
    ],
    image:
      "https://images.unsplash.com/photo-1739158763568-95613558f36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    badge: "Limited",
  },
  {
    id: "handmade-leather-journal",
    name: "Handmade Leather Journal",
    category: "Stationery",
    price: 99,
    description:
      "Capture your thoughts in this beautifully handcrafted leather journal made from premium full-grain leather. Designed for writers, artists, and dreamers, it features a durable wrap-around strap closure and thick pages perfect for writing or sketching. Each journal carries a unique texture and character, making it a timeless companion for creativity.",
    highlights: [
      "Premium full-grain leather cover",
      "Secure wrap-around strap closure",
      "Durable and long-lasting design",
      "Ideal for writing and sketching",
      "Unique handcrafted character",
    ],
    image:
      "https://images.unsplash.com/photo-1764391791965-e57ac12cbb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
  },
  {
    id: "paracord-survival-bracelet",
    name: "Paracord Survival Bracelet",
    category: "Accessories",
    price: 35,
    description:
      "Built for strength and versatility, this paracord bracelet is crafted from durable 550-grade paracord and reinforced with a solid metal clasp. Designed for outdoor enthusiasts, it offers both practical survival functionality and rugged style for everyday wear.",
    highlights: [
      "Strong 550-grade paracord",
      "Heavy-duty metal clasp",
      "Lightweight and durable",
      "Outdoor survival accessory",
      "Stylish everyday wear",
    ],
    image:
      "https://images.unsplash.com/photo-1766560359399-b8ac22d0e2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "forge-gold-necklace",
    name: "Forge & Gold Necklace",
    category: "Artisan Jewelry",
    price: 320,
    description:
      "Hand-forged 18k gold pendant crafted using traditional lost-wax casting techniques passed down through generations. Each piece is unique, carrying the marks of skilled hands and an unwavering commitment to beauty and lasting elegance.",
    highlights: [
      "18k gold pendant",
      "Traditional lost-wax casting",
      "One-of-a-kind design",
      "Generational techniques",
      "Elegant gift packaging included",
    ],
    image:
      "https://images.unsplash.com/photo-1772411535080-a78ecb29ac69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: true,
    badge: "Signature",
  },
  {
    id: "highland-wool-throw",
    name: "Highland Wool Throw",
    category: "Handwoven Textiles",
    price: 210,
    description:
      "Slow-woven on a traditional loom from merino wool, featuring geometric patterns inspired by ancient tapestry traditions. A statement piece for any living space, providing warmth and timeless beauty.",
    highlights: [
      "100% merino wool",
      "Traditional loom weaving",
      "Geometric heritage patterns",
      "Naturally hypoallergenic",
      "Machine washable on gentle cycle",
    ],
    image:
      "https://images.unsplash.com/photo-1766761050212-02dbfec20006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "carved-oak-bowl",
    name: "Carved Oak Bowl",
    category: "Wooden Crafts",
    price: 175,
    description:
      "Hand-turned from a single piece of heritage oak, finished with natural oils to reveal the wood's rich grain and character. No two bowls are ever the same — each is a small sculpture in its own right.",
    highlights: [
      "Single-piece heritage oak",
      "Hand-turned on traditional lathe",
      "Natural oil finish",
      "Food-safe and durable",
      "Unique grain pattern in every piece",
    ],
    image:
      "https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "stoneware-collection",
    name: "Stoneware Collection",
    category: "Ceramics",
    price: 95,
    description:
      "Wheel-thrown stoneware with natural ash glazes, fired in wood-burning kilns for one-of-a-kind surface textures. Each piece is a collaboration between the potter's hands, fire, and earth.",
    highlights: [
      "Wheel-thrown stoneware",
      "Natural ash glazes",
      "Wood-kiln fired",
      "Food safe and dishwasher safe",
      "Unique surface on every piece",
    ],
    image:
      "https://images.unsplash.com/photo-1590605103416-230704277b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "amber-pillar-candles",
    name: "Amber Pillar Candles",
    category: "Home Decor",
    price: 58,
    description:
      "Hand-poured from pure beeswax with natural botanical essences. Each candle burns for over 40 hours, filling your space with a warm, subtle fragrance that soothes and inspires.",
    highlights: [
      "Pure beeswax formula",
      "Natural botanical essences",
      "40+ hour burn time",
      "Hand-poured in small batches",
      "Eco-friendly and sustainable",
    ],
    image:
      "https://images.unsplash.com/photo-1771289676158-f7b0e9599265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
