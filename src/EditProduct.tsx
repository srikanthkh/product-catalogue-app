import * as React from 'react'
import Button from './components/button'
import useModal from './components/modal'
import ProductForm from './ProductForm'

interface Product {
    id: number,
    name: string,
    price: number,
}
interface EditProductProps {
    product: Product
}

const EditProduct = (props: EditProductProps) => {
    const { product } = props;
    const { show, RenderModal } = useModal()
    return (
        <>
            <Button onClick={show}>Edit</Button>
            <RenderModal>
                <ProductForm id={product.id} name={product.name} price={product.price} />
            </RenderModal>
        </>
    )
}

export default EditProduct;