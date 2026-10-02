import type { ReactElement } from "react"
import { Product } from "./product"
import type { ExistingProduct, AddToCartHandler, Methods, ProductField, UpdateProductList } from '../types/index.js'

type ProductBoxArgs = {
    productList: ProductField[],
    updateRenderedProducts: UpdateProductList, 
    addToCart: AddToCartHandler
}

export const ProductBox = ({productList, updateRenderedProducts, addToCart}: ProductBoxArgs) => {

    const ProductComponents = productList.map((product: ProductField) => {
            return (
                <Product 
                    product={product}
                    key={product["_id"]} 
                    updateRenderedProducts={updateRenderedProducts} 
                    addToCart={addToCart}
                />
            )
        }) 
    return (
        <div className="product-listing">
            <h2>Products</h2>
            <ul className="product-list">
                {ProductComponents}
            </ul>
        </div>
    )
}
