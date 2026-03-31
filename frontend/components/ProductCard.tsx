import React, { useState } from 'react';
import { Product, Condition } from '../types/types';
import { Clock, CheckCircle2, Wrench, Package, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../src/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from '../src/components/ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getBadgeColor = (condition: Condition) => {
    switch (condition) {
      case Condition.MINT: return 'bg-[#B000FF]';
      case Condition.GOOD: return 'bg-blue-500';
      case Condition.FAIR: return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const StatusIcon = () => {
    switch (product.statusIcon) {
      case 'schedule': return <Clock className="w-3.5 h-3.5" />;
      case 'verified': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'handyman': return <Wrench className="w-3.5 h-3.5" />;
      case 'inventory_2': return <Package className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.currentPrice, image: product.imageUrl, condition: product.condition });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round((1 - product.currentPrice / product.originalPrice) * 100);

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setShowModal(true)}
        className="group bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-colors"
      >
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 bg-[#B000FF] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg shadow-[#B000FF]/40">
              {product.badge}
            </div>
          )}
          <div className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full ${getBadgeColor(product.condition)} text-white text-[10px] font-black uppercase tracking-tighter`}>
            {product.condition}
          </div>
          <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={product.name}
          src={product.imageUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1a0033/B000FF?text=${encodeURIComponent(product.name)}`;
          }}
        />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg">View Details</span>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-2 grow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.brand}</p>
          <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-2 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-black text-primary">₹{product.currentPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="ml-auto text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{discount}% OFF</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
            <StatusIcon />
            {product.statusText}
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            className={`w-full mt-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              added
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30'
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Added!
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {showModal && <ProductModal item={product} type="product" onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProductCard;
