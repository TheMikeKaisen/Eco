import { myCache } from "../app.js";
import { Product } from "../models/Product.Model.js";
export const invalidateCache = ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "adminProducts",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object") {
            productId.forEach((i) => productKeys.push(`product-${i}`));
        }
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
        const adminKeys = [
            "admin-stats",
            "admin-pie-charts",
            "admin-bar-charts",
            "admin-line-charts"
        ];
        myCache.del(adminKeys);
    }
};
export const reduceStock = async (orderItems) => {
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
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0)
        return thisMonth * 100; // if last month count was 0 and this month's count is 4, then this month has got 400% increase than last month
    const percent = ((thisMonth) / lastMonth) * 100; // this is absolute change percentage NOT RELATIVE
    // 2 -> 8 : absolute percentage change=> 400%, relative percentage change=>600%
    return percent.toFixed(0);
};
export const getInventories = async ({ categories, productsCount, }) => {
    const categoriesCountPromise = await categories.map(async (element) => Product.countDocuments({ category: element }));
    let categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount = [];
    // calculating the percentage of each category.
    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / productsCount) * 100), // without square brackets, category would be read as a string.
        });
    });
    return categoryCount;
};
export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDiff < length) {
            data[length - monthDiff - 1] += property ? i[property] : 1;
        }
    });
    return data;
};
