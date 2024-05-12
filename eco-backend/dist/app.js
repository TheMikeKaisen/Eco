import express from 'express';
import { connectDB } from './utils/db.connect.js';
import { config } from 'dotenv';
import { errorMiddlware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
import 'dotenv/config';
import cors from 'cors';
// routes
import UserRoute from './routes/User.Route.js';
import ProductRouter from './routes/Products.Route.js';
import bodyParser from 'body-parser';
import OrderRoute from './routes/Orders.route.js';
import morgan from 'morgan';
import paymentRoute from './routes/Payment.route.js';
import statsRoute from './routes/Stats.route.js';
config({
    path: "../.env"
});
const mongo_uri = process.env.MONGO_LOCAL_URI || " ";
const PORT = process.env.PORT || 3000;
const app = express();
const stripeKey = process.env.STRIPE_KEY || " ";
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
connectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// to work with form-value encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/order', OrderRoute);
app.use('/api/v1/payments', paymentRoute);
app.use('/api/v1/dashboard', statsRoute);
app.use('/uploads', express.static("uploads")); // whoever hit the end point '/uploads' can access the uploads folder as static file.
app.use(errorMiddlware); // always written at the last of all middlewares
app.listen(PORT, () => {
    console.log(`Express is working on port : ${PORT}`);
});
