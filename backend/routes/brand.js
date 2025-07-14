const express = require('express');
const router = express.Router();
const Brand = require('../handlers/brand');
const auth = require('../middleware/user-auth')

// Create a new brand
router.post('/create-brand',auth.authenticateUser, auth.isAdmin, Brand.createBrand);
router.get('/get-brands', auth.authenticateUser, Brand.getBrands);
router.get('/get-brand/:id', auth.authenticateUser, Brand.getBrandById);
router.put('/update-brand/:id',auth.authenticateUser, auth.isAdmin, Brand.updateBrand);
router.delete('/delete-brand/:id',auth.authenticateUser, auth.isAdmin, Brand.deleteBrand);
module.exports = router;