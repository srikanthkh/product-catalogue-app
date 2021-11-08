import React from 'react';
import './App.css';
import CurrencyPicklist from './CurrencyPicklist'
import ProductTable from './ProductTable'
import {CurrencyProvider} from './contexts/currency'

function App() {
  const products = [{id: 1, name: "Banana", price: 42.01}, { id: 2, name: "Apple", price: 53.99}]
  return (
    <CurrencyProvider>
    <div className="App">
        <CurrencyPicklist currencies={["USD", "CAD", "EUR", "GBP"]} />
        <ProductTable products={products} />
        <div id='modal-root' />
    </div>
    </CurrencyProvider>
  );
}

export default App;
