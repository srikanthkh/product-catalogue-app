import * as React from 'react'
import Table from './components/table'
import {useCurrency} from './contexts/currency'
import EditProduct from './EditProduct'

export interface Product {
    id: number,
    name: string,
    price: number,
}

const ProductTable = () => {
  const {
      state: { currency },
    } = useCurrency()
  const [products, setProducts] = React.useState<Product[] | []>([]); 
      React.useEffect(() => {
        const fetchProducts = async () => {
          try {
            fetch(`http://localhost:5000/products?currency=${currency}`, { method: 'GET' }).then(res => {
              return res.json()
            })
            .then(data => {
              if (data.error) {
                throw data.error
              }
              setProducts(data)
            })
          } catch (err) {
            console.log(err)
          }
        }
        fetchProducts()
      }, [currency])
    return (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price ({currency})</th>
            </tr>
          </thead>
          {!!products.length && <tbody>
            {
                products.map(product => {
                    return (
                        <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td><EditProduct product={product} updateProducts={setProducts}/></td>
                      </tr>
                    )
                })
            }
          </tbody>}
        </Table>
    );
}

export default ProductTable;
