import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    date: {
        type: String,
        required: true
    }
})

export const Comment = new mongoose.model('Comment', commentSchema);