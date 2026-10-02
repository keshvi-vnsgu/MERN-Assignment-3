import React, { useState } from 'react';

export default function CartModal({ cart, onClose, onUpdateQty, onRemoveItem, onCheckout }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !address) {
      return alert('Fill in all checkout fields.');
    }

    onCheckout({
      customerName,
      customerEmail,
      address,
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#27ae60' }}>
            <h3>✅ Order Placed Successfully!</h3>
          </div>
        ) : cart.length > 0 ? (
          <div>
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <span style={{ fontSize: '13px', color: '#666' }}>${item.price} x {item.quantity}</span>
                </div>
                <div>
                  <button onClick={() => onUpdateQty(item._id, item.quantity - 1)}>-</button>
                  <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item._id, item.quantity + 1)}>+</button>
                  <button className="btn-danger" style={{ marginLeft: '10px' }} onClick={() => onRemoveItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total: ${totalAmount.toFixed(2)}
            </div>

            <form onSubmit={handleCheckoutSubmit} style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
              <h4>Checkout Details</h4>
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address:</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Place Order
              </button>
            </form>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
