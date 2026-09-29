import type { ReactElement } from "react"

type ProductBoxArgs = {
    productList: ReactElement[],
}

export const ProductBox = ({productList}: ProductBoxArgs) => {
    return (
        <div className="product-listing">
            <h2>Products</h2>
            <ul className="product-list">
                {productList}
            </ul>
        </div>
    )
}
