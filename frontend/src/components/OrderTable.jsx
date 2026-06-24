import React from 'react';

function OrderTable({ orders, onUpdateStatus, onDeleteOrder }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mt-8">
      <h2 className="text-xl font-bold mb-4 text-amber-400">📜 Global Orders Pipeline</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs uppercase bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Product ID</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {orders.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-6 text-slate-600">No orders placed yet.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{order._id}</td>
                  <td className="py-3 px-4 font-mono text-xs text-cyan-500">{order.productId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">${order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : 'bg-amber-500/10 text-amber-400 border-amber-500/10'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    {order.status === 'Pending' && (
                      <button onClick={() => onUpdateStatus(order._id, 'Completed')} className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/10">Complete</button>
                    )}
                    <button onClick={() => onDeleteOrder(order._id)} className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 rounded-md border border-red-500/10">Cancel</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;