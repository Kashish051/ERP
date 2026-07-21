import { useEffect, useState } from "react";
import axios from "../../api/axios";

interface Challan {
  id: number;
  challan_number: string;
  customer_name: string;
  total_quantity: number;
  status: string;
  created_at: string;
}

interface Props {
  refresh: number;
}

function ChallanTable({ refresh }: Props) {

  const [challans, setChallans] = useState<Challan[]>([]);

  useEffect(() => {
    loadChallans();
  }, [refresh]);

  const loadChallans = async () => {

    try {

      const res = await axios.get("/challans");

      setChallans(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Challan List
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-3">No.</th>

            <th className="border p-3">Customer</th>

            <th className="border p-3">Quantity</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Date</th>

          </tr>

        </thead>

        <tbody>

          {challans.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="text-center p-5"
              >
                No Challans Found
              </td>

            </tr>

          ) : (

            challans.map((challan) => (

              <tr key={challan.id}>

                <td className="border p-3">
                  {challan.challan_number}
                </td>

                <td className="border p-3">
                  {challan.customer_name}
                </td>

                <td className="border p-3">
                  {challan.total_quantity}
                </td>

                <td className="border p-3">
                  {challan.status}
                </td>

                <td className="border p-3">
                  {new Date(
                    challan.created_at
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default ChallanTable;