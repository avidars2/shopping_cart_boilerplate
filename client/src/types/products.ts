export interface Product {
    description: string,
    price: number,
    stock: number
    liKey: string
}

export interface NewProduct {
    "_id": string, title: string, price: number, quantity: number
}
