import { useEffect, useState } from "react";
import axios from "../../api/axios";

interface Customer {
  id: number;
  customer_name: string;
}

interface Product {
  id: number;
  product_name: string;
  current_stock: number;
  unit_price: number;
}

interface Props {
  loadChallans: () => void;
}

function ChallanForm({ loadChallans }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await axios.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createChallan = async () => {
    if (!customerId) {
      alert("Please select customer");
      return;
    }

    if (!productId) {
      alert("Please select product");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    try {
      const response = await axios.post("/challans", {
        customer_id: Number(customerId),

        status: "CONFIRMED",

        

        products: [
          {
            product_id: Number(productId),
            quantity: Number(quantity),
          },
        ],
      });

      alert(response.data.message);

      setCustomerId("");
      setProductId("");
      setQuantity(1);

      loadProducts();
      loadChallans();

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create challan"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">
        Create Challan
      </h2>

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="">Select Customer</option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.customer_name}
          </option>
        ))}
      </select>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="">Select Product</option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.product_name} (Stock: {product.current_stock})
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-2 w-full mb-4"
      />

      <button
        type="button"
        onClick={createChallan}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Create Challan
      </button>
    </div>
  );
}

export default ChallanForm;