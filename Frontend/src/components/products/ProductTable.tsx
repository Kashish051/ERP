import axios from "../../api/axios";

interface Product {
  id: number;
  product_name: string;
  sku: string;
  category: string;
  unit_price: number;
  current_stock: number;
  minimum_stock: number;
  warehouse_location: string;
}

interface Props {
  products: Product[];
  loadProducts: () => void;
  onEdit: (product: Product) => void;
}

function ProductTable({
  products,
  loadProducts,
  onEdit,
}: Props) {

  const deleteProduct = async (id: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`/products/${id}`);

      alert("Product Deleted");

      loadProducts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3 text-left">Product</th>

            <th className="p-3 text-left">SKU</th>

            <th className="p-3 text-left">Category</th>

            <th className="p-3 text-left">Price</th>

            <th className="p-3 text-left">Stock</th>

            <th className="p-3 text-left">Warehouse</th>

            <th className="p-3 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b"
            >

              <td className="p-3">
                {product.product_name}
              </td>

              <td className="p-3">
                {product.sku}
              </td>

              <td className="p-3">
                {product.category}
              </td>

              <td className="p-3">
                ₹ {product.unit_price}
              </td>

              <td
                className={`p-3 ${
                  product.current_stock <= product.minimum_stock
                    ? "text-red-600 font-bold"
                    : ""
                }`}
              >
                {product.current_stock}
              </td>

              <td className="p-3">
                {product.warehouse_location}
              </td>

              <td className="p-3">

                <div className="flex gap-2">

                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ProductTable;