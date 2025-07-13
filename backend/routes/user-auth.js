const express = require('express')
const router = express.Router()
const User = require('../handlers/user-auth')

// Create a new category
router.post('/create-user',User.createUser)
// Login user
router.post('/login', User.loginUser)


module.exports = router;