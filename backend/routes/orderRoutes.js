const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrders,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderControllers");
const { protect, admin } = require("../middleware/authMiddleware");

// post order
router.post("/", protect, addOrderItems);

//get all orders
router.get("/", protect, admin, getOrders);

//my orders
router.get("/mine", protect, getMyOrders);

//get order by id
router.get("/:id", protect, getOrdersById);

//update order to paid
router.put("/:id/pay", protect, updateOrderToPaid);

//update order to delivered
router.put("/:id/deliver", protect, updateOrderToDelivered);

module.exports = router;