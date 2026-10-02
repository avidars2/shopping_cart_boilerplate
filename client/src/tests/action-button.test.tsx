import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest";
import {describe, it, vi, expect} from "vitest"
import { ActionButton } from "../components/action-button"


describe("ActionButton", () => {
    it("renders text passed to it", () => {
        render(
            <ActionButton
                text="test"
                className="test"
                action={() => {}}             
            />
        )

        const button = screen.getByRole("button", {
            name: "test"
        })

        expect(button).toHaveClass("test")
    })

})
