import React from 'react';
import Button from './components/button'
import Input from './components/input'
import {useCurrency} from './contexts/currency'
import { Product } from './ProductTable'

interface ProductFormProps {
  id: number,
  name: string,
  price: number,
  onSubmit: (product: Product) => void;
}

const ProductForm = (props: ProductFormProps) => {
  const { id, name: initialName, price: initialPrice } = props;
  const [name, setName] = React.useState(initialName)
  const [price, setPrice] = React.useState(initialPrice)

  const handleNameChange = (id: string, value: string) => setName(value)
  const handlePriceChange = (id: string, value: number) => setPrice(value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit({ id, name, price });
  }
    const {
        state: { currency },
      } = useCurrency()
    return (
      <form onSubmit={handleSubmit}>
        <Input value={id} showLabel label="Id" name="id" isDisabled></Input>
        <Input value={name} showLabel label="Name" handleChange={handleNameChange} name="name"></Input>
        <Input value={price} type="number" handleChange={handlePriceChange} showLabel label="Price" name="price" helperText={`Enter value in ${currency}`}></Input>
        <Button type="submit">Submit</Button>
      </form>
    );
}


export default ProductForm;