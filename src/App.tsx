import React from 'react';
import './App.css';
import Button from './components/button'
import Table from './components/table'
import Select from './components/select'
import Input from './components/input'
import useModal from './components/modal'
function App() {
  const { show, RenderModal } = useModal()
  return (
    <div className="App">
      <Select name="currency" value="USD" >
      {
        ["USD", "CAD", "GBP"].map((currency) => <option value={currency}>{currency}</option>)
      }
      </Select>
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
  );
}

export default App;
