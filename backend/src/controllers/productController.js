const Product = require('../models/Product');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// POST create product (admin/seed)
exports.createProduct = async (req, res) => {
  try {
    const { title, price, image, category, description } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price required' });
    }

    const product = await Product.create({
      title,
      price,
      image,
      category,
      description
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};