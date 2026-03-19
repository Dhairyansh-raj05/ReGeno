import React from "react";

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">System Settings</h1>
        <p className="text-slate-400">Configure global parameters and security uplinks.</p>
      </div>
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="text-center text-slate-500 py-10">
          <span className="material-symbols-outlined text-4xl mb-4 opacity-50">settings</span>
          <p>Settings panel is currently restricted. Clearance level insufficient.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
