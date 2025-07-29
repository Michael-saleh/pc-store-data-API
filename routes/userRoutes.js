import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
const saltRounds = 10;
import { User } from "../models/userSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticate from "../middlewares/authenticate.js";
dotenv.config();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" })
    } else {
        res.json(user);
    }

});

// Create new user
router.post('/', async (req, res) => {
    const userData = req.body;

    bcrypt.hash(userData.password, saltRounds, async function (error, hash) {
        if (!error) {
            const userExists = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });

            if (!userExists) {
                try {
                    const newUser = new User({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                        email: userData.email,
                        password: hash,
                        birthYear: userData.birthYear,
                        gender: userData.gender,
                        isAdmin: userData.isAdmin || false,
                        comments: [],
                        orders: []
                    });
                    const savedUser = await newUser.save();
                    res.json(savedUser);
                }
                catch (error) {
                    res.status(400).json({ message: error.message });
                }
            } else {
                if (userExists.email == userData.email) {
                    res.status(403).json({ message: "User with same email aleady exists" });
                } else {
                    res.status(403).json({ message: "User with same username aleady exists" });
                }
            }
        } else {
            res.status(400).json({ message: error.message })

        }
    });
});

// login user
router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: "Wrong username or password" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong username or password" });
        }

        const payload = {
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthYear: user.birthYear,
            isAdmin: user.isAdmin,
            gender: user.gender
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({ token, user: payload });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete user by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(deleted);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Edit user info
router.put('/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true });
        res.send(updated)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

export default router;