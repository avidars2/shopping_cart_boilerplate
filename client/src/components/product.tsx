import { ActionButton } from "./action-button"
import { useState } from "react"
import { EditProductForm } from "./product-edit-form.js"
import { sFetch } from "../helpers/sFetch"
import type { NewProduct, AddToCartHandler, UpdateProductList, ProductField } from '../types/index.js'

type ProductArgs = {
    product: NewProduct
    updateRenderedProducts: UpdateProductList
    addToCart: AddToCartHandler
}

//Add editable product component

// Instead of invoking refresh below , jsut update the state in memory
// Refresh product list in memory

//Same with updating it in memory
export const Product = ({product, updateRenderedProducts, addToCart}: ProductArgs) => {
    const [showEdit, setShowEdit] = useState(false);
    const toggleForm = () => {setShowEdit(showEdit ? false: true)};

    const noStock = () => product.quantity === 0;
    const editProduct = async (product: NewProduct) => {
        const res = await sFetch(`/api/products/${product["_id"]}`, "PUT", {
            title: product.title,
            price:product.price,
            quantity: product.quantity})

        if (res.ok) updateRenderedProducts("PUT", {item: res.result, itemId: res.result["_id"]});
    }

    const deleteProduct = async () => {
        await sFetch(`/api/products/${product["_id"]}`, "DELETE");
        updateRenderedProducts("DELETE", {itemId: product["_id"]});
    }

    return (
        <li className="product">
            <div className="product-details">
                <h3>{product.title}</h3>
                <p className="price">{`$${product.price}`}</p>
                <p className="quantity">{`${product.quantity} left in stock`}</p>
                <div className="actions product-actions">
                    <button className="add-to-cart" onClick={addToCart} disabled={noStock()}>Add to Cart</button>
                    <ActionButton 
                        className="edit" 
                        text="Edit" 
                        action={() => {setShowEdit(!showEdit)}}
                    />
                </div>
                <button className="delete-button" onClick={deleteProduct}>
                    <span>X</span>
                </button>
            </div>
            {showEdit && <EditProductForm liKey={product["_id"]} editAction={editProduct} cancelAction={toggleForm}/>}


        </li>
    )
}
