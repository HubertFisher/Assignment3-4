const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tours: [
        {
            tour: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tour'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;