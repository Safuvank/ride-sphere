const express = require("express");
const {protect, admin} = require("../middleware/authmiddleware");
const { getProducts, createProduct,updateProduct, deleteProduct } = require("../controllers/adminProduct.controller");

const router = express.Router()


// GET api/admin/products
// get all products (Admin only)
// access private/admin

router.get("/", protect, admin, getProducts)

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id",protect,admin, deleteProduct);

module.exports = router;