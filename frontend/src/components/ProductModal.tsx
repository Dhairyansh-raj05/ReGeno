import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Zap, CheckCircle2, Star, Shield, Truck, Package, ChevronRight } from "lucide-react";
import { Product, Game } from "../../types/types";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  item: Product | Game | null;
  type: "product" | "game";
  onClose: () => void;
}

function isProduct(item: Product | Game): item is Product {
  return "currentPrice" in item;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, type, onClose }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "includes">("overview");

  if (!item) return null;

  const price = isProduct(item) ? item.currentPrice : item.price;
  const originalPrice = isProduct(item) ? item.originalPrice : item.originalPrice;
  const image = isProduct(item) ? item.imageUrl : item.image;
  const name = isProduct(item) ? item.name : item.title;
  const discount = Math.round((1 - price / originalPrice) * 100);

  const handleAdd = () => {
    addItem({ id: item.id, name, price, image });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0D0D0D] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative"
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#B000FF]/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Left — Image */}
          <div className="lg:w-2/5 relative bg-gradient-to-br from-[#1a0033] to-[#0D0D0D] flex items-center justify-center p-8 min-h-[280px]">
            {item.badge && (
              <div className="absolute top-4 left-4 bg-[#B000FF] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#B000FF]/40">
                {item.badge}
              </div>
            )}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              src={image}
              alt={name}
              className="w-full max-w-[280px] object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1a0033/B000FF?text=${encodeURIComponent(name)}`;
              }}
            />
            {/* Discount badge */}
            <div className="absolute bottom-4 right-4 bg-emerald-500 text-white font-black text-sm px-3 py-1 rounded-full">
              {discount}% OFF
            </div>
          </div>

          {/* Right — Details */}
          <div className="lg:w-3/5 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-white/10">
              <div className="flex-1 pr-4">
                {isProduct(item) && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#B000FF] uppercase tracking-widest">{item.brand}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.category}</span>
                  </div>
                )}
                {!isProduct(item) && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#B000FF] uppercase tracking-widest">{item.genre}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.year}</span>
                  </div>
                )}
                <h2 className="text-2xl font-black text-white leading-tight">{name}</h2>
                {isProduct(item) && (
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">4.8 (124 reviews)</span>
                  </div>
                )}
                {!isProduct(item) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full font-semibold">{(item as Game).platform}</span>
                    <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold">{(item as Game).rating}</span>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="px-6 py-4 flex items-center gap-4">
              <span className="text-4xl font-black text-white">₹{price.toLocaleString("en-IN")}</span>
              <div className="flex flex-col">
                <span className="text-slate-500 line-through text-sm">₹{originalPrice.toLocaleString("en-IN")}</span>
                <span className="text-emerald-400 font-bold text-sm">Save ₹{(originalPrice - price).toLocaleString("en-IN")}</span>
              </div>
              {isProduct(item) && (
                <span className={`ml-auto text-xs font-black uppercase px-3 py-1 rounded-full ${
                  item.condition === "Mint" ? "bg-[#B000FF]/20 text-[#B000FF] border border-[#B000FF]/30" :
                  item.condition === "Good" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                  "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>{item.condition}</span>
              )}
            </div>

            {/* Tabs */}
            <div className="px-6 flex gap-1 border-b border-white/10">
              {(["overview", ...(isProduct(item) ? ["specs", "includes"] : [])] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
                    activeTab === tab ? "border-[#B000FF] text-[#B000FF]" : "border-transparent text-slate-500 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    {!isProduct(item) && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {(item as Game).features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                            <ChevronRight className="w-3.5 h-3.5 text-[#B000FF] shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    )}
                    {isProduct(item) && (
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                          <Shield className="w-5 h-5 text-[#B000FF] mx-auto mb-1" />
                          <p className="text-white text-xs font-bold">6-Month</p>
                          <p className="text-slate-500 text-[10px]">Warranty</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                          <Truck className="w-5 h-5 text-[#B000FF] mx-auto mb-1" />
                          <p className="text-white text-xs font-bold">Free Ship</p>
                          <p className="text-slate-500 text-[10px]">PAN India</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-[#B000FF] mx-auto mb-1" />
                          <p className="text-white text-xs font-bold">50-Point</p>
                          <p className="text-slate-500 text-[10px]">Inspection</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
                {activeTab === "specs" && isProduct(item) && (
                  <motion.div key="specs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    {item.specs.map((s) => (
                      <div key={s.label} className="flex justify-between items-center py-2.5 border-b border-white/5">
                        <span className="text-slate-500 text-sm">{s.label}</span>
                        <span className="text-white text-sm font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {activeTab === "includes" && isProduct(item) && (
                  <motion.div key="includes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                    {item.includes.map((inc) => (
                      <div key={inc} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                        <div className="w-6 h-6 rounded-lg bg-[#B000FF]/20 flex items-center justify-center shrink-0">
                          <Package className="w-3.5 h-3.5 text-[#B000FF]" />
                        </div>
                        <span className="text-white text-sm">{inc}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="p-6 pt-4 border-t border-white/10">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-[#B000FF] hover:bg-[#9000D3] text-white shadow-[0_0_25px_rgba(176,0,255,0.4)] hover:shadow-[0_0_35px_rgba(176,0,255,0.6)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" /> Add to Cart — ₹{price.toLocaleString("en-IN")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
