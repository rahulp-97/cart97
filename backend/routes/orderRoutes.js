const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const {protect, admin} = require('../middleware/authMiddleware');

const {addOrderItems, getOrders, getMyOrders, getOrdersById, updateOrderToPaid, updateOrderToDelivered} = orderControllers;


// post order
router.post('/', protect, orderControllers.addOrderItems);

//get all orders
router.get('/', protect, admin, orderControllers.getOrders);

//my orders
router.get('/mine', protect, orderControllers.getMyOrders);

//get order by id
router.get('/:id', protect, admin, orderControllers.getOrdersById);

//update order to paid
router.put('/:id/pay', protect, orderControllers.updateOrderToPaid);

//update order to delivered
router.put('/:id/deliver', protect, orderControllers.updateOrderToDelivered);

module.exports = router;