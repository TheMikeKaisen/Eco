import express from "express";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrder,
  newOrder,
  processOrder,
} from "../controllers/Order.controller.js";
import { adminOnly } from "../middlewares/auth.js";

const OrderRoute = express.Router();

//get
OrderRoute.get("/my", myOrder);

// post routes
OrderRoute.post("/new", newOrder);

OrderRoute.get("/all", adminOnly, allOrders);

OrderRoute.route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default OrderRoute;
