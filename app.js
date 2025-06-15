import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;


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