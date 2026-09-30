export * from './cart';
export * from './products';

export type AddToCartHandler = (event: React.MouseEvent<HTMLButtonElement>) => any
export type Methods = ("GET" | "POST" | "PUT" | "DELETE")
export type UpdateProductList = (action: Methods, {item, itemId }: {item?: ProductField, itemId: string}) => any
export type ProductField = {
  _id: string,
  title: string,
  quantity: number,
  price: number
}
