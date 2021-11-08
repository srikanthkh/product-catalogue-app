import * as React from "react";
import "./styles.css";

export interface ComponentProps {
    className?: string;
    children?: React.ReactNode;
}

const Table = (props: ComponentProps) => (
    <table className={`table ${props.className}`}>{props.children}</table>
);

export default Table;