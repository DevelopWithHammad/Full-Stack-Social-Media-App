import express from "express";
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const authRoutes = express.Router();


// // Register API
authRoutes.post('/register', async (req, res) => {
    try {
        // generating new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user and respond
        const user = await newUser.save()
        res.status(200).json({
            status: "Success",
            message: "User added successfully!",
            data: user
        })
        console.log(user)

    } catch (error) {
        res.status(500).send(error)
    }

})




// // Login API
authRoutes.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        !user && res.status(400).json("Wrong email!")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(validPassword);
        !validPassword && res.status(400).json("Wrong Password!")
        res.status(200).json(user)
            
    } catch (error) {
        res.status(500).send(error)
    }



})

export default authRoutes