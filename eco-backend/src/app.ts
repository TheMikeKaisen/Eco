

import express from 'express'
import UserRoute from './routes/User.Route.js';
import { connectDB } from './utils/db.connect.js';
import 'dotenv/config'

const PORT = 3000;

const app = express()

connectDB();


// Routes
app.use('/api/v1/user', UserRoute)


app.listen(PORT, ()=> {
    console.log(`Express is working on port : ${PORT}`);
    
})