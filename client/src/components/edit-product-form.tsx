export const EditProductForm = () => {
    return (
        <div className="edit-form">
        <form>
            <div className="input-group">
                <label htmlFor="product-name">
                    Product Name:</label>
                <input type="text" id="product-name" name="product-name"
                aria-label="Product Name"></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-price">
                    Price:</label>
                <input type="number" id="product-price" name="product-price"
                min="0" step="0.01" aria-label="Product Price"></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-quantity">
                    Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity"
                min="0" aria-label="Product Quantity"></input>
            </div>
            <div className="actions form-actions">
                <button type="submit">Add</button>
                <button type="button">Cancel</button>

            </div>
        </form>
        </div>
    )
}
