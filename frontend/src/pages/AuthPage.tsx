import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, CheckCircle2, Gamepad2, Shield, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Mode = "login" | "signup";

const PERKS = [
  { icon: Gamepad2, text: "Access exclusive deals on retro & modern gear" },
  { icon: Shield, text: "6-month warranty on every purchase" },
  { icon: Truck, text: "Free PAN-India delivery on orders above ₹999" },
  { icon: Zap, text: "Instant sell quotes for your old hardware" },
];

const FloatingParticle: React.FC<{ delay: number; x: number; size: number }> = ({ delay, x, size }) => (
  <motion.div
    className="absolute rounded-full bg-[#B000FF]/20 pointer-events-none"
    style={{ width: size, height: size, left: `${x}%`, bottom: -size }}
    animate={{ y: [0, -700], opacity: [0, 0.6, 0] }}
    transition={{ duration: 8 + Math.random() * 4, delay, repeat: Infinity, ease: "linear" }}
  />
);

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate("/profile"); }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else navigate("/profile");
    } else {
      if (password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error);
      else setSuccess("Account created! Check your email to confirm, then log in.");
    }
    setLoading(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m); setError(""); setSuccess(""); setEmail(""); setPassword(""); setFullName("");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex overflow-hidden relative">
      {/* Animated particles */}
      {[...Array(12)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.7} x={Math.random() * 100} size={4 + Math.random() * 12} />
      ))}

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#B000FF]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10">
        <Link to="/">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tighter text-white">
            Re<span className="text-[#B000FF]">Geno</span>
          </motion.div>
        </Link>

        <div className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl font-black text-white leading-tight mb-4">
              Your Gaming<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B000FF] to-blue-500">
                Universe Awaits
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              India's premier destination for certified pre-owned gaming hardware. Battle-tested gear, unbeatable prices.
            </p>
          </motion.div>

          <div className="space-y-4">
            {PERKS.map(({ icon: Icon, text }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#B000FF]/15 border border-[#B000FF]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#B000FF]" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating console card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B000FF]/30 to-blue-600/20 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-[#B000FF]" />
            </div>
            <div>
              <p className="text-white font-bold">10,000+ Happy Gamers</p>
              <p className="text-slate-400 text-sm">Trusted across India since 2022</p>
            </div>
            <div className="ml-auto flex -space-x-2">
              {["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#0D0D0D] flex items-center justify-center text-white text-xs font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block mb-8 text-center">
            <span className="text-3xl font-black text-white">Re<span className="text-[#B000FF]">Geno</span></span>
          </Link>

          {/* Card */}
          <div className="bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Tab switcher */}
            <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
              {(["login", "signup"] as Mode[]).map((m) => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${mode === m ? "bg-[#B000FF] text-white shadow-lg shadow-[#B000FF]/30" : "text-slate-400 hover:text-white"}`}>
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white">
                    {mode === "login" ? "Welcome back" : "Create account"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {mode === "login" ? "Sign in to your ReGeno account" : "Join thousands of Indian gamers"}
                  </p>
                </div>

                {/* Error / Success */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold p-3 rounded-xl mb-5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">warning</span> {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold p-3 rounded-xl mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#0D0D0D] border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#B000FF] focus:shadow-[0_0_15px_rgba(176,0,255,0.15)] transition-all placeholder-slate-600 text-sm" />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-[#0D0D0D] border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#B000FF] focus:shadow-[0_0_15px_rgba(176,0,255,0.15)] transition-all placeholder-slate-600 text-sm" />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input required type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-[#0D0D0D] border border-white/10 text-white rounded-xl py-3.5 pl-11 pr-12 focus:outline-none focus:border-[#B000FF] focus:shadow-[0_0_15px_rgba(176,0,255,0.15)] transition-all placeholder-slate-600 text-sm" />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {mode === "signup" && (
                    <div className="flex gap-2 flex-wrap">
                      {["6+ chars", "Email verified", "Secure"].map((t) => (
                        <span key={t} className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-full border border-white/10">{t}</span>
                      ))}
                    </div>
                  )}

                  <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                    className="w-full bg-[#B000FF] hover:bg-[#9000D3] text-white font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(176,0,255,0.4)] hover:shadow-[0_0_30px_rgba(176,0,255,0.6)] flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>{mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-slate-500 text-xs mt-6">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                    className="text-[#B000FF] font-bold hover:underline">
                    {mode === "login" ? "Sign up free" : "Sign in"}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            By continuing, you agree to ReGeno's Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
