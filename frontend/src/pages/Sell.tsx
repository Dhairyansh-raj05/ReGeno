import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Truck, Leaf, ArrowLeft, CheckCircle2 } from "lucide-react";
import { CATEGORIES, MODELS, CONDITIONS, ProductModel } from "../data/ProductData";
import { supabase } from "../services/supabase";

const STEPS = ["Category", "Model", "Condition", "Quote"];

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const Sell: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

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
        (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedCategory, searchQuery]);

  const quotePrice = useMemo(() => {
    if (!selectedModel || !selectedCondition) return 0;
    const condition = CONDITIONS.find((c) => c.id === selectedCondition);
    return condition ? selectedModel.basePrice * condition.multiplier : 0;
  }, [selectedModel, selectedCondition]);

  const handleAcceptQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel || !selectedCondition) return;
    setSubmitting(true);

    const conditionLabel = CONDITIONS.find((c) => c.id === selectedCondition)?.name ?? selectedCondition;

    const { error } = await supabase.from("sell_requests").insert([{
      user_name: userName,
      user_email: userEmail,
      model_id: selectedModel.id,
      model_name: selectedModel.name,
      brand: selectedModel.brand,
      condition: conditionLabel,
      quoted_price: quotePrice,
      status: "pending",
    }]);

    if (error) {
      alert("Failed to submit: " + error.message);
      setSubmitting(false);
      return;
    }

    // Email is best-effort — don't block on failure
    try {
      await supabase.functions.invoke("send-order-email", {
        body: { to: userEmail, name: userName, model: selectedModel.name, brand: selectedModel.brand, condition: conditionLabel, price: quotePrice },
      });
    } catch (_) {
      // silent — sell request is already saved
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const resetAll = () => {
    setStep(1); setSubmitted(false); setSelectedCategory(null);
    setSelectedModel(null); setSelectedCondition(null);
    setUserEmail(""); setUserName("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black mb-3">Request Submitted!</h2>
          <p className="text-slate-400 mb-2">
            We've received your sell request for the{" "}
            <span className="text-white font-semibold">{selectedModel?.name}</span>.
          </p>
          <p className="text-slate-400 mb-8">
            A confirmation email has been sent to{" "}
            <span className="text-[#B000FF] font-semibold">{userEmail}</span>. Our team will reach out within 24 hours.
          </p>
          <button onClick={resetAll} className="bg-[#B000FF] hover:bg-[#9000D3] text-white px-8 py-3 rounded-full font-bold transition-all">
            Sell Another Device
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="max-w-[1024px] mx-auto w-full px-6 lg:px-8 py-10 flex flex-col gap-10">
        <div className="text-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Sell Your <span className="text-[#B000FF]">Battle-Tested Gear</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Get an instant quote and turn your old hardware into electric cash today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#B000FF] -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((label, idx) => {
              const n = idx + 1;
              const active = step >= n;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${active ? "bg-[#B000FF] text-white shadow-[0_0_15px_rgba(176,0,255,0.5)]" : "bg-white/10 text-slate-500 border border-white/10"}`}>
                    {step > n ? <CheckCircle2 className="w-5 h-5" /> : n}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${active ? "text-white" : "text-slate-500"}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {step > 1 && (
          <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-max -mt-4 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 min-h-[400px] overflow-hidden relative">
          <AnimatePresence mode="wait">

            {step === 1 && (
              <motion.div key="s1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-6">What are you selling?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setSearchQuery(""); handleNext(); }}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all group">
                        <Icon className="w-12 h-12 text-slate-400 group-hover:text-[#B000FF] transition-colors" />
                        <span className="font-semibold">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-6">Select your model</h2>
                <div className="relative w-full mb-8 max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your device (e.g., PS5, Switch)..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 focus:ring-2 focus:ring-[#B000FF] focus:outline-none text-white placeholder-slate-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {filteredModels.length > 0 ? filteredModels.map((model) => (
                    <button key={model.id} onClick={() => { setSelectedModel(model); handleNext(); }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all text-left">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{model.brand}</p>
                        <p className="font-bold text-lg">{model.name}</p>
                      </div>
                      <span className="text-[#B000FF] bg-[#B000FF]/10 px-3 py-1 rounded-full text-sm font-bold">
                        Up to ₹{model.basePrice.toLocaleString("en-IN")}
                      </span>
                    </button>
                  )) : (
                    <div className="col-span-full py-10 text-center text-slate-400">No models found.</div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-2">Quality Inspector</h2>
                <p className="text-slate-400 mb-8">Be honest evaluating {selectedModel?.name}. We'll verify this later.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONDITIONS.map((cond) => (
                    <button key={cond.id} onClick={() => { setSelectedCondition(cond.id); handleNext(); }}
                      className="flex flex-col items-start text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B000FF]/50 hover:bg-white/10 transition-all group">
                      <h3 className="font-black text-xl mb-2 group-hover:text-[#B000FF] transition-colors">{cond.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{cond.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#B000FF]/20 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#B000FF]" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Your Estimated Quote</h2>
                <p className="text-slate-400 mb-6 max-w-md">
                  Based on your <span className="text-white font-semibold">{selectedModel?.name}</span> in{" "}
                  <span className="text-white font-semibold">{CONDITIONS.find((c) => c.id === selectedCondition)?.name}</span> condition.
                </p>
                <div className="bg-gradient-to-r from-[#B000FF]/20 to-purple-900/20 border border-[#B000FF]/30 rounded-3xl py-8 px-16 mb-8 shadow-[0_0_40px_rgba(176,0,255,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B000FF] to-purple-500" />
                  <p className="text-slate-400 font-semibold mb-2 uppercase tracking-widest text-sm">We'll Pay You</p>
                  <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                    ₹{quotePrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <form onSubmit={handleAcceptQuote} className="w-full max-w-sm space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Your Name</label>
                    <input required type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#B000FF] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email for Confirmation</label>
                    <input required type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#B000FF] transition-colors" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-[#B000FF] hover:bg-[#9000D3] active:scale-95 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)] disabled:opacity-50">
                    {submitting ? "Submitting..." : "Accept Quote & Proceed"}
                  </button>
                </form>
                <button onClick={() => setStep(1)} className="mt-6 text-slate-400 hover:text-white underline text-sm transition-colors">
                  Evaluate another device
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: Zap, title: "Instant Cash", desc: "Electric fast payouts straight to your specified bank account upon verification." },
            { icon: Truck, title: "Doorstep Pickup", desc: "We handle the logistics. Schedule a free pickup right from your home." },
            { icon: Leaf, title: "Eco-Friendly", desc: "Reduce e-waste by giving your tech a second life with gamers who care." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#B000FF]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#B000FF]" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Sell;
