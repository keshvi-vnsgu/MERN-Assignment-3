import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (Admin view)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place new order (User checkout)
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, address, items, totalAmount } = req.body;

    const order = new Order({
      customerName,
      customerEmail,
      address,
      items,
      totalAmount
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
