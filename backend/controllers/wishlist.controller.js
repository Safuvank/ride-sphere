const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");


exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id })
    .populate("products.product");

  res.json(wishlist || { products: [] });
}

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [{ product: productId }],
    });
  } else {
    const exists = wishlist.products.find(
      (p) => p.product.toString() === productId
    );
    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }
    wishlist.products.push({ product: productId });
    await wishlist.save();
  }

  res.status(200).json(wishlist);
}


exports.removeFromWishlist =  async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  wishlist.products = wishlist.products.filter(
    (p) => p.product.toString() !== req.params.productId
  );

  await wishlist.save();
  res.json(wishlist);
}