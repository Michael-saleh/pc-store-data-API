import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    gender: String,

    birthYear: Number,

    isAdmin: Boolean,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
})

export const User = new mongoose.model('User', userSchema);
