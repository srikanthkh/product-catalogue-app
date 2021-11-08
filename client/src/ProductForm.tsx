import React from 'react';
import Button from './components/button'
import Input from './components/input'
import {useCurrency} from './contexts/currency'

interface ProductFormProps {
  id: number,
  name: string,
  price: number,
}

const ProductForm = (props: ProductFormProps) => {
  const { id, name, price } = props;
    const {
        state: { currency },
      } = useCurrency()
    return (
      <>
        <p>{id}</p>
        <Input value={name} showLabel label="Name" name="name"></Input>
        <Input value={price} type="number" showLabel label="Price" name="price" helperText={`Enter value in ${currency}`}></Input>
        <Button type="submit" onClick={()=> console.log('Submit')}>Submit</Button>
      </>
    );
}


export default ProductForm;