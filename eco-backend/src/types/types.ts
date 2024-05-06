import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody
    {
        name: string;
        email: string;
        photo: string;
        gender: string;
        role: string;
        _id: string;
        dob: Date;

    }

export interface NewProductRequestBody
    {
        name: string;
        category: string;
        price: number;
        stock: number;

    }


export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>


export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export interface BaseQuery {
    name?: {
        $regex: string,  // search for the keyword pattern in all elements
        $options: string,   // makes the search "case insensitive"
    }
    price?: {
        $lte: number, //returns all the products whose price is Lesser That Equal to the provided price
    }
    category?: string
}

export type InvalidateCacheProps = {
    product?: boolean;
    order?:boolean;
    admin?:boolean;
}


export type OrderItemType = {
    name: string, 
    photo: string, 
    price: number, 
    quantity: number, 
    productId: string
}

export type shippingInfoType = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
}
export type NewOrderRequestBody = {
    shippingInfo: {}
    user: String, 
    subtotal: String, 
    tax: Number, 
    shippingCharges: Number, 
    discount: Number, 
    total: Number, 
    orderItems: OrderItemType[], 
}