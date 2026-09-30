import { useState, type ReactElement } from "react"

type ToggleProps = {
  renderClosed: (toggle: () => void) => ReactElement
  renderOpen: (toggle: () => void) => ReactElement
}

export const Togglable = ({renderClosed, renderOpen}: ToggleProps) => {
    const [isVisible, setVisibile] = useState(true)
    const updateVisiblity = () => setVisibile(!isVisible);

    return (
        <>
        {isVisible ? renderOpen(updateVisiblity) : renderClosed(updateVisiblity)}
        </>
    )
}
