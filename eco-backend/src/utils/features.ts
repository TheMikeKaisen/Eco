import { myCache } from "../app.js";
import { Order, OrderStructure } from "../models/Order.Model.js";
import { Product, ProductStructure } from "../models/Product.Model.js";
import { IUser } from "../models/User.Model.js";
import { InvalidateCacheProps } from "../types/types.js";
import { OrderItemType } from "../types/types.js";

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "adminProducts",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    if (typeof productId === "object") {
      productId.forEach((i) => productKeys.push(`product-${i}`));
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

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) return thisMonth * 100; // if last month count was 0 and this month's count is 4, then this month has got 400% increase than last month

  const percent = ((thisMonth) / lastMonth) * 100; // this is absolute change percentage NOT RELATIVE
  // 2 -> 8 : absolute percentage change=> 400%, relative percentage change=>600%
  return percent.toFixed(0);
};

export const getInventories = async ({
  categories,
  productsCount,
}: {
  categories: string[];
  productsCount: number;
}) => {
  const categoriesCountPromise = await categories.map(async (element) =>
    Product.countDocuments({ category: element })
  );

  let categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];

  // calculating the percentage of each category.
  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[i] / productsCount) * 100), // without square brackets, category would be read as a string.
    });
  });
  return categoryCount
};

interface MyDocument extends Document {
  createdAt: Date;
  discount?: number;
  total?: number;
}
type FuncProps = {
  length: number;
  docArr: ProductStructure[] | OrderStructure[] | IUser[];
  today: Date;
};

export const getChartData = ({
  length,
  docArr,
  today,
}: FuncProps) => {
  const data: number[] = new Array(length).fill(0);

  docArr.forEach((i: any) => {
    const creationDate = i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if(monthDiff < 6){
      data[length - monthDiff - 1] += 1 
    }
  });

  return data;
};