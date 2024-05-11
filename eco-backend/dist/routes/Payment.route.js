import express from 'express';
import { allCoupon, applyDiscount, createPaymentIntent, deleteCoupon, newCoupon } from '../controllers/Payment.controller.js';
import { adminOnly } from '../middlewares/auth.js';
const paymentRoute = express.Router();
paymentRoute.post("/discount", applyDiscount);
paymentRoute.post("/create", createPaymentIntent);
//protected routes
paymentRoute.post("/coupon/new", adminOnly, newCoupon); // create new coupon
paymentRoute.post("/coupon/all", adminOnly, allCoupon); // view all available coupon
paymentRoute.delete("/coupon/:id", adminOnly, deleteCoupon); // delete coupon
export default paymentRoute;
