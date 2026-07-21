import { useState } from "react";
import axios from "../../api/axios";

interface Props {
  customerId: number;
  loadFollowups: () => void;
}

function FollowupForm({
  customerId,
  loadFollowups,
}: Props) {

  const [form, setForm] = useState({
    follow_up_date: "",
    notes: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await axios.post("/followups", {
        customer_id: customerId,
        follow_up_date: form.follow_up_date,
        notes: form.notes,
      });

      setForm({
        follow_up_date: "",
        notes: "",
      });

      loadFollowups();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-5 mb-6"
    >

      <h2 className="text-xl font-bold mb-4">
        Add Follow-up
      </h2>

      <input
        type="date"
        value={form.follow_up_date}
        onChange={(e) =>
          setForm({
            ...form,
            follow_up_date: e.target.value,
          })
        }
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Enter follow-up notes"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
        className="border p-2 w-full mb-3"
      />

      <button
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Add Follow-up
      </button>

    </form>
  );
}

export default FollowupForm;