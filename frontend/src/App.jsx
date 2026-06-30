import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import OrderTable from './components/OrderTable';


const PRODUCT_API = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:5001';
const ORDER_API = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:5002';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('market');

  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${PRODUCT_API}/api/products`);
      const prodData = await prodRes.json();
      setProducts(prodData);

      const orderRes = await fetch(`${ORDER_API}/api/orders`);
      const orderData = await orderRes.json();
      setOrders(orderData);
    } catch (err) { console.error("Error fetching data:", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleBuyProduct = async (productId, price) => {
    try {
      await fetch(`${ORDER_API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1, totalPrice: price })
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${PRODUCT_API}/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleUpdateProduct = async (id, name, price) => {
    try {
      await fetch(`${PRODUCT_API}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await fetch(`${ORDER_API}/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await fetch(`${ORDER_API}/api/orders/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-8">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'market' ? (
        <ProductList products={products} onBuyProduct={handleBuyProduct} />
      ) : (
        <div>
          <ProductForm 
            products={products} 
            onProductAdded={fetchData} 
            onDeleteProduct={handleDeleteProduct} 
            onUpdateProduct={handleUpdateProduct} 
          />
          <OrderTable 
            orders={orders} 
            onUpdateStatus={handleUpdateOrderStatus} 
            onDeleteOrder={handleDeleteOrder} 
          />
        </div>
      )}
    </div>
  );
}

export default App;