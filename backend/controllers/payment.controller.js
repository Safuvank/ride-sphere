// const Order = require("../models/order.model");
// const {
//   createPaymentIntentService,
//   verifyPaymentService,
// } = require("../services/payment.service");

// // Create payment intent
// exports.createPaymentIntent = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const paymentIntent = await createPaymentIntentService(
//       order.totalPrice
//     );

//     res.json(paymentIntent);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Verify payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentData } = req.body;

//     const isValid = await verifyPaymentService(paymentData);

//     if (!isValid) {
//       return res.status(400).json({ message: "Payment failed" });
//     }

//     const order = await Order.findById(orderId);

//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentStatus = "success";

//     await order.save();

//     res.json({ message: "Payment successful" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};