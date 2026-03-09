const express = require("express");
const { protect, admin } = require("../middleware/authmiddleware");
const { getDashboardStats } = require("../controllers/adminDashboard.controller");

const router = express.Router();

router.get("/", protect, admin, getDashboardStats);

module.exports = router;