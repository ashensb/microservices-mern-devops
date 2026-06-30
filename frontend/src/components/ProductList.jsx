import React, { useState } from 'react';

function ProductList({ products, onBuyProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

 
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    alert('Product ID copied to clipboard! 📋');
  };

  //search and sort logic
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  // Stats calculation
  const totalMarketValue = products.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 📊 REAL-TIME MARKET STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Market Inventory</p>
            <h3 className="text-2xl font-black text-slate-100 mt-1">{products.length} Items</h3>
          </div>
          <span className="text-2xl">📦</span>
        </div>
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Total Assets Value</p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">${totalMarketValue}</h3>
          </div>
          <span className="text-2xl">💰</span>
        </div>
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Network Latency</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1">Active</h3>
          </div>
          <span className="text-2xl">⚡</span>
        </div>
      </div>

      {/* 🔍 SEARCH AND FILTER UTILITIES */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
        <div className="w-full sm:w-72 relative">
          <input 
            type="text" 
            placeholder="Search decentralized items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 🛒 PRODUCTS GRID */}
      <div>
        <h2 className="text-lg font-bold text-slate-400 mb-4 tracking-wider uppercase text-xs">Available Architecture Artifacts</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl text-slate-500">
            No items match your active search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product._id} className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-cyan-950/10 group relative overflow-hidden">
                
                {/* Decorative subtle ambient glow inside card on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <button 
                      onClick={() => copyToClipboard(product._id)}
                      className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors bg-slate-950 px-2.5 py-1 rounded-md flex items-center gap-1.5"
                      title="Click to copy full ID"
                    >
                      <span>id: {product._id.substring(0,8)}</span>
                      <span className="text-[10px]">📋</span>
                    </button>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      In Stock
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200 mt-2">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs text-slate-500">Node Asset Price</span>
                    <p className="text-3xl font-black text-slate-200 tracking-tight">${product.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => onBuyProduct(product._id, product.price)} 
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/10 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>⚡</span> Instant Procurement
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default ProductList;