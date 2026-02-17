const Product = require("../models/product.model")


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
      user: req.user._id, // Reference to the admin user who created it
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

    //find product by ID

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

      // Save the updated product

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
    // find the product by Id
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
    const { search, category, sort, page = 1, limit = 8 } = req.query;

    let query = {};

    // search
    if (search) {
      query.$or = [
        {name : {$regex : search, $options: "i"}},
        {description: {$regex: search , $options: "i"}}
      ]
    }

    // category

  if(category && category !== "All"){
    query.category = category;
  }

  // sorting

  let sortOption = {};
  if(sort === "price-low-high") sortOption = {price : 1};
  if(sort === "price-high-low") sortOption = {price : -1};
  if(sort === "name-az") sortOption = {name: 1};
  if(sort === "name-za") sortOption = {name: -1};

  const skip = (page - 1) * limit;

  const total = await Product.countDocuments(query);

  // Fetch products and apply sorting and limit
  const products = await Product.find(query)
  .sort(sortOption)
  .skip(skip)
  .limit(Number(limit));

  res.json({
    products,
    totalPages: Math.ceil(total/ limit),
    currentPage: Number(page)
  })

  } catch (error) {
    console.log(error)
    res.status(500).send("server error")
  }
}


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