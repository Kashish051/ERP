import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Layout from "../components/layout/Layout";
import FollowupForm from "../components/customers/FollowupForm";

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

interface Followup {
  id: number;
  customer_id: number;
  follow_up_date: string;
  notes: string;
  created_at: string;
}

function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [followups, setFollowups] = useState<Followup[]>([]);

  // Load Customer Details
  const loadCustomer = async () => {
    try {
      const response = await axios.get(`/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Follow-ups
  const loadFollowups = async () => {
    try {
      const response = await axios.get(`/followups/${id}`);
      setFollowups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCustomer();
    loadFollowups();
  }, []);

  if (!customer) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Customer Details
      </h1>

      {/* Customer Details */}

      <div className="bg-white rounded-xl shadow-md p-6 space-y-3 mb-6">

        <p>
          <strong>Name:</strong> {customer.customer_name}
        </p>

        <p>
          <strong>Business:</strong> {customer.business_name}
        </p>

        <p>
          <strong>Mobile:</strong> {customer.mobile}
        </p>

        <p>
          <strong>Email:</strong> {customer.email}
        </p>

        <p>
          <strong>GST Number:</strong> {customer.gst_number}
        </p>

        <p>
          <strong>Customer Type:</strong> {customer.customer_type}
        </p>

        <p>
          <strong>Status:</strong> {customer.status}
        </p>

        <p>
          <strong>Address:</strong> {customer.address}
        </p>

        <p>
          <strong>Follow-up Date:</strong> {customer.follow_up_date}
        </p>

        <p>
          <strong>Notes:</strong> {customer.notes}
        </p>

      </div>

      {/* Add Follow-up */}

      <FollowupForm
        customerId={Number(id)}
        loadFollowups={loadFollowups}
      />

      {/* Follow-up History */}

      <div className="bg-white rounded-xl shadow-md p-6 mt-6">

        <h2 className="text-2xl font-bold mb-4">
          Follow-up History
        </h2>

        {followups.length === 0 ? (

          <p className="text-gray-500">
            No follow-ups found.
          </p>

        ) : (

          followups.map((item) => (

            <div
              key={item.id}
              className="border-b py-4"
            >

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.follow_up_date).toLocaleDateString()}
              </p>

              <p className="mt-2">
                <strong>Notes:</strong>{" "}
                {item.notes}
              </p>

            </div>

          ))

        )}

      </div>

    </Layout>
  );
}

export default CustomerDetails;