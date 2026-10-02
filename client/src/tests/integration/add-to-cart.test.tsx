import {vi, describe, expect, it, beforeAll, beforeEach} from "vitest"
import {render, screen} from "@testing-library/react"
import UserEvent, { userEvent } from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest";
import App from "../../App";
import { getCart, getProducts, postCart, postCheckout } from "../../services/fetch-products";
import {mockProducts} from "../../mockData/data.js"
//User clicks add to cart
//Item appears on "Your Cart"/Cart

vi.mock("../../services/fetch-products")
const mockedPostCart = vi.mocked(postCart, true);
const mockedPostCheckout = vi.mocked(postCheckout, true);
const mockedGetCart = vi.mocked(getCart, true);
const mockedGetProducts = vi.mocked(getProducts, true);

describe("Add To Cart", () => {
    beforeEach(async () => {
    })

    mockedGetCart.mockResolvedValue([])
    mockedGetProducts.mockResolvedValue(mockProducts)
    "Amazon Kindle E-reader"

    it("Clicks add to cart and sees cart update with new item", async () => {
        //Render app
        //
        render( <App/>)
        const user = userEvent.setup();

        //Add to cart
        const [addToCartButton] = await screen.findAllByRole("button", {
            "name": "Add to Cart"
        });

        await user.click(addToCartButton);

        //Expect cart to have an item in it

        const cart = await screen.findAllByText("Amazon Kindle E-reader");

        //2 items means name appears in Products section and "Your Cart"
        expect(cart).toHaveLength(2)

    })

})
