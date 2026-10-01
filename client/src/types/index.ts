export * from './cart';
export * from './products';

export type AddToCartHandler = (id: string) => any
export type Methods = ("GET" | "POST" | "PUT" | "DELETE")
export type UpdateProductList = (action: Methods, {item, itemId }: {item?: ProductField, itemId: string}) => any
export type ProductField = {
  _id: string,
  title: string,
  productId: string,
  quantity: number,
  price: number
}
