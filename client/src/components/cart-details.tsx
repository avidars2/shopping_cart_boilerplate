import type { Cart, Item }  from "../types"

export const CartDetails = ({itemsArr}: (Cart)) => {
    const noItems = () => itemsArr.length === 0;
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {noItems() ? <EmptyCart></EmptyCart> : <CartWithItems itemsArr={itemsArr}></CartWithItems>}
            <button className="checkout" disabled={noItems()}>Checkout</button>
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

const CartWithItems = ({itemsArr}: Cart) => {
    const totalPrice = (itemsArr: Item[]) =>  {
        itemsArr.reduce((total, item) => {
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
                        <tr>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
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
