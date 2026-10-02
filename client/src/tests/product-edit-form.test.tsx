import { vi, describe, expect, it } from "vitest"
import { getByRole, render, screen} from "@testing-library/react"
import { EditProductForm } from "../components/product-edit-form"
import { Togglable } from "../components/togglable"
import { ActionButton } from "../components/action-button"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/vitest'
import { useState } from "react"


describe("Product-edit-form", () => {
    const MockProduct = {
        "_id": "test",
        "title": "hi",
        "price": 10,
        "quantity": 100
    }
    const ProductEditTestWrapper = () => {
        const [showEdit, setShowEdit] = useState(false);
        const toggleForm = () => {setShowEdit(showEdit ? false: true)};

        return (<>
        <ActionButton 
            className="edit" 
            text="Edit" 
            action={() => {setShowEdit(!showEdit)}}
            />
            {showEdit && <EditProductForm 
                liKey={MockProduct._id} 
                product={MockProduct} 
                editAction={() => {}} 
                cancelAction={toggleForm}
            />}
        </>)
    }

    it("Is displayed when 'Edit' button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <ProductEditTestWrapper/>
        )

        const editButton = await screen.findByRole("button", {
            "name": "Edit"
        });

        await user.click(editButton);

        const formLabel = await screen.findByLabelText("Product Name:");

        expect(formLabel).toBeVisible()

    })

    it("Shows 'Edit Product' heading", async () => {

        const heading = await screen.findByRole("heading", {
            "name": "Edit Product"
        });

        expect(heading).toBeVisible();

    })

    it("Shows 'Update' button", async () => {

        const button = await screen.findByRole("button", {
            "name": "Update"
        });

        expect(button).toBeVisible();

    })

    it("Shows 'Cancel' button", async () => {

        const button = await screen.findByRole("button", {
            "name": "Cancel"
        });

        expect(button).toBeVisible();

    })

    it("Is not displayed when 'Cancel' button is clicked", async () => {
        const user = userEvent.setup();

        const cancelButton = await screen.findByRole("button", {
            "name": "Cancel"
        })
        const formLabel = await screen.findByLabelText("Product Name:");

        await user.click(cancelButton);



        expect(formLabel).not.toBeVisible();

    })

})
