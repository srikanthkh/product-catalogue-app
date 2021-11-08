import * as React from "react";
import "./styles.css";

export interface InputProps {
    name: string;
    label: string;
    type?: string;
    value?: string | number;
    showLabel?: boolean;
    helperText?: string;
    extraAttrs?: {[key: string]: string};
    children?: React.ReactNode;
    handleChange?: (id: string, value: string | number) => void;
}

const Input = (props: InputProps) => {
    const [val, setVal] = React.useState(props.value || "");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
        if (props.handleChange) {
            props.handleChange(e.target.name, e.target.value)
        }
    }
    return (
        <div className="input-container">
            {props.showLabel && <label htmlFor={props.name}>{props.label}</label>}
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                value={val}
                onChange={handleChange}
                {...props.extraAttrs}>
                {props.children}
            </input>
            {props.helperText && <div className="help-text">{props.helperText}</div>}
        </div>
    );
}

Input.defaultProps = {
    type: "text",
    showLabel: false,
    helperText: false,
};

export default Input;