import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserShop from './components/UserShop';
import AdminPanel from './components/AdminPanel';
import CartModal from './components/CartModal';

const API_BASE = '/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Data states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchOrders();
  }, []);

  // Add Category Handler (Admin)
  const handleAddCategory = async (catData) => {
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  // Delete Category Handler (Admin)
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  // Add Product Handler (Admin)
  const handleAddProduct = async (productData) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // Delete Product Handler (Admin)
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Add to Cart Handler (User)
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => item._id === productId ? { ...item, quantity: newQty } : item)
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  // Checkout Order Handler
  const handleCheckout = async (orderData) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        setCart([]);
        fetchOrders();
      }
    } catch (err) {
      console.error('Error checking out:', err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Views */}
      <main className="main-content">
        {activeTab === 'user' ? (
          <UserShop 
            categories={categories}
            products={products}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <AdminPanel 
            categories={categories}
            products={products}
            orders={orders}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>

      {/* Cart Modal Overlay */}
      {isCartOpen && (
        <CartModal 
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}
