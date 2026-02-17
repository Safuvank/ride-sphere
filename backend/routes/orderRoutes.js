const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/order.controller");

const router = express.Router();

// POST /api/orders
// Create new order
// access private

router.post("/", protect, createOrder);

// GET /api/orders/my-orders
// get logged in users orders
// access private

router.get("/my-orders", protect, getMyOrders);

// route GET /api/orders/:id
//get order details by ID
// access private

router.get("/:id", protect, getOrderById);

module.exports = router;
