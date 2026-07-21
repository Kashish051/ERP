import { useEffect, useState } from "react";
import axios from "../../api/axios";

interface Challan {
  id: number;
  challan_number: string;
  status: string;
}


function RecentActivity() {

  const [challans, setChallans] = useState<Challan[]>([]);


  useEffect(() => {
    loadChallans();
  }, []);


  const loadChallans = async () => {
    try {

      const response = await axios.get("/challans");

      setChallans(response.data.slice(0,5));

    } catch(error) {

      console.log(error);

    }
  };


  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Challans
      </h2>


      <table className="w-full">

        <thead>
          <tr className="border-b">

            <th className="text-left p-3">
              Challan No
            </th>

            <th className="text-left p-3">
              Status
            </th>

          </tr>
        </thead>


        <tbody>

          {challans.map((item)=>(
            <tr key={item.id} className="border-b">

              <td className="p-3">
                {item.challan_number}
              </td>

              <td className="p-3">
                {item.status}
              </td>

            </tr>
          ))}

        </tbody>

      </table>


    </div>
  );
}


export default RecentActivity;