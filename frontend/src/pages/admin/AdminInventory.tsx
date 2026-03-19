import React from "react";

const AdminInventory: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Inventory Management</h1>
        <p className="text-slate-400">View and manage all active gear in the system.</p>
      </div>
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="text-center text-slate-500 py-10">
          <span className="material-symbols-outlined text-4xl mb-4 opacity-50">inventory_2</span>
          <p>Inventory grid will populate here once items are added.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
