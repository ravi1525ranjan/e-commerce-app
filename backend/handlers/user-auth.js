const User = require('../models/user')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

// Create a new category
createUser = async (req, res) => {
    try {
        const { name, email, mobileNumber, isAdmin } = req.body;
        const password = await bcrypt.hash(req.body.password, 10); // Hash the password 

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user
        const user = new User({
            name,
            email,
            mobileNumber,
            password,
            isAdmin
        }); 
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({ id: user._id, name: user.name, email:user.email, isAdmin:user.isAdmin }, '9876@12345', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createUser,
    loginUser
}