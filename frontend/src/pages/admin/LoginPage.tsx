import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      setError("Access Denied: Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6 font-display relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B000FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0D0D0D] border border-[#B000FF]/30 mb-6 shadow-[0_0_30px_rgba(176,0,255,0.2)]">
            <span className="material-symbols-outlined text-[#B000FF] text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">System Access</h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">ReGeno Command Center Authorization</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 text-sm font-bold p-4 rounded-lg mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">warning</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Target Identity</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">person</span>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@regeno.co"
                className="w-full bg-[#0D0D0D] border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#B000FF] transition-colors focus:shadow-[0_0_15px_rgba(176,0,255,0.2)]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Security Key</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">lock</span>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0D0D0D] border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#B000FF] transition-colors focus:shadow-[0_0_15px_rgba(176,0,255,0.2)]"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#B000FF] hover:bg-[#8A00C2] text-white font-black uppercase tracking-wider py-4 rounded-xl transition-all border border-[#B000FF] shadow-[0_0_20px_rgba(176,0,255,0.4)] hover:shadow-[0_0_30px_rgba(176,0,255,0.6)] flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Initialize Uplink"}
            <span className="material-symbols-outlined text-xl">{loading ? "sync" : "login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
