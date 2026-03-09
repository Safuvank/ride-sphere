const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    const orders = await Order.find({});

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    const orderTimeline = {};
    const revenueTimeline = {};

    orders.forEach((order) => {
      const day = new Date(order.createdAt).toISOString().split("T")[0];

      orderTimeline[day] = (orderTimeline[day] || 0) + 1;
      revenueTimeline[day] =
        (revenueTimeline[day] || 0) + (order.totalPrice || 0);
    });

    const orderTimelineArray = Object.entries(orderTimeline).map(
      ([date, orders]) => ({
        date,
        orders,
      })
    );

    const revenueTimelineArray = Object.entries(revenueTimeline).map(
      ([date, revenue]) => ({
        date,
        revenue,
      })
    );

    res.json({
      users,
      products,
      totalOrders,
      totalRevenue,
      orderTimeline: orderTimelineArray,
      revenueTimeline: revenueTimelineArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};