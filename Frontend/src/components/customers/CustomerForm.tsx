import { useState } from "react";
import axios from "../../api/axios";

interface Props {
  loadCustomers: () => void;
}

function CustomerForm({ loadCustomers }: Props) {
  const [form, setForm] = useState({
    customer_name: "",
    mobile: "",
    email: "",
    business_name: "",
    gst_number: "",
    customer_type: "WHOLESALE",
    address: "",
    status: "ACTIVE",
    follow_up_date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post("/customers", {
        ...form,
        follow_up_date: form.follow_up_date || null,
      });

      alert("Customer Added Successfully");

      setForm({
        customer_name: "",
        mobile: "",
        email: "",
        business_name: "",
        gst_number: "",
        customer_type: "WHOLESALE",
        address: "",
        status: "ACTIVE",
        follow_up_date: "",
        notes: "",
      });

      // Refresh customer table
      loadCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Customer
      </h2>

      <input
        name="customer_name"
        placeholder="Customer Name"
        value={form.customer_name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="business_name"
        placeholder="Business Name"
        value={form.business_name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="gst_number"
        placeholder="GST Number"
        value={form.gst_number}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Add Customer
      </button>
    </form>
  );
}

export default CustomerForm;