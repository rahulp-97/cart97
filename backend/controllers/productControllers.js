const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

// all products controller
// GET /api/products
exports.getProducts = asyncHandler(async (req, res) => {
    // regular expression is used and direct comparison is not done here. 
    //to match the name by any input name like to match iphone with input keyword phone.
    // $options:'i' will make it case insensitive.
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const products = await Product.find({...keyword});
  res.json(products);
});

// single product controller
// GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});
