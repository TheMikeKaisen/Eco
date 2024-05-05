import { myCache } from "../app.js";
import { Product } from "../models/Product.Model.js";
export const invalidateCache = async ({ product, order, admin }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "adminProducts"
        ];
        const products = await Product.find({}).select("_id");
        products.forEach(i => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
