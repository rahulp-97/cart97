const express = require('express');
const router = express.Router();
const {getProducts, getProductById, getSortedProducts} = require('../controllers/productControllers');
const authMiddleware = require('../middleware/authMiddleware');

// get product
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// get sorted products by price
// router.get('/sort', getSortedProducts);

module.exports = router;