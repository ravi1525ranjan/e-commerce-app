const { get } = require('mongoose');
const Category = require('../models/category')

// Create a new category
createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
}

getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.status(200).json({ message: 'Categories retrieved successfully', categories });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error: error.message
        });
    }
}

getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category retrieved successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category', error: error.message
        });
    }
}

updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
}

deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
}