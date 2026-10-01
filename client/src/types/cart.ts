export interface Cart  {
    onCheckout: () => any,
    itemsArr: Item[],
}

export interface Item  {
    _id: string,
    productId: string,
    title: string;
    quantity: number;
    price: number;
}
