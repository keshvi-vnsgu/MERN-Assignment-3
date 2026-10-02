import React, { useState } from 'react';

export default function AdminPanel({ 
  categories, 
  products, 
  orders,
  onAddCategory, 
  onDeleteCategory, 
  onAddProduct, 
  onDeleteProduct 
}) {
  // Category Form State
  const [catName, setCatName] = useState('');
  const [catParent, setCatParent] = useState('');

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodParentCat, setProdParentCat] = useState('');
  const [prodSubCat, setProdSubCat] = useState('');
  const [prodImage, setProdImage] = useState('');

  const level1Categories = categories.filter(c => c.level === 1);
  const availableSubCategories = categories.filter(
    c => c.level === 2 && (c.parentCategory?._id === prodParentCat || c.parentCategory === prodParentCat)
  );

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!catName.trim()) return alert('Enter category name');

    onAddCategory({
      name: catName,
      parentCategory: catParent || null
    });

    setCatName('');
    setCatParent('');
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodParentCat || !prodSubCat) {
      return alert('Please fill in required fields');
    }

    onAddProduct({
      name: prodName,
      price: Number(prodPrice),
      description: prodDesc,
      parentCategory: prodParentCat,
      subCategory: prodSubCat,
      imageUrl: prodImage || 'https://via.placeholder.com/250x180'
    });

    setProdName('');
    setProdPrice('');
    setProdDesc('');
    setProdParentCat('');
    setProdSubCat('');
    setProdImage('');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>

      {/* SECTION 1: CATEGORY MANAGEMENT (2 LEVEL) */}
      <div className="admin-section">
        <h3>Manage Categories (2 Level)</h3>
        <div className="admin-flex">
          <div>
            <h4>Add Category</h4>
            <form onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label>Category Name:</label>
                <input 
                  type="text" 
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Electronics or Mobiles"
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent Category (For Level 2):</label>
                <select 
                  value={catParent}
                  onChange={(e) => setCatParent(e.target.value)}
                >
                  <option value="">None (Creates Level 1 Main Category)</option>
                  {level1Categories.map(c => (
                    <option key={c._id} value={c._id}>
                      Sub-category of: {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-primary">Save Category</button>
            </form>
          </div>

          <div>
            <h4>Category List</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Parent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      <td>Level {cat.level}</td>
                      <td>{cat.parentCategory?.name || '-'}</td>
                      <td>
                        <button className="btn-danger" onClick={() => onDeleteCategory(cat._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No categories added.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCT MANAGEMENT */}
      <div className="admin-section">
        <h3>Manage Products</h3>
        <div className="admin-flex">
          <div>
            <h4>Add Product</h4>
            <form onSubmit={handleProductSubmit}>
              <div className="form-group">
                <label>Product Name:</label>
                <input 
                  type="text" 
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price ($):</label>
                <input 
                  type="number" 
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Main Category (Level 1):</label>
                <select 
                  value={prodParentCat}
                  onChange={(e) => {
                    setProdParentCat(e.target.value);
                    setProdSubCat('');
                  }}
                  required
                >
                  <option value="">Select Main Category</option>
                  {level1Categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Sub Category (Level 2):</label>
                <select 
                  value={prodSubCat}
                  onChange={(e) => setProdSubCat(e.target.value)}
                  disabled={!prodParentCat}
                  required
                >
                  <option value="">Select Sub Category</option>
                  {availableSubCategories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input 
                  type="text" 
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea 
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary">Save Product</button>
            </form>
          </div>

          <div>
            <h4>Product List</h4>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Main Cat</th>
                  <th>Sub Cat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.parentCategory?.name || '-'}</td>
                      <td>{p.subCategory?.name || '-'}</td>
                      <td>
                        <button className="btn-danger" onClick={() => onDeleteProduct(p._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No products added.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 3: ORDERS LIST */}
      <div className="admin-section">
        <h3>Customer Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(o => (
                <tr key={o._id || Math.random()}>
                  <td>{o.customerName}</td>
                  <td>{o.customerEmail}</td>
                  <td>{o.address}</td>
                  <td>{o.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
                  <td>${o.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No orders received yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
