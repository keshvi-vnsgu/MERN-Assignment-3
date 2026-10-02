import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import Category from './models/Category.js';
import Product from './models/Product.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopping_cart_db';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('MERN Shopping Cart API is running...');
});

// Seed Initial Sample Data function
const seedInitialData = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('Seeding initial categories & products...');
      
      // Level 1 (Main) Categories
      const electronics = await Category.create({ name: 'Electronics', level: 1 });
      const fashion = await Category.create({ name: 'Fashion', level: 1 });
      const home = await Category.create({ name: 'Home & Kitchen', level: 1 });

      // Level 2 (Sub) Categories
      const mobiles = await Category.create({ name: 'Smartphones', parentCategory: electronics._id, level: 2 });
      const laptops = await Category.create({ name: 'Laptops', parentCategory: electronics._id, level: 2 });
      const mensWear = await Category.create({ name: "Men's Clothing", parentCategory: fashion._id, level: 2 });
      const womensWear = await Category.create({ name: "Women's Clothing", parentCategory: fashion._id, level: 2 });

      // Sample Products
      await Product.create([
        {
          name: 'iPhone 15 Pro',
          price: 999,
          description: 'Latest Apple iPhone with Titanium finish and A17 Pro chip.',
          parentCategory: electronics._id,
          subCategory: mobiles._id,
          imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60',
          stock: 15
        },
        {
          name: 'MacBook Air M3',
          price: 1299,
          description: 'Supercharged by M3 chip, ultra thin and fast battery life.',
          parentCategory: electronics._id,
          subCategory: laptops._id,
          imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
          stock: 10
        },
        {
          name: 'Casual Denim Jacket',
          price: 79,
          description: 'Stylish blue denim jacket for casual outings.',
          parentCategory: fashion._id,
          subCategory: mensWear._id,
          imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60',
          stock: 25
        },
        {
          name: 'Floral Summer Dress',
          price: 59,
          description: 'Elegant light floral dress for summer days.',
          parentCategory: fashion._id,
          subCategory: womensWear._id,
          imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60',
          stock: 20
        }
      ]);

      console.log('Sample data seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
};

// Database Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    await seedInitialData();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Starting server in fallback mode (Ensure MongoDB daemon is running for database persistence)');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
