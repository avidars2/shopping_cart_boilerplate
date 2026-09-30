import { useState, type ReactElement } from "react"
export const Togglable = ({component, visible}: {component: ReactElement, visible: boolean}) => {
    const [isVisible, setVisibile] = useState(true)
    const updateVisiblity = () => setVisibile(!isVisible);

    return (
        <span hidden={isVisible}>
            {component}
        </span>
    )
}
