import express from 'express';
import { newOrder } from '../controllers/Order.controller.js';
const OrderRoute = express.Router();
// post routes
OrderRoute.post('/new', newOrder);
export default OrderRoute;
