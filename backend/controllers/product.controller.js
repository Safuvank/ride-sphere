const Product = require("../models/product.model")
const APIFeatures = require("../utils/apiFeatures");


exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      countInStock,
      category,
      brand,
      images,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      countInStock,
      category,
      brand,
      images,
      user: req.user._id, //who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      countInStock,
      category,
      brand,
      images,
    } = req.body;

    

    const product = await Product.findById(req.params.id);

    if (product) {
      //update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.images = images || product.images;


      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}

exports.deleteProduct = async (req, res) => {
  try {
  
    const product = await Product.findById(req.params.id);

    if (product) {
      //remove the product form DB
      await product.deleteOne();
      res.json({ message: "prodcut removed" });
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}


exports.getProducts = async (req, res) => {
  try {
    const resultPerPage = Number(req.query.limit) || 8;

    const apiFeatures = new APIFeatures(
      Product.find(),
      req.query
    )
      .search()
      .filter()
      .sort()
      .paginate(resultPerPage);

    const products = await apiFeatures.query;

    const total = await Product.countDocuments();

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / resultPerPage),
      currentPage: Number(req.query.page) || 1,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getProductsById = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message: "Product Not Found"})
        }
    }catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Errror"})
    }
}