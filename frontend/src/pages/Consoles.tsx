import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../components/constants";
import { motion, AnimatePresence } from "framer-motion";

const Consoles: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Modern", "Retro", "Handheld"];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">All Consoles</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Browse our entire collection. {PRODUCTS.length} certified units available.
          </p>
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

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <AnimatePresence>
          {filtered.map((product) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default Consoles;
