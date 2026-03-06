const Product = require("../models/product.model");


exports.getProducts = async (req, res) =>{
    try{
        const products = await Product.find({});
        res.json(products)
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
}