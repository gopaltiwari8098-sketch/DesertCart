const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    category: { type: String, default: 'general' },
    description: { type: String, default: '' },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);