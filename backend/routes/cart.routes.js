const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
} = require("../controllers/cart.controller");

const router = express.Router();

// route POST /api/cart
// add product to the cart for a guest or logged in user
// access public

router.post("/", protect, addToCart);

// route Get /api/cart
// get logged in users or guest users cart
// access public

router.get("/", protect, getCart);

// route PUT / api/cart
// update product quantity in the cart for a guest or loggedn in user
// access public

router.put("/", protect, updateCartItem);

// route delete /api/cart/
// remove product from the cart
// access public

router.delete("/", protect, removeFromCart);


// to get total price from cart
// router.get("/total", protect, getCartTotal)

module.exports = router;
