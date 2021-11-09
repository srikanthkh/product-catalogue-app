import * as React from "react";
import Table from "./components/table";
import { useCurrency } from "./contexts/currency";
import EditProduct from "./EditProduct";
import WithLoading from "./components/hoc/WithLoading";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductTableProps {
  products: Product[] | [];
  isLoading: boolean;
  currency: string;
  updateProducts: (products: Product[]) => void;
}

const ProductTableContainer = () => {
  const {
    state: { currency },
  } = useCurrency();
  const [products, setProducts] = React.useState<Product[] | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        fetch(`http://localhost:5000/products?currency=${currency}`, {
          method: "GET",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              throw data.error;
            }
            setProducts(data);
            setIsLoading(false);
          });
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchProducts();
  }, [currency]);
  return (
    <ProductTable
      products={products}
      currency={currency}
      updateProducts={setProducts}
      isLoading={isLoading}
    />
  );
};

const productTable = (props: ProductTableProps) => (
  <Table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price ({props.currency})</th>
      </tr>
    </thead>
    {!!props.products.length && (
      <tbody>
        {props.products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <EditProduct
                product={product}
                updateProducts={props.updateProducts}
              />
            </td>
          </tr>
        ))}
      </tbody>
    )}
  </Table>
);

const ProductTable = WithLoading(productTable);

export default ProductTableContainer;
