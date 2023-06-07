const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const authMiddleware = require('../middleware/authMiddleware');

const {addOrderItems, getOrders, getMyOrders, getOrdersById, updateOrderToPaid, updateOrderToDelivered} = orderControllers;
const {protect, admin} = authMiddleware;

// post order
router.post('/', protect, addOrderItems);

//get all orders
router.get('/', protect, admin, getOrders);

//my orders
router.get('/mine', protect, getMyOrders);

//get order by id
router.get('/:id', protect, admin, getOrdersById);

//update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

//update order to delivered
router.put('/:id/deliver', protect, updateOrderToDelivered);

module.exports = router;