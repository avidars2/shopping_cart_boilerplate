type ActionBtnArgs = {
    text: string,
    className: string
    action: (arg0: any) => any
}

export const ActionButton = ({text, className, action}: ActionBtnArgs) => {
    return (
        <button className={className} onClick={action}>{text}</button>
    )
    
}
