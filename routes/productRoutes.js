const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifySupabaseToken = require('../middleware/auth');

router.post('/create', verifySupabaseToken, productController.createProduct);
router.get('/products', verifySupabaseToken, productController.getProducts);
router.get('/search/:id', verifySupabaseToken, productController.getProductById);

module.exports = router;
