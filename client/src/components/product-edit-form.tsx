import type { NewProduct } from "../types"
import { useState } from "react"
interface EditProductForm {
    liKey: string,
    editAction: (newProduct: NewProduct) => any
    cancelAction: () => any
}
export const EditProductForm = ({editAction, cancelAction, liKey}: EditProductForm) => {
    const [formData, setFormData] = useState({title: '', price: 0, quantity: 0})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (event.target.id === "product-name") {
            setFormData({...formData, title: value});
        } else if (event.target.id === "product-price") {
            setFormData({...formData, price: Number(value)});
        } else if (event.target.id === "product-quantity") {
            setFormData({...formData, quantity: Number(value)})
        }

        console.log(value)
        
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        editAction(formData);
        console.log(`Product ${liKey} edited`);
        cancelAction();
    }

    return (
        <div className="edit-form">
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="product-name">
                    Product Name:</label>
                <input type="text" id="product-name" name="product-name"
                aria-label="Product Name" onChange={handleChange}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-price">
                    Price:</label>
                <input type="number" id="product-price" name="product-price"
                min="0" step="0.01" aria-label="Product Price" onChange={handleChange}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-quantity">
                    Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity"
                min="0" aria-label="Product Quantity" onChange={handleChange}></input>
            </div>
            <div className="actions form-actions">
                <button type="submit">Edit</button>
                <button type="button" onClick={cancelAction}>Cancel</button>

            </div>
        </form>
        </div>
    )
}
