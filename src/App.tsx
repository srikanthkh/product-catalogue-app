import React from 'react';
import './App.css';
import CurrencyPicklist from './CurrencyPicklist'
import ProductTable from './ProductTable'
import {CurrencyProvider} from './contexts/currency'

function App() {
  const products = [{id: 1, name: "Mangoes", price: 32.43}, { id: 2, name: "Apple", price: 43.2}, { id: 3, name: "Banana", price: 13.2}]
  return (
    <CurrencyProvider>
    <div className="App">
        <CurrencyPicklist currencies={["USD", "CAD", "GBP"]} />
        <ProductTable products={products} />
        <div id='modal-root' />
    </div>
    </CurrencyProvider>
  );
}

export default App;
