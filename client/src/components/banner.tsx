import { CartDetails } from "./cart-details"
import type { Item } from "../types"

type BannerArgs = {
    cartList: Item[],
    onCheckout: () => any
}

export const Banner = ({cartList, onCheckout}: BannerArgs) => {
    return (
        <>
            <h1>The Shop!</h1>
            <CartDetails itemsArr={cartList} onCheckout={onCheckout}></CartDetails>
        </>
    )
}
