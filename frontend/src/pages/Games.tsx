import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle2, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ALL_GAMES } from "../../components/constants";
import { Game } from "../../types/types";
import ProductModal from "../components/ProductModal";

const GameCard: React.FC<{ game: Game; onClick: () => void }> = ({ game, onClick }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - game.price / game.originalPrice) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: game.id, name: game.title, price: game.price, image: game.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative bg-white/5 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-colors hover:shadow-xl hover:shadow-primary/15 flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {game.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#B000FF] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg shadow-[#B000FF]/40">
            {game.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-full border border-white/20">
          {game.rating}
        </div>
        <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x400/1a0033/B000FF?text=${encodeURIComponent(game.title)}`; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-xl font-bold text-xs shadow-lg">View Details</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-[10px] text-[#B000FF] font-bold uppercase tracking-wider mb-0.5">{game.platform}</p>
          <p className="text-white font-black text-sm line-clamp-2 leading-snug">{game.title}</p>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />)}
          <span className="text-[10px] text-slate-500 ml-1">{game.genre}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-primary">&#8377;{game.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-slate-500 line-through">&#8377;{game.originalPrice.toLocaleString("en-IN")}</span>
          <span className="ml-auto text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">{discount}% OFF</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className={`w-full py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
            added ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white"
          }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />Added!</motion.span>
            ) : (
              <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><ShoppingCart className="w-3.5 h-3.5" />Add to Cart</motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filter, setFilter] = useState("All");
  const genres = ["All", "Action", "RPG", "Sports", "Fighting"];
  const filtered = filter === "All" ? ALL_GAMES : ALL_GAMES.filter(g => g.genre.includes(filter));

  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">Games Collection</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Find your next favorite adventure. {ALL_GAMES.length} titles available.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {genres.map(g => (
            <button key={g} onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === g ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {filtered.map((game) => (
            <motion.div key={game.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <GameCard game={game} onClick={() => setSelectedGame(game)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedGame && <ProductModal item={selectedGame} type="game" onClose={() => setSelectedGame(null)} />}
    </main>
  );
};

export default Games;
