const express = require('express')
const router = express.Router()
const Category = require('../handlers/category')
const auth = require('../middleware/user-auth')

// Create a new category
router.post('/create-category',auth.authenticateUser, auth.isAdmin, Category.createCategory)
router.get('/get-categories', auth.authenticateUser,Category.getCategories)
router.get ('/get-category/:id',auth.authenticateUser, Category.getCategoryById)
router.put('/update-category/:id',auth.authenticateUser, auth.isAdmin,  Category.updateCategory)
router.delete('/delete-category/:id',auth.authenticateUser,auth.isAdmin, Category.deleteCategory)

module.exports = router;