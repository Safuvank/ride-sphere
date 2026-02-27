const express = require("express");
const Product = require("../models/product.model");
const { protect, admin } = require("../middleware/authmiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsById,
} = require("../controllers/product.controller");


const router = express.Router();

// route Post /api/products
// description create a new Product data in the database
//access Private/admin

router.post("/", protect, admin, createProduct);

// route for PUT /api/product/:id
// update an existing product ID
// access private/admin

router.put("/:id", protect, admin, updateProduct);

// route Delete /api/products/:id
// delete a product by id
// access private/admin

router.delete("/:id", protect, admin, deleteProduct);

// Get /api/products
// get all products with optional qurery filters
// access public

router.get("/", getProducts);

// route Get /api/products/:id
// get a single product by ID
// access public

router.get("/:id", getProductsById);

module.exports = router;
