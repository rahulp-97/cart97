const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const authMiddleware = require('../middleware/authMiddleware');

// get product
router.get('/', productControllers.getProducts);

// get product by id
router.get('/:id', productControllers.getProductById);

module.exports = router;