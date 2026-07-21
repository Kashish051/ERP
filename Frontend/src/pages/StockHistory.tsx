import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/layout/Layout";
import StockMovementForm from "../components/products/StockMovementForm";

interface StockMovement {
  id: number;
  product_name: string;
  movement_type: string;
  quantity: number;
  remarks: string;
  created_at: string;
}

function StockHistory() {

  const [history, setHistory] = useState<StockMovement[]>([]);

  const loadHistory = async () => {

    try {

      const response = await axios.get("/stock");

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadHistory();

  }, []);

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Stock Management
      </h1>

      <StockMovementForm
        loadHistory={loadHistory}
      />

      <div className="bg-white rounded-xl shadow-md p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-left">Type</th>

              <th className="p-3 text-left">Quantity</th>

              <th className="p-3 text-left">Remarks</th>

              <th className="p-3 text-left">Date</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.product_name}
                </td>

                <td
                  className={`p-3 ${
                    item.movement_type === "IN"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }`}
                >
                  {item.movement_type}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  {item.remarks}
                </td>

                <td className="p-3">
                  {new Date(item.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default StockHistory;