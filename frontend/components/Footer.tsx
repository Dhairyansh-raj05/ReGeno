import React, { useState } from 'react';
import { Twitter, Globe, Mail, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../src/services/supabase';

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
    if (error && error.code !== "23505") { // 23505 = unique violation (already subscribed)
      setSubStatus("error");
    } else {
      setSubStatus("done");
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 px-6 lg:px-20 py-16 mt-auto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <img src="/logo.png" alt="ReGeno Logo" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">The premier destination for battle-tested gaming hardware. Built for Indian players, by players.</p>
          <div className="flex gap-4 mt-4 text-slate-500 dark:text-slate-400">
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://regeno.co" target="_blank" rel="noreferrer"><Globe className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="mailto:support@regeno.co"><Mail className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Marketplace</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> All Consoles</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Retro Collection</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Modern Systems</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/sell"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Sell Your Console</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Resources</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/sell"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Condition Guide</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Warranty Info</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Shipping Policy</Link></li>
            <li><Link className="hover:text-primary transition-colors inline-flex items-center gap-1 group" to="/consoles"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Newsletter</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Get notified about new drops in India.</p>
          {subStatus === "done" ? (
            <p className="text-emerald-500 text-sm font-semibold">You're subscribed!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-sm flex-1 px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-slate-900 dark:text-white"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={subStatus === "loading"}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
          {subStatus === "error" && <p className="text-rose-500 text-xs mt-2">Something went wrong. Try again.</p>}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto border-t border-slate-200 dark:border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        <p>© 2026 ReGeno India Marketplace. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
