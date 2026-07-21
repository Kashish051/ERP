import { useEffect, useState } from "react";
import axios from "../api/axios";

import Layout from "../components/layout/Layout";
import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
import ProductEditForm from "../components/products/ProductEditForm";

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

function Products() {

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const loadProducts = async (
    searchValue = ""
  ) => {

    try {

      const response = await axios.get(
        `/products?search=${searchValue}`
      );

      setProducts(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">

        Products

      </h1>

      {
        selectedProduct && (

          <ProductEditForm

            product={selectedProduct}

            loadProducts={() => loadProducts(search)}

            closeEdit={() => setSelectedProduct(null)}

          />

        )
      }

      <input

        type="text"

        placeholder="Search Product"

        value={search}

        onChange={(e) => {

          const value = e.target.value;

          setSearch(value);

          loadProducts(value);

        }}

        className="border p-3 rounded w-full mb-5"

      />

      <ProductForm

        loadProducts={() => loadProducts(search)}

      />

      <ProductTable

        products={products}

        loadProducts={() => loadProducts(search)}

        onEdit={setSelectedProduct}

      />

    </Layout>

  );

}

export default Products;