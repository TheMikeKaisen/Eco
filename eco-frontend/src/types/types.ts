export type User = {
    name: string, 
    email: string, 
    photo: string, 
    gender: string, 
    role: string, 
    dob: string, 
    _id: string
}

export type Product = {
    name: string, 
    price: number,  
    stock: number,  
    category: string,  
    photo: string,  
    _id: string
}

export type ShippingInfo = {
    address: string, 
    city: string,  
    state: string,  
    country: string, 
    pinCode: string, 
}

export type CartItem = {
    productId: string, 
    photo: string,  
    name: string,  
    price: number, 
    quantity: number, 
    stock: number
}

export type OrderItem = Omit<CartItem, "stock"> & {_id:string}

export type Order = {
    orderItems: OrderItem[],
    shippingInfo: ShippingInfo, 
    subtotal :number,
    tax:number,
    shippingCharges:number,
    discount:number,
    status:string,
    total:number,
    user: {
        name: string;
        _id: string
    }
    _id:string
}

type CountAndChange = {
    revenue: number;
    products: number;
    users: number;
    orders: number;
}

type LatestTransaction = {
    _id: string,
    discount: number,
    amount: number,
    quantity: number,
    status: string
}

export type stats = {
    categoryCount: Record<string, number>[]; // an array of key-pair values where key is a string and value is a number (Record is a utility class.)
    changePercent: CountAndChange, 
    count: CountAndChange;
    chart: {
        order: number[];
        revenue: number[];
    },
    userRatio:{
        male: number;
        female: number;
    };
    latestTransaction: LatestTransaction[]

}

export type Pie = {
    orderFulfillment:{
        processing: number;
        shipped: number;
        delivered: number;
    },
    productCategories:Record<string, number>[],
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    },
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    },
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    },
    adminCustomer: {
        admin: number;
        customer: number;
    }
}

export type Bar = {
    users: number[];
    products: number[]
    orders: number[]
}
export type Line = {
    users: number[];
    products: number[]
    discount: number[]
    revenue: number[]
}