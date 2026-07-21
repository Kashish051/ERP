import { useEffect, useState } from "react";
import axios from "../../api/axios";

interface Product {
  id: number;
  product_name: string;
}

interface Props {
  loadHistory: () => void;
}

function StockMovementForm({ loadHistory }: Props) {

  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    product_id: "",
    movement_type: "IN",
    quantity: "",
    remarks: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await axios.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await axios.post("/stock", {
        ...form,
        product_id: Number(form.product_id),
        quantity: Number(form.quantity),
      });

      alert("Stock Updated Successfully");

      setForm({
        product_id: "",
        movement_type: "IN",
        quantity: "",
        remarks: "",
      });

      loadHistory();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Stock Movement
      </h2>

      <select
        name="product_id"
        value={form.product_id}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      >

        <option value="">
          Select Product
        </option>

        {products.map((product) => (

          <option
            key={product.id}
            value={product.id}
          >
            {product.product_name}
          </option>

        ))}

      </select>

      <select
        name="movement_type"
        value={form.movement_type}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      >

        <option value="IN">Stock In</option>

        <option value="OUT">Stock Out</option>

      </select>

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        name="remarks"
        placeholder="Remarks"
        value={form.remarks}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <button
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Save
      </button>

    </form>

  );

}

export default StockMovementForm;