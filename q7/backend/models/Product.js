import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  description: { 
    type: String, 
    default: '' 
  },
  // References Level 1 Main Category
  parentCategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  // References Level 2 Sub Category
  subCategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  imageUrl: { 
    type: String, 
    default: 'https://placehold.co/300x200?text=Product' 
  },
  stock: { 
    type: Number, 
    default: 10 
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
