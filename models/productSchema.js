import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    modelNumber: {
        type: String,
        required: false
    },

    manifacturer: {
        type: String,
        required: false
    },


    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

    images: [{
        type: String
    }],

    description: String
})

export const Product = new mongoose.model('Product', productSchema);