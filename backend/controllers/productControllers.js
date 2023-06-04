const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');

// all products controller
// GET /api/products
exports.getProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.json(products); 
});

// single product controller
// GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }
    res.status(404);
    throw new Error('Product not found');
});