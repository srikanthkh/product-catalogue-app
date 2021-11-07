import * as React from "react";
import "./styles.css";

export interface TableProps {
    className?: string;
    children?: React.ReactNode;
}

const Table = (props: TableProps) => (
    <table className={`table ${props.className}`}>{props.children}</table>
);

export default Table;