import mongoose from 'mongoose';

// 2-Level Category Schema:
// Level 1: Parent Category (e.g. Electronics, Clothing) - parentCategory is null
// Level 2: Sub Category (e.g. Mobiles under Electronics) - parentCategory references Level 1 Category
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  parentCategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    default: null 
  },
  level: { 
    type: Number, 
    enum: [1, 2], 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
