import React from "react";
import { NAV_ITEMS } from "../components/constants";
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
import { useAuth } from "../src/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { count, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="ReGeno Logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.href}
                className="hover:text-[#ac3ad8] dark:hover:text-[#ac3ad8] hover:underline hover:underline-offset-4 decoration-[#ac3ad8] decoration-2 transition-all text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input type="text" placeholder="Search retro hardware in India..."
                className="w-full bg-slate-200 dark:bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-white placeholder-slate-500" />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {/* Cart */}
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-primary/20 text-slate-700 dark:text-slate-200 transition-all">
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B000FF] to-blue-600 flex items-center justify-center text-white text-xs font-black cursor-pointer shadow-lg shadow-[#B000FF]/30">
                    {initials}
                  </motion.div>
                </Link>
                <button onClick={() => signOut().then(() => navigate("/"))}
                  className="hidden md:flex items-center justify-center p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <motion.button whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B000FF] hover:bg-[#9000D3] text-white text-sm font-bold transition-all shadow-lg shadow-[#B000FF]/30">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Sign In</span>
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
