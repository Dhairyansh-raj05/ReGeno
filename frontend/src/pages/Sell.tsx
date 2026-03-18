import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Truck, Leaf, ArrowLeft, CheckCircle2 } from "lucide-react";
import { CATEGORIES, MODELS, CONDITIONS, ProductModel } from "../data/ProductData";

const STEPS = ["Category", "Model", "Condition", "Quote"];

const Sell: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (step === 2) setSelectedModel(null);
    if (step === 3) setSelectedCondition(null);
  };

  const filteredModels = useMemo(() => {
    if (!selectedCategory) return [];
    return MODELS.filter(
      (m) =>
        m.categoryId === selectedCategory &&
        (m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedCategory, searchQuery]);

  const quotePrice = useMemo(() => {
    if (!selectedModel || !selectedCondition) return 0;
    const condition = CONDITIONS.find((c) => c.id === selectedCondition);
    if (!condition) return 0;
    return selectedModel.basePrice * condition.multiplier;
  }, [selectedModel, selectedCondition]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="max-w-[1024px] mx-auto w-full px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="text-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Sell Your <span className="text-[#B000FF]">Battle-Tested Gear</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Get an instant quote and turn your old hardware into electric cash today.
          </p>
        </div>

        {/* Breadcrumbs */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#B000FF] -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((label, idx) => {
              const stepNumber = idx + 1;
              const isActive = step >= stepNumber;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${isActive ? 'bg-[#B000FF] text-white shadow-[0_0_15px_rgba(176,0,255,0.5)]' : 'bg-white/10 text-slate-500 border border-white/10'}`}
                  >
                    {step > stepNumber ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-500'} hidden sm:block`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        {step > 1 && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-max -mt-4 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}

        {/* Main Wizard Area */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 min-h-[400px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CATEGORY */}
            {step === 1 && (
              <motion.div 
                key="step1"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl font-bold mb-6">What are you selling?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSearchQuery("");
                          handleNext();
                        }}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all group"
                      >
                        <Icon className="w-12 h-12 text-slate-400 group-hover:text-[#B000FF] transition-colors" />
                        <span className="font-semibold">{cat.name}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: MODEL */}
            {step === 2 && (
              <motion.div 
                key="step2"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl font-bold mb-6">Select your model</h2>
                
                {/* Search Bar */}
                <div className="relative w-full mb-8 max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your device (e.g., PS5, Switch)..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 focus:ring-2 focus:ring-[#B000FF] focus:outline-none text-white placeholder-slate-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredModels.length > 0 ? (
                    filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          handleNext();
                        }}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all text-left"
                      >
                        <div>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{model.brand}</p>
                          <p className="font-bold text-lg">{model.name}</p>
                        </div>
                        <span className="text-[#B000FF] bg-[#B000FF]/10 px-3 py-1 rounded-full text-sm font-bold">
                          Up to ₹{model.basePrice.toLocaleString("en-IN")}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full py-10 text-center text-slate-400">
                      No models found. Try a different search term.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONDITION */}
            {step === 3 && (
              <motion.div 
                key="step3"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl font-bold mb-2">Quality Inspector</h2>
                <p className="text-slate-400 mb-8">Be honest evaluating {selectedModel?.name}. We'll verify this later.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONDITIONS.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => {
                        setSelectedCondition(cond.id);
                        handleNext();
                      }}
                      className="flex flex-col items-start text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all group"
                    >
                      <h3 className="font-black text-xl mb-2 group-hover:text-[#B000FF] transition-colors">{cond.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{cond.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: QUOTE */}
            {step === 4 && (
              <motion.div 
                key="step4"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-10 h-full"
              >
                <div className="w-16 h-16 rounded-full bg-[#B000FF]/20 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#B000FF]" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">Your Estimated Quote</h2>
                <p className="text-slate-400 mb-8 max-w-md">
                  Based on your evaluation of the <span className="text-white font-semibold">{selectedModel?.name}</span> in <span className="text-white font-semibold">{CONDITIONS.find(c => c.id === selectedCondition)?.name}</span> condition.
                </p>

                <div className="bg-gradient-to-r from-[#B000FF]/20 to-purple-900/20 border border-[#B000FF]/30 rounded-3xl py-8 px-16 mb-8 shadow-[0_0_40px_rgba(176,0,255,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B000FF] to-purple-500"></div>
                  <p className="text-slate-400 font-semibold mb-2 uppercase tracking-widest text-sm">We'll Pay You</p>
                  <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                    ₹{quotePrice.toLocaleString("en-IN")}
                  </p>
                </div>

                <button className="bg-[#B000FF] hover:bg-[#9000D3] active:scale-95 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)]">
                  Accept Quote & Proceed
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="mt-6 text-slate-400 hover:text-white underline text-sm transition-colors"
                >
                  Evaluate another device
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features / Why Sell to Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#B000FF]/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#B000FF]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Instant Cash</h3>
            <p className="text-slate-400 text-sm">Electric fast payouts straight to your specified bank account upon verification.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#B000FF]/10 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-[#B000FF]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Doorstep Pickup</h3>
            <p className="text-slate-400 text-sm">We handle the logistics. Schedule a free pickup right from your home.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#B000FF]/10 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-[#B000FF]" />
            </div>
            <h3 className="font-bold text-lg mb-2">Eco-Friendly</h3>
            <p className="text-slate-400 text-sm">Reduce e-waste by giving your tech a second life with gamers who care.</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Sell;
