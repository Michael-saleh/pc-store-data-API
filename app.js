const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;

// Import routes
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("hello DATA!!");
});

// Use routes
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
    mongoose.connect(process.env.mongoDB)
        .then()
    console.log("connected to pc-store");
    console.log(`server online on port ${port}\nhttp://localhost:${port}`);
});