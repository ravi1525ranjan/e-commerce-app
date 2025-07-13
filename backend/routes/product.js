const express = require('express');
const router = express.Router();
const Product = require('../handlers/product');
const auth = require('../middleware/user-auth')

// Create a new brand
router.post('/create-product',auth.authenticateUser, auth.isAdmin, Product.createProduct);
router.get('/get-products', Product.getProducts);
// router.get('/products-by-query',auth.authenticateUser,Product.getProductBysearch)
router.get('/get-product/:id', Product.getProductById);
router.put('/update-product/:id',auth.authenticateUser, auth.isAdmin, Product.updateProduct);
router.delete('/delete-product/:id',auth.authenticateUser, auth.isAdmin, Product.deleteProduct);
module.exports = router;