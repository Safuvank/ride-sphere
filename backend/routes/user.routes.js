const express = require("express");
const router = express.Router();

const { getProfile, getAllUsers } = require("../controllers/user.controller");
const {protect, admin} = require("../middleware/authmiddleware");

// get loggedin user profile

router.get("/profile", protect, getProfile);

//get all users
// admin
router.get("/", protect, getAllUsers);

module.exports = router;
