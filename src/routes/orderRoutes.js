const express = require('express');
const {
  createOrder,
  getOrderById,
  listOrders,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/order', createOrder);
router.get('/order/:orderId', getOrderById);
router.get('/order/list', listOrders);
router.delete('/order/:orderId', deleteOrder);

module.exports = router;
