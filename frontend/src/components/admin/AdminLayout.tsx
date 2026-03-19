import React from "react";
import { Outlet, Navigate, Link, NavLink, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";

const AdminLayout: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#B000FF]/20 border-t-[#B000FF] rounded-full animate-spin shadow-[0_0_15px_rgba(176,0,255,0.5)]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden font-display text-white selection:bg-[#B000FF]/30">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/5 flex flex-col hidden md:flex z-10 shrink-0">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter">
              Re<span className="text-[#B000FF]">Geno</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Command Center</span>
          </Link>
        </div>
        
        <nav className="p-4 flex-1 space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${isActive ? 'bg-[#B000FF]/10 text-[#B000FF] border border-[#B000FF]/20 shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]' : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/5 font-medium'}`
            }
          >
            <span className="material-symbols-outlined">space_dashboard</span>
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/inventory" 
            className={({ isActive }) => 
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${isActive ? 'bg-[#B000FF]/10 text-[#B000FF] border border-[#B000FF]/20 shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]' : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/5 font-medium'}`
            }
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Inventory
          </NavLink>
          <NavLink 
            to="/admin/requests" 
            className={({ isActive }) => 
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${isActive ? 'bg-[#B000FF]/10 text-[#B000FF] border border-[#B000FF]/20 shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]' : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/5 font-medium'}`
            }
          >
            <span className="material-symbols-outlined">inbox</span>
            Sell Requests
          </NavLink>
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => 
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${isActive ? 'bg-[#B000FF]/10 text-[#B000FF] border border-[#B000FF]/20 shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]' : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/5 font-medium'}`
            }
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/10 rounded-xl font-bold transition-all">
            <span className="material-symbols-outlined text-sm">logout</span>
            Terminate Uplink
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B000FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="p-6 md:p-10 max-w-7xl mx-auto relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
