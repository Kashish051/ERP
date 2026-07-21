import { useState } from "react";
import axios from "../../api/axios";

interface Props {
  loadProducts: () => void;
}

function ProductForm({ loadProducts }: Props) {

  const [form, setForm] = useState({
    product_name: "",
    sku: "",
    category: "",
    unit_price: "",
    current_stock: "",
    minimum_stock: "",
     warehouse_location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

      await axios.post("/products", {
        ...form,
        unit_price: Number(form.unit_price),
        current_stock: Number(form.current_stock),
        minimum_stock: Number(form.minimum_stock),
      });

      alert("Product Added Successfully");

      setForm({
        product_name: "",
        sku: "",
        category: "",
        unit_price: "",
        current_stock: "",
        minimum_stock: "",
        warehouse_location: "",
      });

      loadProducts();

    } catch (error) {

      console.log(error);

      alert("Failed to add product");

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>

      <input
        name="product_name"
        placeholder="Product Name"
        value={form.product_name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        name="sku"
        placeholder="SKU"
        value={form.sku}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="number"
        name="unit_price"
        placeholder="Unit Price"
        value={form.unit_price}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="number"
        name="current_stock"
        placeholder="Current Stock"
        value={form.current_stock}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="number"
        name="minimum_stock"
        placeholder="Minimum Stock"
        value={form.minimum_stock}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        name="warehouse_location"
        placeholder="warehouse_location"
        value={form.warehouse_location}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Add Product
      </button>

    </form>

  );

}

export default ProductForm;