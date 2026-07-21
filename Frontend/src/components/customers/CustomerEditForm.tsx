import { useState } from "react";
import axios from "../../api/axios";


interface Customer {

  id:number;
  customer_name:string;
  mobile:string;
  email:string;
  business_name:string;
  gst_number:string;
  customer_type:string;
  address:string;
  status:string;
  follow_up_date:string;
  notes:string;

}


interface Props {

  customer:Customer;
  loadCustomers:()=>void;
  closeEdit:()=>void;

}



function CustomerEditForm({
  customer,
  loadCustomers,
  closeEdit
}:Props){


  const [form,setForm] = useState({

    customer_name: customer.customer_name || "",
    mobile: customer.mobile || "",
    email: customer.email || "",
    business_name: customer.business_name || "",
    gst_number: customer.gst_number || "",
    customer_type: customer.customer_type || "WHOLESALE",
    address: customer.address || "",
    status: customer.status || "ACTIVE",
    follow_up_date: customer.follow_up_date || "",
    notes: customer.notes || "",

  });



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  )=>{

    setForm({

      ...form,
      [e.target.name]:e.target.value

    });

  };



  const updateCustomer = async(
    e:React.FormEvent
  )=>{

    e.preventDefault();


    try{


      await axios.put(
        `/customers/${customer.id}`,
        form
      );


      loadCustomers();

      closeEdit();


    }
    catch(error){

      console.log(error);

    }

  };



  return(

    <form
      onSubmit={updateCustomer}
      className="bg-white p-6 rounded-xl shadow-md mb-6"
    >


      <h2 className="text-xl font-bold mb-4">
        Edit Customer
      </h2>



      <input
        name="customer_name"
        value={form.customer_name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Customer Name"
      />



      <input
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Mobile"
      />



      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Email"
      />



      <input
        name="business_name"
        value={form.business_name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Business Name"
      />



      <input
        name="gst_number"
        value={form.gst_number}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="GST Number"
      />



      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Address"
      />



      <input
        name="follow_up_date"
        value={form.follow_up_date}
        onChange={handleChange}
        type="date"
        className="border p-2 w-full mb-3"
      />



      <input
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
        placeholder="Notes"
      />



      <button
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Update
      </button>



      <button
        type="button"
        onClick={closeEdit}
        className="ml-3 bg-gray-500 text-white px-5 py-2 rounded"
      >
        Cancel
      </button>


    </form>

  );

}


export default CustomerEditForm;