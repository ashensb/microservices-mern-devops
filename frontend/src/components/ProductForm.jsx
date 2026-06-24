import React, { useState } from 'react';

function ProductForm({ products, onProductAdded, onDeleteProduct, onUpdateProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editId) {
      // Update Mode
      await onUpdateProduct(editId, name, Number(price));
      setEditId(null);
    } else {
      // Create Mode
      try {
        await fetch('http://localhost:5001/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, price: Number(price), stock: 20 })
        });
      } catch (err) { console.error(err); }
    }
    setName(''); setPrice('');
    onProductAdded();
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
        <h2 className="text-xl font-bold mb-4 text-cyan-400">
          {editId ? '📝 Edit Product' : '📦 Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Product Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Mac Studio" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Price ($)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 1999" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 rounded-xl shadow-lg">
              {editId ? 'Update' : 'Publish Product'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setName(''); setPrice(''); }} className="bg-slate-800 text-slate-400 px-4 rounded-xl">Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* Admin Inventory Controls */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-slate-200">Inventory Control Panel</h2>
        <div className="divide-y divide-slate-800">
          {products.map(product => (
            <div key={product._id} className="py-3 flex justify-between items-center gap-4">
              <div>
                <h4 className="font-bold text-slate-200">{product.name}</h4>
                <p className="text-sm text-cyan-400">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(product)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">Edit</button>
                <button onClick={() => onDeleteProduct(product._id)} className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/10">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;