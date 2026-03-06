const express = require("express");
const {protect, admin} = require("../middleware/authmiddleware");
const { getProducts } = require("../controllers/adminProduct.controller");

const router = express.Router()


// GET api/admin/products
// get all products (Admin only)
// access private/admin

router.get("/", protect, admin, getProducts)

module.exports = router;