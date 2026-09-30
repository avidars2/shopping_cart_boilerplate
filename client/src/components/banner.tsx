import { CartDetails } from "./cart-details"
import type { Item } from "../types"

type BannerArgs = {
    cartList: Item[]
}

export const Banner = ({cartList}: BannerArgs) => {
    return (
        <>
            <h1>The Shop!</h1>
            <CartDetails itemsArr={cartList}></CartDetails>
        </>
    )
}
