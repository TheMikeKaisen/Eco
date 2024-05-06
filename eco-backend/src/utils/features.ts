
import { myCache } from "../app.js";
import { Product } from "../models/Product.Model.js";
import { InvalidateCacheProps } from "../types/types.js"
import { OrderItemType } from "../types/types.js";


export const invalidateCache = async({ product, order, admin}: InvalidateCacheProps)=>{
    if(product){
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "adminProducts"
        ];

        const products = await Product.find({}).select("_id")

        products.forEach(i => {
            productKeys.push(`product-${i._id}`)
        })


        myCache.del(productKeys)
    }
    if(order){

    }
    if(admin){

    }
}

export const reduceStock = async(orderItems: OrderItemType[]) => {
    for(let i = 0; i< orderItems.length; i++){
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product) {
            throw new Error("Product Not Found")
        }
        product.stock -= order.quantity;
        await product.save();
    }
}