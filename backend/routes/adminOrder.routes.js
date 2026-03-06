const express = require("express");

const { protect, admin } = require("../middleware/authmiddleware");
const {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/adminOrder.controller");

const router = express.Router();

// GET api/admin/orders
// Get all orders
// access private

router.get("/", protect, admin, getOrders);

// PUT api/admin/orders/:id
// Update order status
// access private / admin

router.put("/:id", protect, admin, updateOrderStatus);

// route DELETE /api/admin/orders/:id
// delete an order
// private / admin

router.delete("/:id", protect, admin, deleteOrder);


module.exports = router;
