import * as React from "react";
import "./styles.css";

export interface ComponentProps {
    name: string;
    value?: string | number;
    className?: string;
    extraAttrs?: {[key: string]: string};
    children?: React.ReactNode;
    handleChange?: (id: string, value: string | number) => void;
}

const Select = (props: ComponentProps) => {
    const [val, setVal] = React.useState(props.value || "");
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVal(e.target.value);
        if (props.handleChange) {
            props.handleChange(e.target.name, e.target.value)
        }
    }
    return (
        <select
            id={props.name}
            name={props.name}
            value={val}
            onChange={handleChange}
            {...props.extraAttrs}>
            {props.children}
        </select>
    );
}

export default Select;