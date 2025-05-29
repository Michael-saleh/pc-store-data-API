const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../models/userSchema');
const mongoose = require('mongoose');
let currentUser = null;
let isLoggedIn = false;

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = req.body;

        bcrypt.hash(userData.password, saltRounds, async function (err, hash) {
            if (err) {
                console.log(err)
            } else {
                const newUser = new User({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    username: userData.username,
                    password: hash,
                    birthYear: userData.birthYear,
                    isAdmin: userData.isAdmin || false,
                    comments: [],
                    orders: []
                });
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            }

        });


    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log(err.message)
                res.send(err.message)
            } else {
                if (result == true) {
                    isLoggedIn = true;
                    currentUser = user;
                    console.log("user logged in")
                    res.send(currentUser)
                } else {
                    console.log("wrong username or password");
                    res.send("wrong username or password");
                }
            }
        })
    } else {
        console.log("wrong username or password");
        res.send("wrong username or password");
    }
});

// Log out user

router.post('/logout', (req, res) => {
    currentUser = null;
    isLoggedIn = false;
    res.send("logged out")
})

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(req.params.id);
        if (user) {
            if (isLoggedIn == true && user.username == currentUser.username) {
                try {
                    const deleted = await User.findByIdAndDelete(req.params.id);
                    if (deleted) {
                        res.send(`${deleted.username} was deleted successfully`);
                    } else {
                        res.send("user not found");
                    }
                } catch (error) {
                    res.send(error.message);
                }
            } else {
                res.send("Not authorized")
            }
        } else {
            res.send("user not found")
        }
    }
    catch (err) {
        res.send(err.message)
    }
});

module.exports = router; 