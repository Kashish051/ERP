import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  LogOut,
  Boxes
} from "lucide-react";


function Sidebar() {
const navigate = useNavigate();
  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Mini ERP CRM
      </h1>


      <nav className="space-y-3">


        <a
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </a>


        <a
          href="/customers"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <Users size={20}/>
          Customers
        </a>


        <a
          href="/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <Package size={20}/>
          Products
        </a>


        <a
          href="/challans"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <FileText size={20}/>
          Challans
        </a>

        <a
          href="/stock"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
        >
          <Boxes size={20} />
          Stock Management
        </a>


        <button
     onClick={() => {
    localStorage.removeItem("token");
    navigate("/");
  }}
  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 w-full"
>
  <LogOut size={20}/>
  Logout
</button>


      </nav>


    </div>

  );
}


export default Sidebar;