export class Product {
    product_id: number;
    name: string;
    qty?: number;
    price: number;
    stock: number;
    image: any;
}

export interface ProductResponse {
    result: ProductResult[] | ProductResult;
    message: string;
}

export interface ProductResult {
    name: string;
    stock: number;
    price: number;
    _id: string;
    image: string;
    created: Date;
    product_id: number;
    __v: number;
}
