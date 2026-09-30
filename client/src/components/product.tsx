import { ActionButton } from "./action-button"
import { useState } from "react"
import { EditProductForm } from "./product-edit-form.js"
import { sFetch } from "../helpers/sFetch"
import type { NewProduct, AddToCartHandler, UpdateProductList, ProductField } from '../types/index.js'

type ProductArgs = {
    description: string,
    price: number,
    stock: number
    liKey: string,
    updateRenderedProductList: UpdateProductList
    addToCart: AddToCartHandler
}

type refresh = () => any

//Add editable product component

// Instead of invoking refresh below , jsut update the state in memory
// Refresh product list in memory

//Same with updating it in memory
export const Product = ({description, price, stock, liKey, updateRenderedProductList, addToCart}: ProductArgs) => {
    const [showEdit, setShowEdit] = useState(false);
    const toggleForm = () => {setShowEdit(showEdit ? false: true)};

    const noStock = () => stock === 0;
    const editProduct = async ({title, price, quantity}: NewProduct) => {
        const res = await sFetch(`/api/products/${liKey}`, "PUT", {
            title,
            price,
            quantity})

        if (res.ok) updateRenderedProductList("PUT", {item: res.result, itemId: res.result["_id"]});
    }

    const deleteProduct = async () => {
        await sFetch(`/api/products/${liKey}`, "DELETE");
        updateRenderedProductList("DELETE", {itemId: liKey});
    }

    return (
        <li className="product" key={liKey}>
            <div className="product-details">
                <h3>{description}</h3>
                <p className="price">{`$${price}`}</p>
                <p className="quantity">{`${stock} left in stock`}</p>
                <div className="actions product-actions">
                    <button className="add-to-cart" onClick={addToCart} disabled={noStock()}>Add to Cart</button>
                    <ActionButton className="edit" text="Edit" action={() => {setShowEdit(!showEdit)}}></ActionButton>
                </div>
                <button className="delete-button" onClick={deleteProduct}>
                    <span>X</span>
                </button>
            </div>
            {showEdit && <EditProductForm liKey={liKey} editAction={editProduct} cancelAction={toggleForm}></EditProductForm>}


        </li>
    )
}
