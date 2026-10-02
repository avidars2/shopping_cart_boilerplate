import {vi, describe, expect, it, beforeAll, beforeEach, afterEach} from "vitest"
import {cleanup, render, screen} from "@testing-library/react"
import UserEvent, { userEvent } from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest";
import App from "../../App.js";
import { getCart, getProducts, postCart, postCheckout } from "../../services/fetch-products.js";
import {mockProducts} from "../../mockData/data.js"
//User clicks add to cart
//Item appears on "Your Cart"/Cart

vi.mock("../../services/fetch-products")
const mockedPostCart = vi.mocked(postCart, true);
const mockedPostCheckout = vi.mocked(postCheckout, true);
const mockedGetCart = vi.mocked(getCart, true);
const mockedGetProducts = vi.mocked(getProducts, true);

describe("Add To Cart and Checkout", () => {
    beforeEach(async () => {
        vi.clearAllMocks()
        mockedGetCart.mockResolvedValue([])
        mockedGetProducts.mockResolvedValue(structuredClone(mockProducts))
        render( <App/>)

    })
    afterEach(cleanup)



    it("Clicks add to cart and sees cart update with new item", async () => {
        //Render app
        //
        const user = userEvent.setup();

        //Add to cart
        const [addToCartButton] = await screen.findAllByRole("button", {
            "name": "Add to Cart"
        });

        await user.click(addToCartButton);

        //Expect cart to have an item in it

        const itemInProductsAndCart = await screen.findAllByText("Amazon Kindle E-reader");

        //2 items means name appears in Products section and "Your Cart"
        expect(itemInProductsAndCart).toHaveLength(2)

    })


    it("Clicking Checkout clears all items", async () => {
        //Render app
        //
        const user = userEvent.setup();

        //Add to cart
        const [addToCartButton] = await screen.findAllByRole("button", {
            "name": "Add to Cart"
        });

        await user.click(addToCartButton);        

        //Checkout
        const checkoutButton = await screen.findByRole("button", {
            "name": "Checkout"
        });

        await user.click(checkoutButton);

        //Expect cart to have an item in it

        const itemJustInProducts = await screen.findAllByText("Amazon Kindle E-reader");

        //1 items means name appears only in Products section
        expect(itemJustInProducts).toHaveLength(1)

    })

})
