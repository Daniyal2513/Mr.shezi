import { useState, useEffect, useRef, createContext, useContext } from "react";

import logo from "./assets/logo.png";

// ─── Theme context ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} });
const useTh = () => useContext(ThemeCtx);

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  tag?: string;
  img: string;
  category: string;
}
interface CartItem extends MenuItem { qty: number }

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "BBQ Platters", "Fast Food & Zingers", "Broast",
  "Karahi & Handi", "Pizza & Starters", "Rice & Mandi", "Desserts & Beverages",
];

const MENU: MenuItem[] = [
  { id: 1,  name: "Shezi Special BBQ Platter",    desc: "Mixed grill with seekh kabab, boti, tikka & naan. Serves 2.", price: 1850, tag: "CHEF'S SPECIAL", img: "https://images.unsplash.com/photo-1750190624608-57ceddba8d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "BBQ Platters" },
  { id: 2,  name: "Beef Seekh Kabab (6 pcs)",     desc: "Juicy hand-minced beef kababs grilled over coal.",             price: 680,  tag: "POPULAR",       img: "https://images.unsplash.com/photo-1592011432621-f7f576f44484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "BBQ Platters" },
  { id: 3,  name: "Chicken Tikka Half",            desc: "Marinated bone-in chicken tikka, flame-kissed perfection.",    price: 720,                       img: "https://images.unsplash.com/photo-1653852886048-4ebf70ae4f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "BBQ Platters" },
  { id: 4,  name: "Mutton Boti Platter",           desc: "Tender mutton boti slow-cooked & finished on open fire.",      price: 1200, tag: "SPICY",         img: "https://images.unsplash.com/photo-1621790404813-df280c2de418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "BBQ Platters" },
  { id: 5,  name: "Shezi Zinger Burger",           desc: "Crispy chicken fillet, coleslaw, cheese & special sauce.",     price: 480,  tag: "POPULAR",       img: "https://images.unsplash.com/photo-1517434324-1db605ff03c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Fast Food & Zingers" },
  { id: 6,  name: "Double Smash Burger",           desc: "Double smashed beef patties, pickles, mustard, American cheese.", price: 650, tag: "NEW",         img: "https://images.unsplash.com/photo-1648775170273-dcbe48fb12a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Fast Food & Zingers" },
  { id: 7,  name: "Loaded Fries",                  desc: "Crispy fries topped with cheese sauce, jalapeños & ranch.",    price: 320,                       img: "https://images.unsplash.com/photo-1565731159712-860f067505b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Fast Food & Zingers" },
  { id: 8,  name: "Broast Half Chicken",           desc: "Pressure-fried golden half chicken served with fries & dip.", price: 890,  tag: "POPULAR",       img: "https://images.unsplash.com/photo-1712218275818-6bbb7e5a0a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Broast" },
  { id: 9,  name: "Broast Bucket (4 pcs)",         desc: "Four pieces of crispy pressure-fried chicken, family-style.", price: 1100,                       img: "https://images.unsplash.com/photo-1727188624239-2d0fd9bef5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Broast" },
  { id: 10, name: "Chicken Karahi (Full)",         desc: "Smoky wok-tossed chicken in tomato-ginger masala. Serves 3-4.", price: 1450, tag: "CHEF'S SPECIAL", img: "https://images.unsplash.com/photo-1782541370275-6761522e39d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Karahi & Handi" },
  { id: 11, name: "Mutton Handi",                  desc: "Slow-cooked tender mutton in rich creamy handi sauce.",        price: 1800, tag: "SPICY",         img: "https://images.unsplash.com/photo-1677599083247-9be34fdca346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Karahi & Handi" },
  { id: 12, name: "Beef Karahi (Half)",            desc: "Rich beef karahi with green chillies & fresh coriander.",     price: 980,                       img: "https://images.unsplash.com/photo-1781332150860-55b1eb6a38dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Karahi & Handi" },
  { id: 13, name: "BBQ Chicken Pizza (Large)",     desc: "Smoky BBQ base, grilled chicken, capsicum & mozzarella.",     price: 950,  tag: "POPULAR",       img: "https://images.unsplash.com/photo-1565731159712-860f067505b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Pizza & Starters" },
  { id: 14, name: "Shezi Spicy Wings (8 pcs)",    desc: "Buffalo-glazed crispy wings with blue cheese dip.",           price: 560,  tag: "SPICY",         img: "https://images.unsplash.com/photo-1653852886048-4ebf70ae4f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Pizza & Starters" },
  { id: 15, name: "Chicken Mandi (Full)",          desc: "Aromatic slow-smoked rice with whole chicken, raisins & crispy onion.", price: 1650, tag: "CHEF'S SPECIAL", img: "https://images.unsplash.com/photo-1775039983787-3fe9b416c545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Rice & Mandi" },
  { id: 16, name: "Mutton Biryani (Full)",         desc: "Dum-cooked fragrant biryani with raita & salad. Serves 3.",  price: 1350, tag: "POPULAR",       img: "https://images.unsplash.com/photo-1782541370275-6761522e39d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Rice & Mandi" },
  { id: 17, name: "Gulab Jamun (4 pcs)",           desc: "Soft milk-solid dumplings soaked in rose syrup.",            price: 180,                       img: "https://images.unsplash.com/photo-1677599083247-9be34fdca346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Desserts & Beverages" },
  { id: 18, name: "Mango Lassi",                   desc: "Thick chilled yoghurt blended with Anwar Ratol mangoes.",    price: 220,  tag: "POPULAR",       img: "https://images.unsplash.com/photo-1712218275818-6bbb7e5a0a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", category: "Desserts & Beverages" },
];

const REVIEWS = [
  { id: 1, name: "Ahmed Raza",    rating: 5, text: "Best Mandi in all of Karachi! The smoke flavour is unreal.", tag: "Best Mandi",    avatar: "AR" },
  { id: 2, name: "Sana Malik",    rating: 5, text: "Juicy broast and the zinger burger blew my mind. Must try!", tag: "Juicy Broast",  avatar: "SM" },
  { id: 3, name: "Usman Farooq", rating: 4, text: "Value platters are incredible, fed the whole family for under 3000.", tag: "Value Platters", avatar: "UF" },
  { id: 4, name: "Fatima Khan",  rating: 5, text: "Chicken karahi was absolutely restaurant-level amazing. Delivery was fast too.", tag: "Best Karahi", avatar: "FK" },
  { id: 5, name: "Bilal Sheikh", rating: 5, text: "Seekh kababs are perfectly spiced and super juicy. Already ordered twice!", tag: "Great BBQ", avatar: "BS" },
  { id: 6, name: "Nadia Hussain", rating: 4, text: "Love the mango lassi — thick, real fruit, absolutely refreshing.", tag: "Great Drinks", avatar: "NH" },
];

// ─── Food background pattern (consistent across all sections) ─────────────────
const FOOD_ICONS = [
  { e: "🍖", x: "4%",  y: "12%", s: "3.5rem", cls: "food-float",   r: "-12deg" },
  { e: "🍕", x: "88%", y: "8%",  s: "3rem",   cls: "food-float-2", r: "10deg" },
  { e: "🍔", x: "75%", y: "65%", s: "3.5rem", cls: "food-float-3", r: "-8deg" },
  { e: "🥗", x: "12%", y: "72%", s: "3rem",   cls: "food-float",   r: "15deg" },
  { e: "🍗", x: "46%", y: "5%",  s: "2.8rem", cls: "food-float-2", r: "-5deg" },
  { e: "🍛", x: "93%", y: "42%", s: "3rem",   cls: "food-float-3", r: "8deg" },
  { e: "🫕", x: "2%",  y: "45%", s: "2.8rem", cls: "food-float-2", r: "-18deg" },
  { e: "🥩", x: "60%", y: "88%", s: "3rem",   cls: "food-float",   r: "12deg" },
  { e: "🌮", x: "28%", y: "92%", s: "2.6rem", cls: "food-float-3", r: "-6deg" },
  { e: "🧆", x: "82%", y: "28%", s: "2.5rem", cls: "food-float",   r: "20deg" },
  { e: "🫙", x: "18%", y: "30%", s: "2.5rem", cls: "food-float-3", r: "-14deg" },
  { e: "🍢", x: "52%", y: "50%", s: "2.4rem", cls: "food-float-2", r: "9deg" },
];

function FoodBg({ opacity = 0.13 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {FOOD_ICONS.map((f, i) => (
        <span
          key={i}
          className={`absolute ${f.cls}`}
          style={{ left: f.x, top: f.y, fontSize: f.s, transform: `rotate(${f.r})`, opacity }}
        >
          {f.e}
        </span>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function TagBadge({ tag }: { tag: string }) {
  const map: Record<string, string> = {
    "POPULAR": "bg-[#E64A19] text-white",
    "SPICY": "bg-red-600 text-white",
    "CHEF'S SPECIAL": "bg-[#F5A623] text-[#1A1A1A]",
    "NEW": "bg-emerald-500 text-white",
  };
  return (
    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${map[tag] ?? "bg-gray-200 text-gray-700"}`}>
      {tag}
    </span>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < n ? "text-[#F5A623]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Theme toggle button ──────────────────────────────────────────────────────
function ThemeToggle() {
  const { dark, toggle } = useTh();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${dark ? "bg-[#F5A623]" : "bg-gray-300"}`}
    >
      <span className={`absolute w-5 h-5 rounded-full shadow flex items-center justify-center text-xs transition-all duration-300 ${dark ? "translate-x-7 bg-[#1A1A1A]" : "translate-x-0 bg-white"}`}>
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

// ─── Location Modal ───────────────────────────────────────────────────────────
function LocationModal({ onDone }: { onDone: () => void }) {
  const { dark } = useTh();
  const [location, setLocation] = useState("");
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`fade-in rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border-2 border-[#1A1A1A] ${dark ? "bg-[#1e1e1e]" : "bg-white"}`}>
        <div className="bg-[#1A1A1A] px-8 py-6 flex flex-col items-center gap-3">
          <img src={logo} alt="Mr. Shezi Restaurant" className="h-20 w-20 object-contain" />
          <p className="text-[#F5A623] font-display text-xl tracking-wide">Welcome!</p>
        </div>
        <div className="px-8 py-7">
          <h2 className={`font-display text-2xl mb-1 ${dark ? "text-white" : "text-[#1A1A1A]"}`}>Select Your Location</h2>
          <p className="text-sm text-gray-500 mb-5">Choose your delivery area to see accurate menu & delivery time.</p>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Delivery Area</label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={`w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 text-base font-medium focus:outline-none focus:border-[#E64A19] transition mb-3 ${dark ? "bg-[#2a2a2a] text-white" : "bg-white text-[#1A1A1A]"}`}
          >
            <option value="">— Select branch / area —</option>
            <option value="karachi-central">Karachi – Central</option>
            <option value="garden-west">Garden West</option>
            <option value="saddar">Saddar / Regal Chowk</option>
            <option value="clifton">Clifton / Defence</option>
          </select>
          <button
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#E64A19] rounded-xl py-3 text-[#E64A19] font-bold text-sm hover:bg-orange-50 transition mb-6"
            onClick={() => setLocation("karachi-central")}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Use My Current Location
          </button>
          <button
            onClick={onDone}
            disabled={!location}
            className="w-full bg-[#E64A19] disabled:opacity-40 text-white font-bold text-base rounded-xl py-4 hover:bg-[#c43d14] transition-all active:scale-95"
          >
            Proceed to Menu →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ cartCount, cartTotal, onCartClick }: { cartCount: number; cartTotal: number; onCartClick: () => void }) {
  const { dark } = useTh();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home", href: "#home" }, { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" }, { label: "Track Order", href: "#track" },
    { label: "Place Order", href: "#checkout" }, { label: "Reviews", href: "#reviews" },
  ];

  const navBg = scrolled
    ? (dark ? "bg-[#0f0f0f]/90 backdrop-blur-md shadow-lg py-2" : "bg-white/90 backdrop-blur-md shadow-lg py-2")
    : (dark ? "bg-[#1A1A1A] py-3" : "bg-white py-3 border-b border-gray-100");

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <a href="#home">
          <img src={logo} alt="" className={`object-contain transition-all ${scrolled ? "h-10" : "h-14"}`} />
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-semibold transition-colors hover:text-[#F5A623] ${dark ? "text-white/80" : "text-[#1A1A1A]/70"}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-[#E64A19] hover:bg-[#c43d14] text-white font-bold px-4 py-2.5 rounded-full transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="hidden sm:inline text-sm">Cart</span>
            {cartCount > 0 && (
              <>
                <span className="bg-[#F5A623] text-[#1A1A1A] text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{cartCount}</span>
                <span className="hidden sm:inline text-sm font-bold">Rs. {cartTotal.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#1A1A1A] overflow-hidden pt-20">
      <FoodBg opacity={0.18} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#E64A19_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#F5A623_0%,_transparent_50%)] opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center py-20">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E64A19]/20 border border-[#E64A19]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#E64A19] rounded-full animate-pulse" />
            <span className="text-[#F5A623] text-xs font-bold tracking-widest uppercase">Now Open · Karachi</span>
          </div>
          <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-4">
            Authentic<br /><span className="text-[#E64A19]">Flavours,</span><br />
            <span className="text-[#F5A623]">Irresistible</span><br />Taste.
          </h1>
          <p className="text-white/60 text-lg max-w-md mb-8 leading-relaxed">
            160+ dishes — BBQ, Mandi, Karahi, Broast & Fast Food. Straight from the kitchen to your door in under 40 minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="bg-[#E64A19] hover:bg-[#c43d14] text-white font-bold px-8 py-4 rounded-full text-base transition-all active:scale-95 shadow-lg shadow-orange-900/40">Order Now</a>
            <a href="#track" className="border-2 border-white/30 hover:border-[#F5A623] text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:text-[#F5A623]">Track My Order</a>
          </div>
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
            {[["160+", "Dishes"], ["4.8★", "Rating"], ["40min", "Delivery"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-display text-3xl text-[#F5A623]">{val}</div>
                <div className="text-white/50 text-sm">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <img src="https://images.unsplash.com/photo-1750190624608-57ceddba8d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700" alt="Mr. Shezi signature BBQ platter" className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-5 -left-8 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="font-bold text-[#1A1A1A] text-sm">Most Ordered</div>
                <div className="text-[#E64A19] font-display text-base">Shezi BBQ Platter</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#F5A623] rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl">
              <span className="font-display text-[#1A1A1A] text-xl leading-none">160+</span>
              <span className="text-[#1A1A1A] text-[9px] font-bold uppercase tracking-wider">Dishes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { dark } = useTh();
  const highlights = [
    { icon: "🍖", label: "BBQ & Platters", desc: "Coal-fired perfection, served fresh." },
    { icon: "🍚", label: "Rice & Mandi",   desc: "Slow-smoked Mandi & dum biryani." },
    { icon: "🍔", label: "Fast Food",       desc: "Zingers, smash burgers & loaded fries." },
    { icon: "🫕", label: "Karahi & Handi", desc: "Wok-tossed masalas, family style." },
  ];
  return (
    <section id="about" className={`py-24 relative overflow-hidden ${dark ? "bg-[#111111]" : "bg-[#F8F9FA]"}`}>
      <FoodBg opacity={dark ? 0.14 : 0.1} />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#E64A19] mb-3 block">Our Story</span>
            <h2 className={`font-display text-5xl lg:text-6xl mb-6 leading-tight ${dark ? "text-white" : "text-[#1A1A1A]"}`}>
              Born from a <span className="text-[#E64A19]">Passion</span><br /> for Bold Flavours
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${dark ? "text-white/60" : "text-gray-600"}`}>
              Mr. Shezi Restaurant started with one dream — bring authentic, restaurant-quality food to every table in Karachi. From smoky coal-fired BBQ to fragrant slow-smoked Mandi, every dish is made with obsessive care.
            </p>
            <p className={`leading-relaxed mb-8 ${dark ? "text-white/50" : "text-gray-600"}`}>
              We source fresh ingredients daily and use traditional recipes refined over years — no shortcuts, no compromises. That is the Shezi promise.
            </p>
            <div className="flex gap-6">
              {[["160+", "Menu Items"], ["4.8", "Avg Rating"], ["5K+", "Happy Customers"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-display text-3xl text-[#E64A19]">{n}</div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${dark ? "text-white/40" : "text-gray-500"}`}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(h => (
              <div key={h.label} className={`rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ${dark ? "bg-[#1e1e1e] border-white/10" : "bg-white border-gray-100"}`}>
                <div className="text-4xl mb-3">{h.icon}</div>
                <div className={`font-bold mb-1 ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{h.label}</div>
                <div className={`text-sm ${dark ? "text-white/50" : "text-gray-500"}`}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({ item, onAdd, onRemove, qty }: { item: MenuItem; onAdd: () => void; onRemove: () => void; qty: number }) {
  const { dark } = useTh();
  return (
    <div className={`rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col ${dark ? "bg-[#1e1e1e] border-white/10" : "bg-white border-gray-100"}`}>
      <div className="relative overflow-hidden h-44">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {item.tag && <div className="absolute top-3 left-3"><TagBadge tag={item.tag} /></div>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className={`font-bold text-sm leading-snug mb-1 ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{item.name}</h3>
        <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-3">{item.desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg text-[#E64A19]">Rs. {item.price.toLocaleString()}</span>
          {qty === 0 ? (
            <button onClick={onAdd} className="bg-[#1A1A1A] hover:bg-[#E64A19] text-white text-xs font-bold px-4 py-2 rounded-full transition-all active:scale-95">+ Add</button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={onRemove} className={`w-7 h-7 rounded-full font-bold text-base flex items-center justify-center transition ${dark ? "bg-white/10 hover:bg-red-900/50 text-white" : "bg-gray-100 hover:bg-red-100 text-gray-700"}`}>−</button>
              <span className={`font-bold w-4 text-center ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{qty}</span>
              <button onClick={onAdd} className="w-7 h-7 bg-[#E64A19] hover:bg-[#c43d14] text-white rounded-full font-bold text-base flex items-center justify-center transition">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────
function MenuSection({ cart, onAdd, onRemove }: { cart: CartItem[]; onAdd: (i: MenuItem) => void; onRemove: (id: number) => void }) {
  const { dark } = useTh();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const catRefs = useRef<Record<string, HTMLElement | null>>({});
  const getQty = (id: number) => cart.find(c => c.id === id)?.qty ?? 0;

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    catRefs.current[cat]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="menu" className={`py-20 relative overflow-hidden ${dark ? "bg-[#0f0f0f]" : "bg-white"}`}>
      <FoodBg opacity={dark ? 0.1 : 0.07} />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E64A19] mb-3 block">Our Menu</span>
          <h2 className={`font-display text-5xl ${dark ? "text-white" : "text-[#1A1A1A]"}`}>160+ Dishes Await</h2>
        </div>
        {/* sticky pill strip */}
        <div className={`sticky top-[60px] z-30 pb-3 pt-2 mb-8 ${dark ? "bg-[#0f0f0f]/90 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm"}`}>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`flex-none px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat ? "bg-[#E64A19] text-white shadow" : dark ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {CATEGORIES.map(cat => {
          const items = MENU.filter(m => m.category === cat);
          return (
            <div key={cat} ref={el => { catRefs.current[cat] = el; }} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <h3 className={`font-display text-2xl ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{cat}</h3>
                <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-gray-100"}`} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                  <MenuCard key={item.id} item={item} qty={getQty(item.id)} onAdd={() => onAdd(item)} onRemove={() => onRemove(item.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ cart, onClose, onAdd, onRemove, onClear }: {
  cart: CartItem[]; onClose: () => void;
  onAdd: (i: MenuItem) => void; onRemove: (id: number) => void; onClear: () => void;
}) {
  const { dark } = useTh();
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  return (
    <div className="fixed inset-0 z-[80] flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`w-full max-w-sm h-full shadow-2xl flex flex-col slide-up ${dark ? "bg-[#1A1A1A]" : "bg-white"}`}>
        <div className={`flex items-center justify-between px-6 py-5 border-b ${dark ? "border-white/10" : "border-gray-100"}`}>
          <h2 className={`font-display text-2xl ${dark ? "text-white" : "text-[#1A1A1A]"}`}>Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <div className="text-6xl">🛒</div>
            <p className="font-medium">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 items-start">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl flex-none" />
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm leading-snug ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{item.name}</p>
                  <p className="text-[#E64A19] font-bold text-sm mt-0.5">Rs. {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <button onClick={() => onRemove(item.id)} className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-sm transition ${dark ? "bg-white/10 hover:bg-red-900/40 text-white" : "bg-gray-100 hover:bg-red-100"}`}>−</button>
                  <span className={`font-bold text-sm w-4 text-center ${dark ? "text-white" : ""}`}>{item.qty}</span>
                  <button onClick={() => onAdd(item)} className="w-7 h-7 bg-[#E64A19] text-white rounded-full font-bold flex items-center justify-center text-sm hover:bg-[#c43d14] transition">+</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className={`px-6 pb-6 pt-4 border-t space-y-3 ${dark ? "border-white/10" : "border-gray-100"}`}>
            <div className={`flex justify-between font-bold text-lg ${dark ? "text-white" : ""}`}>
              <span>Total</span>
              <span className="text-[#E64A19]">Rs. {total.toLocaleString()}</span>
            </div>
            <a href="#checkout" onClick={onClose} className="block w-full bg-[#E64A19] hover:bg-[#c43d14] text-white font-bold text-center py-4 rounded-full transition-all active:scale-95">
              Proceed to Checkout →
            </a>
            <button onClick={onClear} className="block w-full text-center text-gray-400 text-sm hover:text-red-500 transition">Clear cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Floating Cart Bar ────────────────────────────────────────────────────────
function FloatingCartBar({ count, total, onClick }: { count: number; total: number; onClick: () => void }) {
  if (count === 0) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 slide-up">
      <button onClick={onClick} className="flex items-center gap-4 bg-[#1A1A1A] text-white shadow-2xl rounded-full px-6 py-3 hover:bg-[#E64A19] transition-all active:scale-95">
        <span className="bg-[#E64A19] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">{count}</span>
        <span className="font-bold">{count} item{count > 1 ? "s" : ""}</span>
        <span className="font-bold text-[#F5A623]">Rs. {total.toLocaleString()}</span>
        <span className="text-sm">· View Cart & Checkout →</span>
      </button>
    </div>
  );
}

// ─── Checkout ─────────────────────────────────────────────────────────────────
function Checkout({ cart }: { cart: CartItem[] }) {
  const { dark } = useTh();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const bg = dark ? "bg-[#111111]" : "bg-[#F8F9FA]";
  const card = dark ? "bg-[#1e1e1e] border-white/10" : "bg-white border-gray-100";
  const txt = dark ? "text-white" : "text-[#1A1A1A]";
  const sub = dark ? "text-white/50" : "text-gray-500";
  const inp = dark ? "bg-[#2a2a2a] border-white/20 text-white placeholder-white/30 focus:border-[#E64A19]" : "border-gray-200 focus:border-[#E64A19]";

  if (placed) {
    return (
      <section id="checkout" className={`py-24 relative overflow-hidden ${bg}`}>
        <FoodBg opacity={dark ? 0.12 : 0.08} />
        <div className="relative max-w-lg mx-auto px-4 text-center">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className={`font-display text-4xl mb-3 ${txt}`}>Order Placed!</h2>
          <p className={`mb-6 ${sub}`}>Your order ID is <strong>#SHZ-{Math.floor(Math.random() * 90000) + 10000}</strong>. Estimated delivery: 30–40 min.</p>
          <a href="#track" className="inline-block bg-[#E64A19] text-white font-bold px-8 py-4 rounded-full hover:bg-[#c43d14] transition">Track My Order →</a>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className={`py-24 relative overflow-hidden ${bg}`}>
      <FoodBg opacity={dark ? 0.12 : 0.08} />
      <div className="relative max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E64A19] mb-3 block">Checkout</span>
          <h2 className={`font-display text-5xl ${txt}`}>Place Your Order</h2>
        </div>
        {/* Steps */}
        <div className="flex items-center mb-8">
          {["Review", "Details", "Payment"].map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step === i + 1 ? "text-[#E64A19]" : step > i + 1 ? "text-green-500" : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${step === i + 1 ? "border-[#E64A19] bg-[#E64A19] text-white" : step > i + 1 ? "border-green-500 bg-green-500 text-white" : "border-gray-300 text-gray-300"}`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-sm font-bold hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px mx-2 ${step > i + 1 ? "bg-green-400" : dark ? "bg-white/10" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <div className={`rounded-3xl p-6 shadow-sm border ${card}`}>
          {step === 1 && (
            <div>
              <h3 className={`font-bold text-lg mb-4 ${txt}`}>Order Review</h3>
              {cart.length === 0 ? (
                <div className={`text-center py-8 ${sub}`}><div className="text-4xl mb-2">🛒</div><p>Your cart is empty. <a href="#menu" className="text-[#E64A19] underline">Browse the menu</a></p></div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className={dark ? "text-white/70" : "text-gray-700"}>{item.name} <span className="text-gray-400">×{item.qty}</span></span>
                        <span className={`font-bold ${txt}`}>Rs. {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`border-t pt-3 flex justify-between font-bold ${dark ? "border-white/10" : "border-gray-100"}`}>
                    <span className={txt}>Total</span>
                    <span className="text-[#E64A19]">Rs. {total.toLocaleString()}</span>
                  </div>
                  <textarea className={`w-full mt-4 border rounded-xl p-3 text-sm focus:outline-none transition resize-none ${inp}`} rows={2} placeholder="Special instructions…" value={form.notes} onChange={e => upd("notes", e.target.value)} />
                  <button onClick={() => setStep(2)} className="w-full mt-4 bg-[#E64A19] text-white font-bold py-3.5 rounded-full hover:bg-[#c43d14] transition">Continue →</button>
                </>
              )}
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className={`font-bold text-lg mb-4 ${txt}`}>Customer Details</h3>
              <div className="space-y-3">
                {[{ key: "name", label: "Full Name", placeholder: "Ali Hassan", type: "text" }, { key: "phone", label: "Phone Number", placeholder: "+92 300 0000000", type: "tel" }, { key: "address", label: "Delivery Address", placeholder: "Street, Area, Karachi", type: "text" }].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 block">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={e => upd(f.key, e.target.value)} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${inp}`} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(1)} className={`flex-1 border-2 font-bold py-3.5 rounded-full transition ${dark ? "border-white/20 text-white hover:border-white/40" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>← Back</button>
                <button onClick={() => setStep(3)} disabled={!form.name || !form.phone || !form.address} className="flex-1 bg-[#E64A19] disabled:opacity-40 text-white font-bold py-3.5 rounded-full hover:bg-[#c43d14] transition">Continue →</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className={`font-bold text-lg mb-4 ${txt}`}>Payment Method</h3>
              <div className="space-y-3 mb-6">
                {[{ id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives" }, { id: "card", label: "Card Payment", icon: "💳", desc: "Credit / Debit card" }, { id: "wallet", label: "Mobile Wallet", icon: "📱", desc: "JazzCash, EasyPaisa, SadaPay" }].map(p => (
                  <label key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${payment === p.id ? "border-[#E64A19] bg-orange-500/10" : dark ? "border-white/10 hover:border-white/20" : "border-gray-100 hover:border-gray-200"}`}>
                    <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="sr-only" />
                    <span className="text-2xl">{p.icon}</span>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${txt}`}>{p.label}</div>
                      <div className="text-xs text-gray-400">{p.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === p.id ? "border-[#E64A19]" : "border-gray-300"}`}>
                      {payment === p.id && <div className="w-2.5 h-2.5 bg-[#E64A19] rounded-full" />}
                    </div>
                  </label>
                ))}
              </div>
              <div className={`flex justify-between font-bold text-lg mb-4 ${txt}`}>
                <span>Order Total</span>
                <span className="text-[#E64A19]">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className={`flex-1 border-2 font-bold py-3.5 rounded-full transition ${dark ? "border-white/20 text-white hover:border-white/40" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>← Back</button>
                <button onClick={() => setPlaced(true)} className="flex-1 bg-[#E64A19] text-white font-bold py-3.5 rounded-full hover:bg-[#c43d14] transition active:scale-95">Confirm Order 🎉</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Track Order ──────────────────────────────────────────────────────────────
function TrackOrder() {
  const { dark } = useTh();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const STEPS = ["Order Confirmed", "In the Kitchen", "Rider Dispatched", "Delivered"];
  const handleSearch = () => { if (query.trim()) setStatus(2); };

  return (
    <section id="track" className={`py-24 relative overflow-hidden ${dark ? "bg-[#1A1A1A]" : "bg-[#1A1A1A]"}`}>
      <FoodBg opacity={0.16} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E64A19_0%,_transparent_60%)] opacity-10" />
      <div className="relative max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E64A19] mb-3 block">Live Tracking</span>
          <h2 className="font-display text-5xl text-white">Track Your Order</h2>
          <p className="text-white/50 mt-3">Enter your Order ID or phone number to see live status.</p>
        </div>
        <div className="flex gap-3 mb-10">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Order ID or phone number…"
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#E64A19] transition" />
          <button onClick={handleSearch} className="bg-[#E64A19] hover:bg-[#c43d14] text-white font-bold px-6 py-4 rounded-full transition active:scale-95">Track →</button>
        </div>
        {status !== null && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 fade-in">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="text-white font-bold">Order #SHZ-48291</div>
                <div className="text-white/50 text-sm">Est. delivery: ~18 mins</div>
              </div>
              <div className="text-right">
                <div className="text-[#F5A623] font-bold text-sm">Rider Contact</div>
                <div className="text-white/50 text-sm">0300-1234567</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/10">
                <div className="h-full bg-[#E64A19] transition-all duration-700" style={{ width: `${(status / (STEPS.length - 1)) * 100}%` }} />
              </div>
              <div className="relative flex justify-between">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-2 w-1/4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${i <= status ? "bg-[#E64A19] border-[#E64A19]" : "bg-[#1A1A1A] border-white/20"}`}>
                      {i <= status ? <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : <div className="w-2 h-2 bg-white/20 rounded-full" />}
                    </div>
                    <span className={`text-[10px] font-bold text-center leading-tight ${i <= status ? "text-white" : "text-white/30"}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const { dark } = useTh();
  return (
    <section id="reviews" className={`py-24 relative overflow-hidden ${dark ? "bg-[#111111]" : "bg-[#F8F9FA]"}`}>
      <FoodBg opacity={dark ? 0.13 : 0.09} />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E64A19] mb-3 block">Reviews</span>
          <h2 className={`font-display text-5xl mb-2 ${dark ? "text-white" : "text-[#1A1A1A]"}`}>What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars n={5} />
            <span className={`font-bold ${dark ? "text-white" : "text-[#1A1A1A]"}`}>4.8</span>
            <span className="text-gray-400 text-sm">/ 5 average</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div key={r.id} className={`rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${dark ? "bg-[#1e1e1e] border-white/10" : "bg-white border-gray-100"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#E64A19] text-white font-bold text-sm flex items-center justify-center flex-none">{r.avatar}</div>
                <div>
                  <div className={`font-bold text-sm ${dark ? "text-white" : "text-[#1A1A1A]"}`}>{r.name}</div>
                  <Stars n={r.rating} />
                </div>
              </div>
              <p className={`text-sm leading-relaxed mb-3 ${dark ? "text-white/60" : "text-gray-500"}`}>"{r.text}"</p>
              <span className="inline-block bg-orange-500/15 text-[#E64A19] text-xs font-bold px-3 py-1 rounded-full">{r.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { dark } = useTh();
  return (
    <footer className={`py-12 px-4 relative overflow-hidden ${dark ? "bg-[#0a0a0a]" : "bg-[#1A1A1A]"}`}>
      <FoodBg opacity={0.1} />
      <div className="relative max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 items-start">
        <div>
          <img src={logo} alt="Mr. Shezi Restaurant" className="h-16 object-contain mb-3" />
          <p className="text-white/50 text-sm leading-relaxed">Authentic flavours, irresistible taste. Serving Karachi since day one.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
          <div className="space-y-1.5">
            {["Home", "About", "Menu", "Track Order", "Place Order", "Reviews"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} className="block text-white/50 hover:text-[#F5A623] text-sm transition">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Contact Us</h4>
          <div className="space-y-2 text-white/50 text-sm">
            <p>📍 Garden West, Karachi</p>
            <p>📞 0300-SHEZI-01</p>
            <p>🕐 Open daily 12pm – 2am</p>
          </div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} Mr. Shezi Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Sync <html> class for potential future CSS var overrides
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const addItem = (item: MenuItem) => setCart(prev => {
    const ex = prev.find(c => c.id === item.id);
    return ex ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { ...item, qty: 1 }];
  });

  const removeItem = (id: number) => setCart(prev => {
    const ex = prev.find(c => c.id === id);
    if (!ex) return prev;
    return ex.qty === 1 ? prev.filter(c => c.id !== id) : prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
  });

  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div className={`min-h-full transition-colors duration-300 ${dark ? "bg-[#0f0f0f]" : "bg-white"}`}>
        {showModal && <LocationModal onDone={() => setShowModal(false)} />}
        <Navbar cartCount={cartCount} cartTotal={cartTotal} onCartClick={() => setCartOpen(true)} />
        <Hero />
        <About />
        <MenuSection cart={cart} onAdd={addItem} onRemove={removeItem} />
        <Checkout cart={cart} />
        <TrackOrder />
        <Reviews />
        <Footer />
        <FloatingCartBar count={cartCount} total={cartTotal} onClick={() => setCartOpen(true)} />
        {cartOpen && (
          <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onAdd={addItem} onRemove={removeItem} onClear={() => setCart([])} />
        )}
      </div>
    </ThemeCtx.Provider>
  );
}
