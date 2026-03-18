
import React from 'react';
import { Product, Condition } from '../types/types';
import { Clock, CheckCircle2, Wrench, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getBadgeColor = (condition: Condition) => {
    switch (condition) {
      case Condition.MINT: return 'bg-primary';
      case Condition.GOOD: return 'bg-blue-500';
      case Condition.FAIR: return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const StatusIcon = () => {
    switch(product.statusIcon) {
      case 'schedule': return <Clock className="w-3.5 h-3.5" />;
      case 'verified': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'handyman': return <Wrench className="w-3.5 h-3.5" />;
      case 'inventory_2': return <Package className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="product-card group bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col h-full cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div className={`absolute top-3 right-3 z-10 px-2 py-1 rounded ${getBadgeColor(product.condition)} text-white text-[10px] font-black uppercase tracking-tighter`}>
          {product.condition}
        </div>
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt={product.name}
          src={product.imageUrl} 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
           <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg">View Details</button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-2 grow">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-primary">₹{product.currentPrice.toLocaleString('en-IN')}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <StatusIcon /> 
          {product.statusText}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
