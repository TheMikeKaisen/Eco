import mongoose, { Schema } from "mongoose";
import validator from 'validator'
export interface OrderItem {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: mongoose.Types.ObjectId;
}

export interface OrderStructure extends Document {
    shippingInfo: {
        address: string;
        city: string;
        state: string;
        country: string;
        pinCode: string;
    };
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered";
    orderItems: OrderItem[];
    createdAt: Date;
    [key: string]: any;
}
const OrderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        state: {
            type: String, 
            required: true
        },
        country: {
            type: String, 
            required: true
        },
        pinCode: {
            type: Number, 
            required: true
        }
    },
    user: {
        type: String, 
        ref: "User",
        required: true
    },
    subtotal: {
        type: Number, 
        required: true
    },
    tax: {
        type: Number, 
        required: true
    },
    shippingCharges: {
        type: Number, 
        default: 0,
        required: true
    },
    discount: {
        type: Number, 
        default: 0,
        required: true
    },
    total: {
        type: Number, 
        required: true
    },
    status: {
        type: String, 
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },
    orderItems: [
        {
            name: String, 
            photo: String, 
            price: Number, 
            quantity: Number, 
            productId: {
                type: mongoose.Types.ObjectId, 
                ref: "Product"
            }
        }
    ]

}, {
    timestamps: true
})


export const Order = mongoose.model<OrderStructure>("Order", OrderSchema)
