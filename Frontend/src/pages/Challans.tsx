import { useState } from "react";

import Layout from "../components/layout/Layout";
import ChallanForm from "../components/challans/ChallanForm";
import ChallanTable from "../components/challans/ChallanTable";

function Challans() {

  const [refresh, setRefresh] = useState(0);

  const loadChallans = () => {

    setRefresh((prev) => prev + 1);

  };

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">

        Sales Challans

      </h1>

      <ChallanForm
        loadChallans={loadChallans}
      />

      <ChallanTable
        refresh={refresh}
      />

    </Layout>

  );

}

export default Challans;