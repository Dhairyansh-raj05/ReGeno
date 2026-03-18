
import React from 'react';
import { ClipboardCheck, ShieldCheck, Leaf } from 'lucide-react';

const TrustSection: React.FC = () => {
  const features = [
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: 'Rigorous Inspection',
      desc: 'Every unit undergoes a 50-point technical check before being listed on our marketplace.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: '6-Month Warranty',
      desc: 'Play with peace of mind. We stand by our gear with full local technical support.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Gaming',
      desc: 'Reducing e-waste in India, one console at a time. Circular gaming starts here.'
    }
  ];

  return (
    <section className="bg-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20">
      <div className="flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Why Trust ReGeno?</h2>
          <p className="text-slate-600 dark:text-slate-400">We ensure every piece of gear is ready for its next adventure with our industry-leading restoration process, now serving the Indian gaming community.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 p-8 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
