import * as React from 'react'
import Table from './components/table'
import {useCurrency} from './contexts/currency'
import EditProduct from './EditProduct'

interface Product {
    id: number,
    name: string,
    price: number,
}
interface ProductTableProps {
    products: Product[]
}

const ProductTable = (props: ProductTableProps) => {
    const {
        state: { currency },
      } = useCurrency()
    return (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price ({currency})</th>
            </tr>
          </thead>
          <tbody>
            {
                props.products.map(product => {
                    console.log('product', product)
                    return (
                        <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td><EditProduct product={product} /></td>
                      </tr>
                    )
                })
            }
          </tbody>
        </Table>
    );
}

export default ProductTable;
