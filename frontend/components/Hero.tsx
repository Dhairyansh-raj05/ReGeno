
import React from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 min-h-[400px] lg:aspect-[21/9] flex items-center group">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-8 lg:px-20 max-w-4xl py-12 lg:py-0 flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest w-fit">
          <BadgeCheck className="w-4 h-4" /> Verified Secondhand Gamming Devices
        </div>
        <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
          Battle-Tested <span className="text-primary">Gear</span>
        </h1>
        <p className="text-slate-300 text-lg lg:text-xl leading-relaxed max-w-xl">
          Level up sustainably. Premium Secondhand consoles and games, inspected and shipped across India.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg neon-glow hover:bg-primary/90 transition-all flex items-center gap-2 transform active:scale-95 group">
            Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all transform active:scale-95">
            Sell Your Gear
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
