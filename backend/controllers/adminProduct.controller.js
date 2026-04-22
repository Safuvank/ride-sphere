const Product = require("../models/product.model");


exports.getProducts = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const count = await Product.countDocuments();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }
};


// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, brand, price, countInStock, images } =
      req.body;

    const product = new Product({
      user: req.user._id,
      name,
      description,
      category,
      brand,
      price,
      countInStock,
      images,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
  
    res.status(500).json({ message: "Error creating product" });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
   
    res.status(500).json({ message: "Error updating product" });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Error deleting product" });
  }
};
