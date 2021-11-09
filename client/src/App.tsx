import React from "react";
import "./App.css";
import CurrencyPicklist from "./CurrencyPicklist";
import ProductTable from "./ProductTable";
import { CurrencyProvider } from "./contexts/currency";

function App() {
  return (
    <CurrencyProvider>
      <div className="App">
        <CurrencyPicklist currencies={["USD", "CAD", "EUR", "GBP"]} />
        <ProductTable />
        <div id="modal-root" />
      </div>
    </CurrencyProvider>
  );
}

export default App;
