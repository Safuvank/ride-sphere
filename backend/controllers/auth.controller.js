const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {generateAccessToken, generateRefreshToken} = require("../services/token.service")

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

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid username or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid username or password" });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);


//     // save refresh token in DB 

//     user.refreshToken = refreshToken;

//     await user.save()

//     res.json({
//         message: "Login successful",
//         accessToken,
//         refreshToken
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({message: "server error"})
//   }
// };




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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      accessToken, // only send access token in JSON
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    console.error("RefreshToken Error:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};