const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [{
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
        },
        addedAt: {
        type: Date,
        default: Date.now
        }
    }]
    }, {
    timestamps: true
});
 const Wishlist = mongoose.model('wishlists',wishlistSchema)
 module.exports = Wishlist