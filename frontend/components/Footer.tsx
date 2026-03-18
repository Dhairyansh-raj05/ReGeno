
import React from 'react';
import { Rocket, Twitter, Globe, Mail, Send, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 px-6 lg:px-20 py-16 mt-auto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <img src="/logo.png" alt="ReGeno Logo" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">The premier destination for battle-tested gaming hardware. Built for Indian players, by players.</p>
          <div className="flex gap-4 mt-4 text-slate-500 dark:text-slate-400">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Globe className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Marketplace</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> All Consoles</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Retro Collection</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Modern Systems</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Sell Your Console</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Resources</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Condition Guide</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Warranty Info</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Shipping Policy</a></li>
            <li><a className="hover:text-primary transition-colors inline-flex items-center gap-1 group" href="#"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Newsletter</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Get notified about new drops in India.</p>
          <div className="flex gap-2">
            <input 
              className="bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 rounded-lg text-sm flex-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" 
              placeholder="Email address" 
              type="email"
            />
            <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center">
              <Send className="w-4 h-4" />
            </button>
          </div>
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
