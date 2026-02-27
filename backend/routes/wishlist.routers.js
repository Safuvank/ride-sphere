const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

// GET wishlist
router.get("/", protect, getWishlist);

// ADD to wishlist
router.post("/", protect, addToWishlist);

// REMOVE from wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
