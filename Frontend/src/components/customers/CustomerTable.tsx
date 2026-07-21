import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface Customer {
  id: number;
  customer_name: string;
  mobile: string;
  email: string;
  business_name: string;
  gst_number: string;
  customer_type: string;
  address: string;
  status: string;
  follow_up_date: string;
  notes: string;
}

interface Props {
  customers: Customer[];
  loadCustomers: () => void;
  onEdit: (customer: Customer) => void;
}


function CustomerTable({
  customers,
  loadCustomers,
  onEdit
}: Props) {
const navigate = useNavigate();

  const deleteCustomer = async(id:number)=>{

    try{

      await axios.delete(`/customers/${id}`);

      loadCustomers();

    }
    catch(error){

      console.log(error);

    }

  };


  return(

    <div className="bg-white rounded-xl shadow-md p-6">


      <table className="w-full">


        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              Name
            </th>

            <th className="text-left p-3">
              Mobile
            </th>

            <th className="text-left p-3">
              Email
            </th>

            <th className="text-left p-3">
              Business
            </th>

            <th className="text-left p-3">
              Action
            </th>

          </tr>

        </thead>


        <tbody>


          {customers.map((customer)=>(

            <tr
              key={customer.id}
              className="border-b"
            >


              <td className="p-3">
                {customer.customer_name}
              </td>


              <td className="p-3">
                {customer.mobile}
              </td>


              <td className="p-3">
                {customer.email}
              </td>


              <td className="p-3">
                {customer.business_name}
              </td>


              <td className="p-3">

                <div className="flex gap-2">

  <button
    onClick={() => navigate(`/customers/${customer.id}`)}
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    View
  </button>

  <button
    onClick={() => onEdit(customer)}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => deleteCustomer(customer.id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
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


export default CustomerTable;