import React, { useState } from 'react';

export default function UserShop({ categories, products, onAddToCart }) {
  const [selectedParentId, setSelectedParentId] = useState('all');
  const [selectedSubId, setSelectedSubId] = useState('all');

  // Filter Level 1 (Main) Categories
  const level1Categories = categories.filter(cat => cat.level === 1);

  // Filter Level 2 (Sub) Categories for selected Level 1 parent
  const subCategories = selectedParentId === 'all' 
    ? [] 
    : categories.filter(cat => cat.level === 2 && (cat.parentCategory?._id === selectedParentId || cat.parentCategory === selectedParentId));

  // Filter Products by Category
  const filteredProducts = products.filter(product => {
    const parentMatch = selectedParentId === 'all' || 
      product.parentCategory?._id === selectedParentId || 
      product.parentCategory === selectedParentId;

    const subMatch = selectedSubId === 'all' || 
      product.subCategory?._id === selectedSubId || 
      product.subCategory === selectedSubId;

    return parentMatch && subMatch;
  });

  const handleSelectParent = (id) => {
    setSelectedParentId(id);
    setSelectedSubId('all');
  };

  return (
    <div>
      {/* 2-Level Category Filter */}
      <div className="filter-box">
        <h4>Level 1: Main Category</h4>
        <div className="category-buttons">
          <button
            className={`cat-btn ${selectedParentId === 'all' ? 'active' : ''}`}
            onClick={() => handleSelectParent('all')}
          >
            All Products
          </button>
          {level1Categories.map(cat => (
            <button
              key={cat._id}
              className={`cat-btn ${selectedParentId === cat._id ? 'active' : ''}`}
              onClick={() => handleSelectParent(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Level 2 Sub Categories */}
        {selectedParentId !== 'all' && (
          <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #ccc' }}>
            <h4>Level 2: Sub Category</h4>
            <div className="category-buttons">
              <button
                className={`cat-btn ${selectedSubId === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedSubId('all')}
              >
                All Subcategories
              </button>
              {subCategories.length > 0 ? (
                subCategories.map(sub => (
                  <button
                    key={sub._id}
                    className={`cat-btn ${selectedSubId === sub._id ? 'active' : ''}`}
                    onClick={() => setSelectedSubId(sub._id)}
                  >
                    {sub.name}
                  </button>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#888' }}>No subcategories found for this category.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const parentName = product.parentCategory?.name || 'Main Cat';
            const subName = product.subCategory?.name || 'Sub Cat';

            return (
              <div key={product._id} className="product-card">
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/250x180'} 
                  alt={product.name} 
                />
                <div className="product-card-body">
                  <div className="category-tag">
                    {parentName} &gt; {subName}
                  </div>

                  <div className="product-title">{product.name}</div>
                  <div className="product-desc">{product.description || 'No description available.'}</div>
                  <div className="product-price">${product.price}</div>

                  <button 
                    className="btn-add-cart"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>No products available.</p>
        )}
      </div>
    </div>
  );
}
