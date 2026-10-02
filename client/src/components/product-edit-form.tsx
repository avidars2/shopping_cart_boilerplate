import type { ExistingProduct } from "../types"
import { useEffect, useState } from "react"
interface EditProductForm {
    liKey: string,
    product: ExistingProduct,
    editAction: (newProduct: ExistingProduct) => any
    cancelAction: () => any
}

//Quantity gets updated at top
//If current quantity > top level quantity, update it

export const EditProductForm = ({editAction, cancelAction, product, liKey}: EditProductForm) => {
    const [formData, setFormData] = useState({"_id": '', title: product.title, price: product.price, quantity: product.quantity})

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

    useEffect(() => {
        setFormData(prev => {
            return prev.quantity > product.quantity ?
            {...prev, quantity: product.quantity} :
            prev
        })
    }, [product.quantity])

    return (
        <div className="edit-form">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="product-name">
                    Product Name:</label>
                <input type="text" id="product-name" name="product-name"
                aria-label="Product Name" onChange={handleChange} value={formData.title}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-price">
                    Price:</label>
                <input type="number" id="product-price" name="product-price"
                min="0" step="0.01" aria-label="Product Price" onChange={handleChange} value={formData.price}></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-quantity">
                    Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity"
                min="0" aria-label="Product Quantity" onChange={handleChange} 
                value={formData.quantity}></input>
            </div>
            <div className="actions form-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={cancelAction}>Cancel</button>

            </div>
        </form>
        </div>
    )
}
