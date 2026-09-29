interface AddProductForm {
    cancelAction: () => any
}

export const AddProductForm = ({cancelAction}: AddProductForm) => {
    return (
        <div className="add-form">
        <form>
            <div className="input-group">
                <label htmlFor="product-name">
                    Product Name:</label>
                <input type="text" id="product-name" name="product-name"
                required></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-price">
                    Price:</label>
                <input type="number" id="product-price" name="product-price"
                min="0" step="0.01" required></input>
            </div>
            <div className="input-group">
                <label htmlFor="product-quantity">
                    Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity"
                min="0" required></input>
            </div>
            <div className="actions form-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={cancelAction}>Cancel</button>

            </div>
        </form>
        </div>
    )
}
