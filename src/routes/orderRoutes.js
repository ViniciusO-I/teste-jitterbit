const express = require('express');
const {
  createOrder,
  getOrderById,
  listOrders
} = require('../controllers/orderController');

const router = express.Router();

router.post('/order', createOrder);
router.get('/order/list', listOrders);
router.get('/order/:orderId', getOrderById);

module.exports = router;
