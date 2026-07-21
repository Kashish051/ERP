import { useEffect, useState } from "react";
import axios from "../../api/axios";

interface Product {
  id: number;
  product_name: string;
  current_stock: number;
  minimum_stock: number;
}


function LowStockTable() {

  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {
    try {

      const response = await axios.get("/products");

      const lowStock = response.data.filter(
        (product: Product) =>
          product.current_stock <= product.minimum_stock
      );

      setProducts(lowStock);

    } catch(error) {

      console.log(error);

    }
  };


  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Low Stock Products
      </h2>


      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              Product
            </th>

            <th className="text-left p-3">
              Current Stock
            </th>

            <th className="text-left p-3">
              Minimum Stock
            </th>

          </tr>

        </thead>


        <tbody>

          {products.map((item)=>(
            <tr key={item.id} className="border-b">

              <td className="p-3">
                {item.product_name}
              </td>

              <td className="p-3">
                {item.current_stock}
              </td>

              <td className="p-3">
                {item.minimum_stock}
              </td>

            </tr>
          ))}


        </tbody>

      </table>

    </div>

  );
}


export default LowStockTable;