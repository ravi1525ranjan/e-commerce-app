const brandSchema = require('../models/brand');

const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const newBrand = new brandSchema({ name });
        await newBrand.save();
        res.status(201).json({ message: 'Brand created successfully', brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Error creating brand', error: error.message });
    }
}

const getBrands = async (req, res) => {
    try {
        const brands = await brandSchema.find();
        if (!brands || brands.length === 0) {
            return res.status(404).json({ message: 'No brands found' });
        }
        res.status(200).json({ message: 'Brands retrieved successfully', brands });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving brands', error: error.message });
    }
}

const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await brandSchema.findById(id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand retrieved successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving brand', error: error.message });
    }
}

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedBrand = await brandSchema.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
    } catch (error) {
        res.status(500).json({ message: 'Error updating brand', error: error.message });
    }   
}

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBrand = await brandSchema.findByIdAndDelete(id);
        if (!deletedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand', error: error.message });
    }
}

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand 
};