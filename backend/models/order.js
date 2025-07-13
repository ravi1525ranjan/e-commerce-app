const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: {
    date: Date,
  },
  items: {
    type: Array(any)
  },
  status : {
    type : Number
  }
});
 const Order = mongoose.model('orders',orderSchemarderSchema)
 module.exports = Order