

const Cart = require("../models/cart.model");
const Product = require("../models/product.model");


function calculateCartTotals(cart) {
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  cart.totalItems = cart.products.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
}


exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        quantity,
        price: product.price,
      });
    }

    calculateCartTotals(cart);

    await cart.save();
    await cart.populate("products.productId");

    res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    });

  } catch (error) {
  
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.json({
        products: [],
        totalPrice: 0,
        totalItems: 0,
      });
    }

    res.json({
      products: cart.products,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    });

  } catch (error) {
    // console.log("Get Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }

    calculateCartTotals(cart);

    await cart.save();
    await cart.populate("products.productId");

    res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    });

  } catch (error) {
    // console.log("Update Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    calculateCartTotals(cart);

    await cart.save();
    await cart.populate("products.productId");

    res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
    });

  } catch (error) {
    // console.log("Remove Cart Item Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};