/* const express = require('express');
const router = express.Router();
const { Comment } = require('../models/commentSchema');

// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

module.exports = router;  */


import express from 'express';
import { Comment } from '../models/commentSchema.js'; // note: add .js if using ESM

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

export default router;
