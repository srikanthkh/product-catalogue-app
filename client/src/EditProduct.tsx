import * as React from 'react'
import Button from './components/button'
import useModal from './components/modal'
import ProductForm from './ProductForm'
import { Product } from './ProductTable'

interface EditProductProps {
    product: Product,
    updateProducts: (products: Product[]) => void;
}

const EditProduct = (props: EditProductProps) => {
    const { product } = props;
    const { show, hide, RenderModal } = useModal()
    const onEdit = ({ id, name, price }: Product) => {
        try {
            fetch(`http://localhost:5000/products/${id}`,
            { method: 'PUT', body: JSON.stringify({ name, price }), 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }}).then(res => {
              return res.json()
            })
            .then(data => {
              if (data.error) {
                throw data.error
              }
              props.updateProducts(data)
              hide();
            })
          } catch (err) {
            console.log(err)
          }
    }
    return (
        <>
            <Button onClick={show}>Edit</Button>
            <RenderModal>
                <ProductForm id={product.id} name={product.name} price={product.price} onSubmit={onEdit} />
            </RenderModal>
        </>
    )
}

export default EditProduct;