import { ActionButton } from "./action-button"
import { useState } from "react"
import { EditProductForm } from "./edit-product-form"
type ProductArgs = {
    description: string,
    price: number,
    stock: number
    liKey: string
}

//Add editable product component
export const Product = ({description, price, stock, liKey}: ProductArgs) => {
    const [showEdit, setShowEdit] = useState(false)
    const noStock = () => stock === 0

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
            {showEdit && <EditProductForm></EditProductForm>}


        </li>
    )
}
