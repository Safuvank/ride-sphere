const express = require("express");
const router = express.Router();

const {
  createPaymentIntent,
  verifyPayment,
} = require("../controllers/payment.controller");

const protect = require("../middleware/auth.middleware");

// Create payment
router.post("/create-payment-intent", protect, createPaymentIntent);

// Verify payment
router.post("/verify", protect, verifyPayment);

module.exports = router;
