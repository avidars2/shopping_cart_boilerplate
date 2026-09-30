import { useState, type ReactElement } from "react"
const Togglable = ({component}: {component: ReactElement}) => {
    const [isVisible, setVisibile] = useState(true)
    return (
        <span hidden={isVisible}>
            {component}
        </span>
    )
}
