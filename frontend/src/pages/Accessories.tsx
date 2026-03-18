import React from "react";

const Accessories: React.FC = () => {
  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
          Accessories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Complete your setup with our premium controllers, cables, and more.
        </p>
      </div>
      <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
        <p className="text-xl text-slate-500 dark:text-slate-400">
          Accessories catalog coming soon.
        </p>
      </div>
    </main>
  );
};

export default Accessories;
