import React from "react";
import { NAV_ITEMS } from "../components/constants";
import { Search, ShoppingCart, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Header: React.FC = () => {
  const router = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* Logo + Nav */}
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <img
              src={"/logo.png"}
              alt="ReGeno Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="hover:text-[#ac3ad8] dark:hover:text-[#ac3ad8] hover:underline hover:underline-offset-4 decoration-[#ac3ad8] decoration-2 transition-all text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search retro hardware in India..."
                className="w-full bg-slate-200 dark:bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center justify-center p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-primary/20 text-slate-700 dark:text-slate-200 transition-all">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={() => router("/Profile")}
              className="flex items-center justify-center p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-primary/20 text-slate-700 dark:text-slate-200 transition-all"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
