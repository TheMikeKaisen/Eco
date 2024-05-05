import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name not defined"]
    },
    photo: {
        type: String,
        required: [true, "photo url not defined"]
    },
    price: {
        type: Number,
        required: [true, "Price not defined"]
    },
    stock: {
        type: Number,
        required: [true, "Stock not defined"]
    },
    category: {
        type: String,
        required: [true, "category not defined"],
        trim: true
    },
}, {
    timestamps: true
});
export const Product = mongoose.model("Product", ProductSchema);
