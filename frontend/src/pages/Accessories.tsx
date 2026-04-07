import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle2, Star, Zap, X, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ACCESSORIES, Accessory } from "../../components/constants";

const AccessoryModal: React.FC<{ item: Accessory; onClose: () => void }> = ({ item, onClose }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - item.currentPrice / item.originalPrice) * 100);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.currentPrice, image: item.imageUrl });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#0D0D0D] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">

          {/* Image */}
          <div className="lg:w-2/5 bg-gradient-to-br from-[#1a0033] to-[#0D0D0D] flex items-center justify-center p-10 min-h-[260px] relative">
            {item.badge && (
              <div className="absolute top-4 left-4 bg-[#B000FF] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#B000FF]/40">
                {item.badge}
              </div>
            )}
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
              src={item.imageUrl} alt={item.name}
              className="w-full max-w-[220px] object-contain drop-shadow-2xl"
              onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1a0033/B000FF?text=${encodeURIComponent(item.name)}`; }} />
            <div className="absolute bottom-4 right-4 bg-emerald-500 text-white font-black text-sm px-3 py-1 rounded-full">{discount}% OFF</div>
          </div>

          {/* Details */}
          <div className="lg:w-3/5 flex flex-col p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#B000FF] text-xs font-bold uppercase tracking-widest mb-1">{item.brand} · {item.category}</p>
                <h2 className="text-xl font-black text-white leading-tight">{item.name}</h2>
                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />)}
                  <span className="text-xs text-slate-500 ml-1">4.7 rating</span>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-black text-white">₹{item.currentPrice.toLocaleString("en-IN")}</span>
              <span className="text-slate-500 line-through text-sm">₹{item.originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-emerald-400 font-bold text-sm">Save ₹{(item.originalPrice - item.currentPrice).toLocaleString("en-IN")}</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Compatible With</p>
              <p className="text-white text-sm font-semibold">{item.compatibility}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {item.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-[#B000FF] shrink-0" />{f}
                </div>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all ${
                added ? "bg-emerald-500 text-white" : "bg-[#B000FF] hover:bg-[#9000D3] text-white shadow-[0_0_25px_rgba(176,0,255,0.4)]"
              }`}>
              <AnimatePresence mode="wait">
                {added
                  ? <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" />Added to Cart!</motion.span>
                  : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" />Add to Cart — ₹{item.currentPrice.toLocaleString("en-IN")}</motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AccessoryCard: React.FC<{ item: Accessory; onClick: () => void }> = ({ item, onClick }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - item.currentPrice / item.originalPrice) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: item.id, name: item.name, price: item.currentPrice, image: item.imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-colors">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a0033]/60 to-[#0D0D0D] flex items-center justify-center p-6">
        {item.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#B000FF] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg shadow-[#B000FF]/40">
            {item.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 z-10 bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-1 rounded-full border border-emerald-500/30">
          {discount}% OFF
        </div>
        <img src={item.imageUrl} alt={item.name}
          className="w-full max-w-[180px] object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
          onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1a0033/B000FF?text=${encodeURIComponent(item.name)}`; }} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg">View Details</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.brand} · {item.category}</p>
        <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">{item.name}</h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-black text-primary">₹{item.currentPrice.toLocaleString("en-IN")}</span>
          <span className="text-xs text-slate-500 line-through">₹{item.originalPrice.toLocaleString("en-IN")}</span>
        </div>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 mt-1 ${
            added ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white"
          }`}>
          <AnimatePresence mode="wait">
            {added
              ? <motion.span key="y" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />Added!</motion.span>
              : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />Add to Cart</motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Accessories: React.FC = () => {
  const [selected, setSelected] = useState<Accessory | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Controllers", "Headsets", "Storage", "Accessories"];
  const filtered = filter === "All" ? ACCESSORIES : ACCESSORIES.filter(a => a.category === filter);

  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">Accessories</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Complete your setup with premium controllers, headsets, and more.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === cat ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 text-slate-400 hover:text-white border border-white/10"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map(item => (
            <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <AccessoryCard item={item} onClick={() => setSelected(item)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selected && <AccessoryModal item={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default Accessories;
