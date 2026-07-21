import { useState } from "react";
import axios from "../../api/axios";

interface Product {

  id:number;

  product_name:string;

  sku:string;

  category:string;

  unit_price:number;

  current_stock:number;

  minimum_stock:number;

  warehouse_location:string;

}

interface Props{

  product:Product;

  loadProducts:()=>void;

  closeEdit:()=>void;

}

function ProductEditForm({

  product,

  loadProducts,

  closeEdit

}:Props){

  const [form,setForm]=useState({

    product_name:product.product_name,

    sku:product.sku,

    category:product.category,

    unit_price:product.unit_price,

    current_stock:product.current_stock,

    minimum_stock:product.minimum_stock,

   warehouse_location:product.warehouse_location

  });

  const handleChange=(

    e:React.ChangeEvent<HTMLInputElement>

  )=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };

  const updateProduct=async(

    e:React.FormEvent

  )=>{

    e.preventDefault();

    try{

      await axios.put(

        `/products/${product.id}`,

        form

      );

      alert("Product Updated");

      loadProducts();

      closeEdit();

    }

    catch(error){

      console.log(error);

    }

  };

  return(

    <form

      onSubmit={updateProduct}

      className="bg-white p-6 rounded-xl shadow-md mb-6"

    >

      <h2 className="text-2xl font-bold mb-4">

        Edit Product

      </h2>

      <input

        name="product_name"

        value={form.product_name}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        name="sku"

        value={form.sku}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        name="category"

        value={form.category}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        type="number"

        name="unit_price"

        value={form.unit_price}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        type="number"

        name="current_stock"

        value={form.current_stock}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        type="number"

        name="minimum_stock"

        value={form.minimum_stock}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <input

        name="warehouse_location"

        value={form.warehouse_location}

        onChange={handleChange}

        className="border p-2 w-full mb-3"

      />

      <button

        className="bg-green-600 text-white px-5 py-2 rounded"

      >

        Update Product

      </button>

      <button

        type="button"

        onClick={closeEdit}

        className="bg-gray-500 text-white px-5 py-2 rounded ml-3"

      >

        Cancel

      </button>

    </form>

  );

}

export default ProductEditForm;