const mongoose = require("mongoose");

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

    manifaturer: {
        type: String,
        required: true
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

module.exports.Product = new mongoose.model('Product', productSchema);