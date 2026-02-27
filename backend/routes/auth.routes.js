const express = require("express");

const { register, login, refreshToken, logout } = require("../controllers/auth.controller");

const { registerSchema, loginSchema } = require("../validators/userValidation");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout",logout)
router.post("/refresh", refreshToken);

module.exports = router;