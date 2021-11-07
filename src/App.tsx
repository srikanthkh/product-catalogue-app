import React from 'react';
import './App.css';
import Button from './components/button'
import Table from './components/table'
import CurrencyPicklist from './CurrencyPicklist'
import Input from './components/input'
import useModal from './components/modal'
import {CurrencyProvider} from './contexts/currency'

function App() {
  const { show, RenderModal } = useModal()
  return (
    <CurrencyProvider>
    <div className="App">
        <CurrencyPicklist currencies={["USD", "CAD", "GBP"]} />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Banana</td>
              <td>$10.30</td>
              <td><Button onClick={show}>Edit</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Apple</td>
              <td>$8.00</td>
              <td><Button onClick={show}>Edit</Button></td>
            </tr>
          </tbody>
        </Table>
        <RenderModal>
        <Input value="Mango" showLabel label="Name" name="name"></Input>
        <Input value="34" type="number" showLabel label="Price" name="price" helperText="Enter value in USD"></Input>
        <Button type="submit" onClick={()=> console.log('Submit')}>Submit</Button>
        </RenderModal>
        <div id='modal-root' />
    </div>
    </CurrencyProvider>
  );
}

export default App;
