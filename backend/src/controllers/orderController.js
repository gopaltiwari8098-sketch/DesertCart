const Order = require('../models/Order');

// POST /api/orders
exports.placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({ userId, items, total });
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// GET /api/orders/my
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};