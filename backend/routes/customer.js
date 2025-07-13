const express = require('express');
const router = express.Router();
const Product = require('../handlers/product');
const auth = require('../middleware/user-auth')



router.get('/new-products',auth.authenticateUser, Product.getNewArrivalProducts, (req, res) => {
    res.status(200).json({ message: 'Customer route is working' });
});

router.get('/features-products', auth.authenticateUser, Product.getFeaturedProducts, (req, res) => {
    res.status(200).json({ message: 'Customer route is working' });
});

router.get('/products-by-query', Product.getProductBysearch);

module.exports = router;