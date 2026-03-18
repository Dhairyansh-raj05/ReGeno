import React from "react";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import TrustSection from "../../components/TrustSection";
import { PRODUCTS } from "../../components/constants";
import { Link } from "react-router-dom";

const GAMES = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    price: "₹1,299",
    image: "/GTA5.png",
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    price: "₹1,999",
    image: "/RDR2.png",
  },
  {
    id: 3,
    title: "Spider-Man: Remastered",
    price: "₹1,499",
    image: "/SMR.png",
  },
  {
    id: 4,
    title: "Uncharted 4: A Thief's End",
    price: "₹1,199",
    image: "/UC4.png",
  },
  {
    id: 5,
    title: "Ghost of Tsushima",
    price: "₹1,099",
    image: "/GoT.png",
  },
  {
    id: 6,
    title: "Cyberpunk 2077",
    price: "₹1,599",
    image: "/CP.png",
  },
];

const Home: React.FC = () => {
  return (
    <>
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-16 lg:gap-24">
        {/* Hero Section */}
        <Hero />

        {/* Featured Section */}
        <section id="consoles" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                Featured Gear
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                Recently certified and ready for battle in your setup.
              </p>
            </div>
            <Link
              className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group"
              to="/consoles"
            >
              View all consoles
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section id="games" className="scroll-mt-32 pb-10">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
                Collector&apos;s Vault
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                Rare finds and legendary titles for your collection.
              </p>
            </div>
            <Link
              className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group"
              to="/games"
            >
              Explore games
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className="group relative aspect-[3/4] bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-xs line-clamp-2">
                    {game.title}
                  </p>
                  <p className="text-primary text-sm font-black mt-1">
                    {game.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <TrustSection />
    </>
  );
};

export default Home;
