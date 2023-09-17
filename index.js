import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from "./db/connect.js";
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

const app = express();
const PORT = 8000
dotenv.config()


// // middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)



const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running ${PORT}`);
        })
        await connectDB(process.env.MONGO_URL)
    } catch (error) {
        console.log(error);
    }
}

start()

