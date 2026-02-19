const Checkout = require("../models/checkout.model");
const Cart = require("../models/cart.model");

exports.createCheckout = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const checkoutItems = cart.products.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    // recalculate total safely
    const totalPrice = checkoutItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  } catch (error) {}

  try {
    //create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.markCheckoutAsPaid = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}


exports.finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "checkout already finalized" });
    } else {
      res.status(400).json({ message: "checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}