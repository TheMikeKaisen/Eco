import express from 'express';
import { connectDB } from './utils/db.connect.js';
import 'dotenv/config';
import { errorMiddlware } from './middlewares/error.js';
import NodeCache from 'node-cache';
// routes
import UserRoute from './routes/User.Route.js';
import ProductRouter from './routes/Products.Route.js';
import bodyParser from 'body-parser';
const PORT = 3000;
const app = express();
export const myCache = new NodeCache();
connectDB();
app.use(express.json());
// to work with form-value encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/product', ProductRouter);
app.use('/uploads', express.static("uploads")); // whoever hit the end point '/uploads' can access the uploads folder as static file.
app.use(errorMiddlware); // always written at the last of all middlewares
app.listen(PORT, () => {
    console.log(`Express is working on port : ${PORT}`);
});
