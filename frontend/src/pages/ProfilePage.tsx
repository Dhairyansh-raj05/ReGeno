import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Package, LogOut, Edit3, CheckCircle2, ShoppingBag, Clock, Zap, Shield, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

interface Order {
  id: string;
  order_id: string;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  status: string;
  created_at: string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    processing: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    shipped: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    delivered: "bg-[#B000FF]/15 text-[#B000FF] border-[#B000FF]/30",
  };
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${map[status] ?? map.confirmed}`}>
      {status}
    </span>
  );
};

const ProfilePage: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "account">("orders");
  const [displayName, setDisplayName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Gamer");
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_email", user.email)
      .order("created_at", { ascending: false });
    setOrders(data ?? []);
    setOrdersLoading(false);
  };

  const handleSaveName = async () => {
    setSavingName(true);
    await supabase.auth.updateUser({ data: { full_name: displayName } });
    setSavingName(false);
    setEditingName(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#B000FF]/20 border-t-[#B000FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const initials = displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const joinDate = new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B000FF]/8 rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-12 relative z-10">

        {/* Profile Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a0033]/80 to-[#111]/80 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B000FF]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B000FF] to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-[#B000FF]/30">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0D0D0D]" />
            </div>

            <div className="flex-1">
              {editingName ? (
                <div className="flex items-center gap-2 mb-1">
                  <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                    className="bg-white/10 border border-[#B000FF]/40 text-white rounded-xl px-3 py-1.5 text-xl font-black focus:outline-none focus:border-[#B000FF] w-48"
                    autoFocus onKeyDown={e => e.key === "Enter" && handleSaveName()} />
                  <button onClick={handleSaveName} disabled={savingName}
                    className="bg-[#B000FF] text-white px-3 py-1.5 rounded-xl text-xs font-bold disabled:opacity-50">
                    {savingName ? "..." : "Save"}
                  </button>
                  <button onClick={() => setEditingName(false)} className="text-slate-400 hover:text-white text-xs">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black text-white">{displayName}</h1>
                  <button onClick={() => setEditingName(true)} className="text-slate-500 hover:text-[#B000FF] transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-slate-400 text-sm flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <p className="text-slate-600 text-xs mt-1">Member since {joinDate}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-2xl font-black text-[#B000FF]">{orders.length}</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">Orders</p>
              </div>
              <button onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-2xl font-bold text-sm transition-all">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 relative z-10">
            {[
              { icon: ShoppingBag, label: "Total Orders", value: orders.length },
              { icon: Zap, label: "Total Spent", value: `₹${orders.reduce((s, o) => s + o.total_amount, 0).toLocaleString("en-IN")}` },
              { icon: Shield, label: "Warranty Active", value: orders.length > 0 ? "Yes" : "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#B000FF]/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#B000FF]" />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">{value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-2xl p-1 mb-6 w-fit">
          {(["orders", "account"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab ? "bg-[#B000FF] text-white shadow-lg shadow-[#B000FF]/30" : "text-slate-400 hover:text-white"}`}>
              {tab === "orders" ? "My Orders" : "Account"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {ordersLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-[#B000FF]/20 border-t-[#B000FF] rounded-full animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-white font-black text-xl mb-2">No orders yet</h3>
                  <p className="text-slate-500 text-sm mb-6">Start shopping to see your orders here.</p>
                  <button onClick={() => navigate("/consoles")}
                    className="bg-[#B000FF] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#9000D3] transition-all shadow-lg shadow-[#B000FF]/30 flex items-center gap-2 mx-auto">
                    Browse Gear <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                orders.map((order, i) => (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-[#111]/80 border border-white/10 rounded-2xl p-6 hover:border-[#B000FF]/30 transition-all backdrop-blur-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#B000FF] font-black text-sm tracking-wider">{order.order_id}</span>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-black text-xl">₹{order.total_amount.toLocaleString("en-IN")}</p>
                        <p className="text-slate-500 text-xs">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      {order.items.map((item, j) => (
                        <div key={j} className="flex justify-between text-sm">
                          <span className="text-slate-400">{item.name} <span className="text-slate-600">×{item.quantity}</span></span>
                          <span className="text-white font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === "account" && (
            <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-[#111]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
              <h3 className="text-white font-black text-lg">Account Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Display Name", value: displayName, icon: User },
                  { label: "Email Address", value: user.email ?? "", icon: Mail },
                  { label: "Member Since", value: joinDate, icon: Shield },
                  { label: "Account Status", value: user.email_confirmed_at ? "Verified" : "Unverified", icon: CheckCircle2 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-[#B000FF]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#B000FF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl font-bold transition-all">
                <LogOut className="w-4 h-4" /> Sign Out of ReGeno
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProfilePage;
