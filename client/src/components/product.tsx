import { ActionButton } from "./action-button"
import { useState } from "react"
import { EditProductForm } from "./edit-product-form"
import { sFetch } from "../helpers/sFetch"
import type { NewProduct } from '../types/index.js'

type ProductArgs = {
    description: string,
    price: number,
    stock: number
    liKey: string,
    refresh: refresh
}

type refresh = () => any

//Add editable product component
export const Product = ({description, price, stock, liKey, refresh}: ProductArgs) => {
    const [showEdit, setShowEdit] = useState(false);
    const toggleForm = () => {setShowEdit(showEdit ? false: true)};

    const noStock = () => stock === 0;
    const addProduct = async ({title, price, quantity}: NewProduct) => {
        await sFetch(`/api/products/${liKey}`, "PUT", {
            title,
            price,
            quantity})

        await refresh();
    }

    return (
        <li className="product" key={liKey}>
            <div className="product-details">
                <h3>{description}</h3>
                <p className="price">{`$${price}`}</p>
                <p className="quantity">{`${stock} left in stock`}</p>
                <div className="actions product-actions">
                    <button className="add-to-cart" disabled={noStock()}>Add to Cart</button>
                    <ActionButton className="edit" text="Edit" action={() => {setShowEdit(!showEdit)}}></ActionButton>
                </div>
                <button className="delete-button">
                    <span>X</span>
                </button>
            </div>
            {showEdit && <EditProductForm liKey={liKey} addAction={addProduct} cancelAction={toggleForm}></EditProductForm>}


        </li>
    )
}
