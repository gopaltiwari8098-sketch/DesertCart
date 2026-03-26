const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        price: Number,
        qty: Number
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'placed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);