import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Get all categories (populated with parentCategory details)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory', 'name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Level 1 (Main) Categories
router.get('/level1', async (req, res) => {
  try {
    const mainCategories = await Category.find({ level: 1 });
    res.json(mainCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Level 2 (Sub) Categories by Parent ID
router.get('/level2/:parentId', async (req, res) => {
  try {
    const subCategories = await Category.find({ 
      level: 2, 
      parentCategory: req.params.parentId 
    });
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new Category (Level 1 or Level 2)
router.post('/', async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    
    // Determine level: if parentCategory is provided -> Level 2, else -> Level 1
    const level = parentCategory ? 2 : 1;

    const category = new Category({
      name,
      parentCategory: parentCategory || null,
      level
    });

    const savedCategory = await category.save();
    const populated = await Category.findById(savedCategory._id).populate('parentCategory', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    // Also delete child subcategories if level 1 is deleted
    await Category.deleteMany({ parentCategory: req.params.id });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
