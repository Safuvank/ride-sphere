const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    //  Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //  Find users cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
        totalPrice: 0,
      });
    }

    // Check if product already in cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId,
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        quantity: quantity,
        price: product.price,
      });
    }

    //  Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    await cart.populate("products.productId");

    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).populate("products.productId")

//     if (!cart) {
//       return res.json({ products: [], totalPrice: 0 });
//     }
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.productId");

    if (!cart) {
      return res.json({
        products: [],
        totalPrice: 0
      });
    }

    res.json({
      products: cart.products,
      totalPrice: cart.totalPrice
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




// exports.updateCartItem = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user?._id; // from auth middleware

//   try {
//     if (!productId) {
//       return res.status(400).json({ message: "Product ID is required" });
//     }

//     if (quantity < 0) {
//       return res.status(400).json({ message: "Quantity cannot be negative" });
//     }

//     //  Find Cart
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Find Product in Cart
//     const productIndex = cart.products.findIndex(
//       (p) => p.productId.toString() === productId,
//     );

//     if (productIndex === -1) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     // Update Quantity or Remove
//     if (quantity === 0) {
//       cart.products.splice(productIndex, 1);
//     } else {
//       cart.products[productIndex].quantity = quantity;
//     }

//     // Recalculate Total
//     cart.totalPrice = cart.products.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0,
//     );

//     await cart.save();

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };






exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    await cart.populate("products.productId")

    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user?._id;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productExists = cart.products.some(
      (p) => p.productId.toString() === productId,
    );

    if (!productExists) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove product
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId,
    );

    // Recalculate total
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    await cart.populate("products.productId")

    return res.status(200).json({
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
