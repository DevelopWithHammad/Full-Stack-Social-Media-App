import express from "express";
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.send("Welcome to our site")
})

export default userRoutes