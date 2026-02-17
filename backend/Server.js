const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cart.routes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;

// connect to Mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to ridesphere");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});
