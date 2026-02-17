const express = require("express");
const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");
const { protect } = require("../middleware/authmiddleware");
const { getWishlist, addToWishlist } = require("../controllers/wishlist.controller");

const router = express.Router();

// GET wishlist
router.get("/", protect, getWishlist);

// ADD to wishlist
router.post("/", protect, addToWishlist );

// REMOVE from wishlist
router.delete("/:productId", protect,);

module.exports = router;
