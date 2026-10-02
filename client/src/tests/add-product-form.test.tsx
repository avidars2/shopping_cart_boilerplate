import {vi, describe, it, expect} from "vitest"
import { getByRole, render, screen} from "@testing-library/react"
import { AddProductForm } from "../components/add-product-form"
import { Togglable } from "../components/togglable"
import { ActionButton } from "../components/action-button"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/vitest'


describe("AddProductForm", () => {
    it("Displays the add form when 'Add' Button is clicked", async () => {
        const addProduct = () => {}

        const BUTTON_NAME = "Add A Product";
        const user = userEvent.setup();

        render(       
            <Togglable 
                  renderOpen={toggle => 
                  <p>
                    <ActionButton 
                    text={BUTTON_NAME} 
                    className='add-product-button' 
                    action={toggle}
                    />
                  </p>
                  }
                  renderClosed={toggle => 
                    <AddProductForm 
                      addAction={addProduct} 
                      cancelAction={toggle}
                  />}
                />
            )
        
        const button = screen.getByRole("button", {
            "name": BUTTON_NAME
        })

        await user.click(button);

        const formLabel = await screen.findByLabelText("Product Name:")
        

        expect(formLabel).toBeVisible()

    })

    it("Renders 'Add' and 'Cancel' buttons", async () => {
        const CancelButton = await screen.findByRole("button", {
            "name": "Cancel"
        })

        const AddButton = await screen.findByRole("button", {
            "name": "Add"
        })

        expect(CancelButton).toBeVisible();
        expect(AddButton).toBeVisible();

    })

    it("Hides the add form when 'Cancel' Button is clicked", async () => {
        const user = userEvent.setup();
        const CancelButton = await screen.findByRole("button", {
            "name": "Cancel"
        })

        const formLabel = await screen.findByLabelText("Product Name:")


        await user.click(CancelButton);

        expect(formLabel).not.toBeVisible()
        
    })
})


// describe("ActionButton", () => {
//     it("renders text passed to it", () => {
//         render(
//             <ActionButton
//                 text="test"
//                 className="test"
//                 action={() => {}}             
//             />
//         )

//         const button = screen.getByRole("button", {
//             name: "test"
//         })

//         const form = screen.findByRole("")

//         expect(button).toHaveClass("test")
//     })

// })
