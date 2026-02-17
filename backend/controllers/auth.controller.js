const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //registartion logic
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
        message: "Login successful",
        token
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "server error"})
  }
};
