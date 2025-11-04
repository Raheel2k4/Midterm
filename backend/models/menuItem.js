const mongoose = require('mongoose');

// This schema matches the requirements from Task 1, plus new fields
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  // --- ADDED THESE NEW FIELDS ---
  description: {
    type: String,
    required: false, // Optional
    default: 'A delightful treat from Skybrews Coffee.'
  },
  imageUrl: {
    type: String,
    required: false, // Optional
    // Using a safe placeholder
    default: 'https://placehold.co/600x400/F2F2F7/3C3C43?text=Skybrews'
  }
  // ------------------------------
});

// The third argument 'menu_items' forces this exact collection name
module.exports = mongoose.model('MenuItem', menuItemSchema, 'menu_items');
