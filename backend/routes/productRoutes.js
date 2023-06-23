const express = require('express');
const router = express.Router();
const {getProducts, getProductById, createProduct} = require('../controllers/productControllers');
const {protect, admin} = require('../middleware/authMiddleware');

// get product
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// POST create a product
router.post('/', protect, admin, createProduct);

// get sorted products by price
// router.get('/sort', getSortedProducts);

module.exports = router;