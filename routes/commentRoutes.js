const express = require('express');
const router = express.Router();
const { Comment } = require('../models/commentSchema');

// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

module.exports = router; 