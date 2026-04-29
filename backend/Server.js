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
const adminRoutes = require("./routes/admin.routes");
const paymentRoutes = require("./routes/payment.routes")
const adminDashboard = require("./routes/adminDashboard.routes")
const adminProductRoutes = require("./routes/adminProduct.routes");
const adminOrderRoutes = require("./routes/adminOrder.routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());



const allowedOrigins = [
  "http://localhost:5173",
  "https://ride-sphere-2w8n.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);


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

app.use("/api/payment", paymentRoutes);
// Admin
app.use("/api/admin/dashboard", adminDashboard )
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(process.env.PORT);

