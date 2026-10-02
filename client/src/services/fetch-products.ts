import { z } from "zod"
import type { ExistingProduct, BaseProduct } from "../types";
import axios from "axios";


const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

const cartItemSchema = z.object({
  _id: z.string(),
  productId: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

const getProductsResponseSchema = z.array(productSchema);
const getCartItemsResponseSchema = z.array(cartItemSchema);
const updateProductResponseSchema = productSchema;
const addProductResponseSchema = productSchema;
const addToCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});
const HOST = "http://localhost:5001"

export const updateProduct = async (
    updatedProduct: ExistingProduct,
    productId: string
) => {
    const { data } = await axios.put(HOST + `/api/products/${productId}`, {
        ...updatedProduct
    })
    return updateProductResponseSchema.parse(data);
}

export const postProduct = async (
  addedProduct: BaseProduct,
) => {
  const { data } = await axios.post(HOST + `/api/products`, {
    title: addedProduct.title,
    price: addedProduct.price,
    quantity: addedProduct.quantity
  })

  return addProductResponseSchema.parse(data);
}

export const getProducts = async () => {
    const { data } = await axios.get(HOST + "/api/products");
    return getProductsResponseSchema.parse(data);
}

export const getCart = async () => {
    const { data } = await axios.get(HOST + "/api/cart");
    return getCartItemsResponseSchema.parse(data);
}

export const postCart = async (
  productId: string
) => {
  const {data} = await axios.post(HOST + "/api/add-to-cart", {productId})
  return addToCartResponseSchema.parse(data)
}

export const postCheckout = async () => {
  await axios.post(HOST + "/api/checkout")
  return null
}
