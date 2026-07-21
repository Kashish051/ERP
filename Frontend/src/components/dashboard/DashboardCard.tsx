import {
  Users,
  Package,
  FileText,
  AlertTriangle,
  CalendarDays
} from "lucide-react";


interface DashboardCardProps {

  title:string;
  value:number;
  color:string;

}


function DashboardCard({
  title,
  value,
  color
}:DashboardCardProps){


const icons:any = {

  Customers: Users,

  Products: Package,

  Challans: FileText,

  "Low Stock": AlertTriangle,

  "Follow Ups": CalendarDays

};


const Icon = icons[title];


return (

<div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">


<div className="flex justify-between items-center">


<div>

<p className="text-gray-500 text-sm">
{title}
</p>


<h1 className={`text-4xl font-bold mt-3 ${color}`}>
{value}
</h1>


</div>


{Icon && (
<Icon
size={40}
className={color}
/>
)}


</div>


</div>

);


}


export default DashboardCard;