import * as React from "react";
import "./styles.css";

/* Can add more props to button like appearance(primary/secondary/transparent etc), button size (small/regular), 
shouldFitContainer that can add a class that sets width and height to 100%.*/

export declare type ButtonType = "button" | "submit";

export interface ComponentProps {
    extraAttrs?: {[key: string]: string};
    className?: string;
    children?: React.ReactNode;
}

export interface PropsWithDefault {
    type: ButtonType;
    isDisabled?: boolean;
    onClick?(e: React.MouseEvent<HTMLElement>): void;
}


const generateClassNameList = (className: string|undefined, isDisabled: boolean|undefined) :string => {
    const classList = [
        "button",
        className,
        isDisabled ? "disabled" : undefined,
    ];

    return classList.filter((className) => className).join(" ");
}

const Button = (props: ComponentProps & PropsWithDefault) => (
    <button
        disabled={props.isDisabled}
        className={generateClassNameList(props.className, props.isDisabled)}
        onClick={props.onClick}
        type={props.type}
        {...props.extraAttrs}>
        <span>
            {props.children}
        </span>
    </button>
);

Button.defaultProps = {
    isDisabled: false,
    type: "button",
};

export default Button;