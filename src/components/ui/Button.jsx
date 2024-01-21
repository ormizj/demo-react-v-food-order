const Button = ({ children, textOnly, className, ...props }) => { // "...props", store all the undeclared parameters in an obj
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ` ${className}`;

    return (
        <button
            className={cssClasses}
            {...props} // deconstruct the obj
        >
            {children}
        </button>
    );
}

export default Button;