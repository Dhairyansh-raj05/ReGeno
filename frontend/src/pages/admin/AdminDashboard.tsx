import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminDashboard: React.FC = () => {
  const [addingProduct, setAddingProduct] = useState(false);
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

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingProduct(true);
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("Product added successfully!");
      setFormData({
        title: "", description: "", price: "", category: "Consoles", condition: "Like New", image_url: "", is_published: true
      });
    } catch (err: any) {
      console.error(err);
      alert("Failed to add product: " + err.message);
    }
    setAddingProduct(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Command Center</h1>
        <p className="text-slate-400">Manage your arsenal, review intel, and update inventory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Multi-Category Manager */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#B000FF]">add_box</span>
            Add New Gear
          </h2>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
              <input required type="text" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g., PS5 DualSense Edge" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Condition</label>
                <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Price</label>
                <input required type="text" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g., ₹17,990" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                <input type="url" className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
              <textarea rows={3} className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#B000FF] transition-colors" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the item..."></textarea>
            </div>
            <div className="pt-2">
              <button disabled={addingProduct} type="submit" className="w-full bg-[#B000FF] hover:bg-[#8A00C2] text-white font-bold py-3 rounded-lg transition-all border border-[#B000FF] shadow-[0_0_15px_rgba(176,0,255,0.4)] hover:shadow-[0_0_25px_rgba(176,0,255,0.6)] flex items-center justify-center gap-2 disabled:opacity-50">
                {addingProduct ? "Transmitting..." : "Initialize Item"}
              </button>
            </div>
          </form>
        </div>

        {/* Sell Requests & Overview */}
        <div className="space-y-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B000FF]">inventory</span>
              System Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0D0D0D] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">42</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Active Items</span>
              </div>
              <div className="bg-[#0D0D0D] border border-[#B000FF]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-[inset_0_0_20px_rgba(176,0,255,0.05)]">
                <span className="text-3xl font-black text-[#B000FF]">7</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Pending Comms</span>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-400 mb-3">Recent Comms (Sell Requests)</div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-[#0D0D0D] border border-white/5 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">RX 6700 XT - Good Cond.</p>
                    <p className="text-xs text-slate-500">Incoming from Agent_X</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-3 py-1 rounded text-xs font-bold transition-colors">Approve</button>
                    <button className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 px-3 py-1 rounded text-xs font-bold transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
