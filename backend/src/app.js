const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'DesertCart API'
  });
});

module.exports = app;