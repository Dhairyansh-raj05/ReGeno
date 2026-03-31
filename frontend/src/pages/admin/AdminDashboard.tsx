import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";

const AdminDashboard: React.FC = () => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [activeCount, setActiveCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Consoles",
    condition: "Like New",
    image_url: "",
    is_published: true,
  });

  const categories = ["Consoles", "Games", "Accessories", "PC Components"];
  const conditions = ["New", "Like New", "Good", "Fair"];

  useEffect(() => {
    const fetchStats = async () => {
      const { count: products } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);

      const { count: pending } = await supabase
        .from("sell_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { data: requests } = await supabase
        .from("sell_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);

      setActiveCount(products ?? 0);
      setPendingCount(pending ?? 0);
      setRecentRequests(requests ?? []);
    };
    fetchStats();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingProduct(true);
    const { error } = await supabase.from("products").insert([formData]);
    if (error) {
      alert("Failed to add product: " + error.message);
    } else {
      alert("Product added successfully!");
      setFormData({ title: "", description: "", price: "", category: "Consoles", condition: "Like New", image_url: "", is_published: true });
      setActiveCount((c) => c + 1);
    }
    setAddingProduct(false);
  };

  const handleRequest = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("sell_requests").update({ status }).eq("id", id);
    setRecentRequests((prev) => prev.filter((r) => r.id !== id));
    if (status === "approved") setPendingCount((c) => Math.max(0, c - 1));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Command Center</h1>
        <p className="text-slate-400">Manage your arsenal, review intel, and update inventory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B000FF]">add_box</span>
            Add New Gear
          </h2>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
              <input required type="text" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., PS5 DualSense Edge" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Condition</label>
                <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.condition} onChange={e => setFormData({ ...formData, condition: e.target.value })}>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Price</label>
                <input required type="text" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g., ₹17,990" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                <input type="url" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
              <textarea rows={3} className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the item..."></textarea>
            </div>
            <div className="pt-2">
              <button disabled={addingProduct} type="submit" className="w-full bg-[#B000FF] hover:bg-[#8A00C2] text-white font-bold py-3 rounded-lg transition-all border border-[#B000FF] shadow-[0_0_15px_rgba(176,0,255,0.4)] hover:shadow-[0_0_25px_rgba(176,0,255,0.6)] flex items-center justify-center gap-2 disabled:opacity-50">
                {addingProduct ? "Transmitting..." : "Initialize Item"}
              </button>
            </div>
          </form>
        </div>

        {/* Overview & Sell Requests */}
        <div className="space-y-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B000FF]">inventory</span>
              System Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0D0D0D] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">{activeCount}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Active Items</span>
              </div>
              <div className="bg-[#0D0D0D] border border-[#B000FF]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]">
                <span className="text-3xl font-black text-[#B000FF]">{pendingCount}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Pending Comms</span>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-400 mb-3">Recent Comms (Sell Requests)</div>
            <div className="space-y-3">
              {recentRequests.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No pending requests.</p>
              ) : (
                recentRequests.map((req) => (
                  <div key={req.id} className="bg-[#0D0D0D] border border-white/5 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">{req.model_name} - {req.condition}</p>
                      <p className="text-xs text-slate-500">{req.user_email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRequest(req.id, "approved")} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-3 py-1 rounded text-xs font-bold transition-colors">Approve</button>
                      <button onClick={() => handleRequest(req.id, "rejected")} className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 px-3 py-1 rounded text-xs font-bold transition-colors">Reject</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
