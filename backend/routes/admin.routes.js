const express = require("express");
const User = require("../models/user.model");
const { protect, admin } = require("../middleware/authmiddleware");
const {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  toggleBlockUser
} = require("../controllers/admin.controller");

const router = express.Router();

//route Get api/ admin/users
// get all users(Admin only)
// access private

router.get("/", protect, admin, getUsers);

//route POST api/admin/users
// add new user (admin only)
// access private route

router.post("/", protect, admin, addUser);

//route Put api/admin/users/:id
//update user info (admin only ) name , email,

router.put("/:id", protect, admin, editUser);

// route DELETE api/admin/users/:id
// delete a user
// private admin

router.delete("/:id", protect, admin, deleteUser);

router.put("/block/:id", protect, admin, toggleBlockUser)

module.exports = router;
