const express = require('express');
const router = express.Router();
const {getProducts, getProductById, createProduct, updateProduct} = require('../controllers/productControllers');
const {protect, admin} = require('../middleware/authMiddleware');

// get product
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// POST create a product
router.post('/', protect, admin, createProduct);

// PUT update a product
router.put('/:id', protect, admin, updateProduct);

module.exports = router;