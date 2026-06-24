import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="mb-12 border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          E-Commerce DevOps Microservices
        </h1>
        <p className="text-slate-400 text-sm mt-1">Architecture: React ↔ Microservices Architecture</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => setActiveTab('market')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'market' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🛒 Marketplace
        </button>
        <button 
          onClick={() => setActiveTab('admin')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          ⚙️ Admin Console
        </button>
      </div>
    </header>
  );
}

export default Navbar;