const express = require('express');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', exports.updateOrderStatus || require('../controllers/orderController').updateOrderStatus);
router.delete('/:id', exports.deleteOrder || require('../controllers/orderController').deleteOrder);

module.exports = router;