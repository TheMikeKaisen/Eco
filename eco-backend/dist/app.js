import express from 'express';
import UserRoute from './routes/User.Route.js';
import { connectDB } from './utils/db.connect.js';
import 'dotenv/config';
import { errorMiddlware } from './middlewares/error.js';
const PORT = 3000;
const app = express();
connectDB();
app.use(express.json());
// Routes
app.use('/api/v1/user', UserRoute);
app.use(errorMiddlware); // always written at the last of all middlewares
app.listen(PORT, () => {
    console.log(`Express is working on port : ${PORT}`);
});
