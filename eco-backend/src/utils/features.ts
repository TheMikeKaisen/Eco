import { myCache } from "../app.js";
import { Order } from "../models/Order.Model.js";
import { Product } from "../models/Product.Model.js";
import { InvalidateCacheProps } from "../types/types.js";
import { OrderItemType } from "../types/types.js";

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "adminProducts",
      
    ];

    if(typeof productId === "string") productKeys.push(`product-${productId}`)
    if(typeof productId === "object"){
        productId.forEach(i => productKeys.push(`product-${i}`))  
    }
        

    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) {
      throw new Error("Product Not Found");
    }
    product.stock -= order.quantity;
    await product.save();
  }
};
