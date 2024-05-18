import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { IdRequestBody, NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/Order.Model.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
      return next(new ErrorHandler("all fields are required", 400));
    }

    const newOrder = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: newOrder.orderItems.map(i=> String(i.productId)),
    });

    return res.status(201).json({
      success: true,
      message: "order placed successfully",
      newOrder,
    });
  }
);

export const myOrder = TryCatch(async (req, res, next) => {
  const { id } = req.query; // user id
  let orders = [];

  const key = `my-orders-${id}`;
  const cachedOrders = myCache.get(key);
  if (cachedOrders) {
    orders = JSON.parse(cachedOrders as string);
  } else {
    orders = await Order.find({ user: id });

    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  let orders = [];

  const key = `all-orders`;
  const cachedOrders = myCache.get(key);
  if (cachedOrders) {
    orders = JSON.parse(cachedOrders as string);
  } else {
    orders = await Order.find().populate("user", "name");

    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params; // order id
  let order;
  const key = `order-${id}`;
  const cachedOrder = myCache.get(key);
  if (cachedOrder) {
    order = JSON.parse(cachedOrder as string);
  } else {
    order = await Order.findOne({ _id: id });
    if (!order) {
      return next(new ErrorHandler("order not found", 404));
    }
    myCache.set(key, JSON.stringify(order));
  }
  return res.status(200).json({
    success: true,
    order,
  });
});

export const processOrder = TryCatch(
  async (req: Request<IdRequestBody, {}, {}>, res, next) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;

      default:
        order.status = "Delivered";
        break;
    }

    await order.save();

    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user,
      orderId: String(order._id),
    });

    return res.status(201).json({
      success: true,
      message: "order processed successfully",
      order
    });
  }
);

export const deleteOrder = TryCatch(
  async (req: Request<IdRequestBody, {}, {}>, res, next) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    const order_Id = order._id;
    const user_Id = order.user;

    await order.deleteOne();

    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: user_Id,
      orderId: String(order_Id)
    });

    return res.status(201).json({
      success: true,
      message: "order deleted successfully",
    });
  }
);
