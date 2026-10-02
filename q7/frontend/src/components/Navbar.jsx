import React from 'react';

export default function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setActiveTab('user')}>
        🛒 MyShop (MERN)
      </div>

      <div className="nav-links">
        <button 
          className={activeTab === 'user' ? 'active' : ''}
          onClick={() => setActiveTab('user')}
        >
          User Store
        </button>

        <button 
          className={activeTab === 'admin' ? 'active' : ''}
          onClick={() => setActiveTab('admin')}
        >
          Admin Panel
        </button>

        <button onClick={onOpenCart}>
          Cart <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
