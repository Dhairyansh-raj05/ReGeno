import React, { useState } from "react";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import TrustSection from "../../components/TrustSection";
import { PRODUCTS, ALL_GAMES } from "../../components/constants";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle2, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Game } from "../../types/types";
import ProductModal from "../components/ProductModal";

const MiniGameCard: React.FC<{ game: Game; onClick: () => void }> = ({ game, onClick }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: game.id, name: game.title, price: game.price, image: game.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/60 transition-colors hover:shadow-xl hover:shadow-primary/20"
    >
      <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      {game.badge && (
        <div className="absolute top-2 left-2 bg-[#B000FF] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
          {game.badge}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-[9px] text-[#B000FF] font-bold uppercase tracking-wider mb-0.5">{game.platform}</p>
        <p className="text-white font-bold text-xs line-clamp-2 leading-snug mb-1">{game.title}</p>
        <p className="text-primary font-black text-sm">&#8377;{game.price.toLocaleString("en-IN")}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-lg ${added ? "bg-emerald-500 text-white" : "bg-primary text-white shadow-primary/40"}`}>
          <AnimatePresence mode="wait">
            {added
              ? <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Added!</motion.span>
              : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1"><ShoppingCart className="w-3 h-3" />Add</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <>
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-16 lg:gap-24">
        <Hero />

        {/* Featured Consoles */}
        <section id="consoles" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Featured Gear</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Recently certified and ready for battle in your setup.</p>
            </div>
            <Link className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group" to="/consoles">
              View all {PRODUCTS.length} consoles
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PRODUCTS.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        {/* Games Vault */}
        <section id="games" className="scroll-mt-32 pb-10">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Collector&apos;s Vault</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Rare finds and legendary titles for your collection.</p>
            </div>
            <Link className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all group" to="/games">
              Explore all {ALL_GAMES.length} games
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALL_GAMES.slice(0, 12).map((game) => (
              <MiniGameCard key={game.id} game={game} onClick={() => setSelectedGame(game)} />
            ))}
          </div>
        </section>
      </main>

      <TrustSection />

      {selectedGame && <ProductModal item={selectedGame} type="game" onClose={() => setSelectedGame(null)} />}
    </>
  );
};

export default Home;
