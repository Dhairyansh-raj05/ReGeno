import React from "react";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../components/constants";

const Consoles: React.FC = () => {
  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
          All Consoles
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Browse our entire collection of certified retro and modern consoles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Consoles;
