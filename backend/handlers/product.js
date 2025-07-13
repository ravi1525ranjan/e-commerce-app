const productSchema = require("../models/product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, shortDescription, price, discount, images, categoryId, brandId, isFeatured, isNewArrival } = req.body;
    const newProduct = new productSchema({
      name,
      description,
      shortDescription,
      price,
      discount,
      images,
      categoryId,
      brandId,
      isFeatured,
      isNewArrival
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, shortDescription, price, discount, images, categoryId, brandId,  isFeatured, isNewArrival } = req.body;

    const updatedProduct = await productSchema.findByIdAndUpdate(
      id,
      { name, description, price, discount, images, categoryId, shortDescription, brandId, isFeatured, isNewArrival},
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productSchema.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

const getNewArrivalProducts = async (req, res) => {
  try {
    const newArrivalProducts = await productSchema.find({ isNewArrival: true });
    if (!newArrivalProducts || newArrivalProducts.length === 0) {
      return res.status(404).json({ message: "No new arrival products found" });
    }
    res
      .status(200)
      .json({ message: "New arrival products retrieved successfully", products: newArrivalProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving new arrival products", error: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await productSchema.find({ isFeatured: true });
    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }
    res
      .status(200)
      .json({ message: "Featured products retrieved successfully", products: featuredProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving featured products", error: error.message });
  }
};

const getProductBysearch = async (req, res) => {
  try {
    const {
      searchTerm = '',
      categoryId = '',
      brandId = '',
      page = 1,
      pageSize = 10,
      sortBy = 'price',
      sortOrder = -1
    } = req.query;

    let queryObj = {};

    if (searchTerm.trim()) {
      const term = searchTerm.trim();
      queryObj.$or = [
        { name: { $regex: term, $options: 'i' } },
        { shortDescription: { $regex: term, $options: 'i' } }
      ];
    }

    if (categoryId) {
      queryObj.categoryId = categoryId;
    }

    if (brandId) {
      queryObj.brandId = brandId;
    }

    const products = await productSchema
      .find(queryObj)
      .sort({sortBy: +sortOrder })
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      productList: products
    });

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getNewArrivalProducts,
  getFeaturedProducts,
  getProductBysearch

};
