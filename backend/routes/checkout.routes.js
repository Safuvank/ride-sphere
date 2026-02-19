const express = require("express");
const Checkout = require("../models/checkout.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const { protect } = require("../middleware/authmiddleware");
const { createCheckout, markCheckoutAsPaid, finalizeCheckout } = require("../controllers/checkout.controller");

const router = express.Router();

// route Post /api/checkout
// create a new checkout session
// access private

router.post("/", protect, createCheckout );

// PUT /api/checkout/:id/pay
// update checkout to mark as paid after successful payment
// access private

router.put("/:id/pay", protect, markCheckoutAsPaid);

// route POST /api/checkout/:id/finalize
// finalize checkout and convert to and order after payment configuration
// access private

router.post("/:id/finalize", protect, finalizeCheckout);

module.exports = router;
