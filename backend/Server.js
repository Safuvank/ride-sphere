const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const checkoutRoutes = require("./routes/checkout.routes");
const orderRoutes = require("./routes/order.routes");
const wishlistRoutes = require("./routes/wishlist.routers");
<<<<<<< HEAD
const paymentRoutes = require("./routes/payment.routes");
const adminRoutes = require("./routes/admin.routes");
const adminDashboard = require("./routes/adminDashboard.routes");
=======
const paymentRoutes = require("./routes/payment.routes")
const adminRoutes = require("./routes/admin.routes");
const adminDashboard = require("./routes/adminDashboard.routes")
>>>>>>> 5df3121dc98efa3efa427cbf5b9c74e093008cc5
const adminProductRoutes = require("./routes/adminProduct.routes");
const adminOrderRoutes = require("./routes/adminOrder.routes");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to ridesphere");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
<<<<<<< HEAD
app.use("/api/payment", paymentRoutes);
// Admin
app.use("/api/admin/dashboard", adminDashboard);
=======
app.use("/api/payment", paymentRoutes)
// Admin
app.use("/api/admin/dashboard", adminDashboard )
>>>>>>> 5df3121dc98efa3efa427cbf5b9c74e093008cc5
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});
