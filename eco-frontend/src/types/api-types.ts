import { Product, User } from "./types";


export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    }
}

export type MessageResponse = {
    success: boolean, 
    message: string,
}

export type UserResponse = {
    success: boolean;
    user: User;
}
export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}
export type categoriesResponse = {
    success: boolean;
    categories: string[];
}
export type searchProductsResponse = {
    success: boolean;
    products: Product[];
    totalPage: number;
}
export type SearchProductRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}


export type productResponse = {
    id: string, 
    product:Product,
}

export type newProductRequest = {
    id: string, 
    formData: FormData,
}

export type updateProductRequest = {
    userId: string, 
    productId: string, 
    formData: FormData,
}
export type deleteProductRequest = {
    userId: string, 
    productId: string, 
}