import type { ExistingProduct } from "../types"
import { useState } from "react"
interface AddProductForm {
    addAction: (newProduct: ExistingProduct) => any
    cancelAction: () => any
}

export const AddProductForm = ({addAction, cancelAction}: AddProductForm) => {

    const [formData, setFormData] = useState({"_id": '', title: '', price: 0, quantity: 0})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (event.target.id === "product-name") {
            setFormData({...formData, title: value});
        } else if (event.target.id === "product-price") {
            setFormData({...formData, price: Number(value)});
        } else if (event.target.id === "product-quantity") {
            setFormData({...formData, quantity: Number(value)})
        }
        
    }

    const handleSubmit = (event:React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        addAction(formData);
        console.log("Product added");
        cancelAction();
        setTimeout(() => document.getElementsByClassName('add-form')[0]
        ?.scrollIntoView({"behavior": "smooth",  "block": "end"}), 100)
    }

    return (
        <div className="add-form">
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="product-name">
                    Product Name:</label>
                <input type="text" id="product-name" name="product-name"
                required onChange={handleChange}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-price">
                    Price:</label>
                <input type="number" id="product-price" name="product-price"
                min="0" step="0.01" required onChange={handleChange}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-quantity">
                    Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity"
                min="0" required onChange={handleChange}></input>
            </div>
            <div className="actions form-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={cancelAction}>Cancel</button>

            </div>
        </form>
        </div>
    )
}
