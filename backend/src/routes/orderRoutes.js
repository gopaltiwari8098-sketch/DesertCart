const express = require('express');
const { placeOrder, myOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/my', auth, myOrders);

module.exports = router;