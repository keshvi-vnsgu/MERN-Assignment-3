import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get Products (with optional filter by parentCategory or subCategory)
router.get('/', async (req, res) => {
  try {
    const { parentCategory, subCategory } = req.query;
    let query = {};

    if (subCategory) {
      query.subCategory = subCategory;
    } else if (parentCategory) {
      query.parentCategory = parentCategory;
    }

    const products = await Product.find(query)
      .populate('parentCategory', 'name')
      .populate('subCategory', 'name');
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Product
router.post('/', async (req, res) => {
  try {
    const { name, price, description, parentCategory, subCategory, imageUrl, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      parentCategory,
      subCategory,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
      stock: stock || 10
    });

    const savedProduct = await product.save();
    const populated = await Product.findById(savedProduct._id)
      .populate('parentCategory', 'name')
      .populate('subCategory', 'name');

    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
