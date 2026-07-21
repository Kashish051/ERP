import { useEffect, useState } from "react";
import axios from "../../api/axios";


interface StockMovement {

  id:number;
  product_name:string;
  quantity:number;
  movement_type:string;
  remarks:string;
  created_at:string;

}


function StockMovementTable(){

  const [movements,setMovements] = useState<StockMovement[]>([]);


  useEffect(()=>{

    loadMovements();

  },[]);



  const loadMovements = async()=>{

    try{

      const res = await axios.get(
        "/dashboard/stats"
      );


      setMovements(
        res.data.recentStock
      );


    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-6">


      <h2 className="text-xl font-bold mb-4">
        Recent Stock Movement
      </h2>



      <table className="w-full">


        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              Product
            </th>


            <th className="text-left p-3">
              Type
            </th>


            <th className="text-left p-3">
              Quantity
            </th>


            <th className="text-left p-3">
              Reason
            </th>


          </tr>

        </thead>



        <tbody>


        {movements.map((item)=>(

          <tr
          key={item.id}
          className="border-b"
          >


            <td className="p-3">
              {item.product_name}
            </td>


            <td className="p-3">

              <span
              className={
                item.movement_type==="IN"
                ?
                "text-green-600 font-bold"
                :
                "text-red-600 font-bold"
              }
              >

              {item.movement_type}

              </span>

            </td>


            <td className="p-3">
              {item.quantity}
            </td>


            <td className="p-3">
              {item.remarks}
            </td>


          </tr>

        ))}



        </tbody>


      </table>


    </div>

  );

}


export default StockMovementTable;