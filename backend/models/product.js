const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  images:{
    type: Array(String)
  },
  categoryId:{
    type:Schema.Types.ObjectId,
    ref: 'categories'
  },
  brandId:{
    type:Schema.Types.ObjectId,
    ref: 'brands'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
});
 const Product = mongoose.model('products',productSchema)
 module.exports = Product