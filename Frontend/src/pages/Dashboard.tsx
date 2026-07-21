import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import DashboardCard from "../components/dashboard/DashboardCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import LowStockTable from "../components/dashboard/LowStockTable";
import axios from "../api/axios";
import StockMovementTable from "../components/dashboard/StockMovementTable";


interface DashboardData {

  customers:number;
  products:number;
  challans:number;
  lowStock:number;
  followups:number;

}


function Dashboard(){

  const [data,setData] = useState<DashboardData>({

    customers:0,
    products:0,
    challans:0,
    lowStock:0,
    followups:0

  });



  useEffect(()=>{

    loadDashboard();

  },[]);



  const loadDashboard = async()=>{

    try{

      const res = await axios.get(
        "/dashboard/stats"
      );


      setData({

        customers:res.data.customers,

        products:res.data.products,

        challans:res.data.challans,

        lowStock:res.data.lowStock,

        followups:res.data.followups

      });


    }
    catch(error){

      console.log(error);

    }

  };



return (

<Layout>


<h1 className="text-3xl font-bold mb-6">
Dashboard
</h1>



<div className="
grid 
grid-cols-1
md:grid-cols-2
lg:grid-cols-5
gap-6
">


<DashboardCard

title="Customers"

value={data.customers}

color="text-blue-600"

/>



<DashboardCard

title="Products"

value={data.products}

color="text-green-600"

/>



<DashboardCard

title="Challans"

value={data.challans}

color="text-orange-600"

/>



<DashboardCard

title="Low Stock"

value={data.lowStock}

color="text-red-600"

/>



<DashboardCard

title="Follow Ups"

value={data.followups}

color="text-purple-600"

/>


</div>



<RecentActivity />


<LowStockTable />
<StockMovementTable />


</Layout>

);


}


export default Dashboard;