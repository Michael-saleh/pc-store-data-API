import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

export const Order = new mongoose.model('Order', orderSchema);
