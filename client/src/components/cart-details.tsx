import type { Cart, ProductField }  from "../types"

export const CartDetails = ({itemsArr, onCheckout}: (Cart)) => {
    const noItems = () => itemsArr.length === 0;
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {noItems() ? <EmptyCart/> : <CartWithItems itemsArr={itemsArr}/>}
            <button className="checkout" onClick={onCheckout} disabled={noItems()}>Checkout</button>
        </div>
    )
}


const EmptyCart = () => {
    return (
        <>
            <p>Your cart is empty</p>
            <p>Total: $0</p>        
        </>
    )
}

const CartWithItems = ({itemsArr}: Omit<Cart, "onCheckout">) => {
    const totalPrice = (itemsArr: ProductField[]) =>  {
        return itemsArr.reduce((total, item) => {
            console.log(total, item)
            return total + (item.price * item.quantity);
        }, 0)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {itemsArr.map(item => {
                    return (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="total"
                    >{`Total: $${totalPrice(itemsArr)}`}</td>
                </tr>

            </tfoot>
        </table>
    )
}
