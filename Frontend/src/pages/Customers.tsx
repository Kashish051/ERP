import { useEffect, useState } from "react";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerEditForm from "../components/customers/CustomerEditForm";
import Layout from "../components/layout/Layout";
import axios from "../api/axios";

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

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [search, setSearch] = useState("");

  const loadCustomers = async (searchValue = "") => {

  try {

    const response = await axios.get(
      `/customers?search=${encodeURIComponent(searchValue)}`
    );

    setCustomers(response.data);

  } catch (error) {

    console.log(error);

  }

};


  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      {selectedCustomer && (
        <CustomerEditForm
          customer={selectedCustomer}
          loadCustomers={() => loadCustomers(search)}
          closeEdit={() => setSelectedCustomer(null)}
        />
      )}

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by Name, Mobile or Business"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            loadCustomers(value);
          }}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <CustomerForm
        loadCustomers={() => loadCustomers(search)}
      />
     
      <CustomerTable
        customers={customers}
        loadCustomers={() => loadCustomers(search)}
        onEdit={setSelectedCustomer}
      />
    </Layout>
  );
}

export default Customers;