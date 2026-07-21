import { Routes, Route } from "react-router-dom";
import CustomerDetails from "./pages/CustomerDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Challans from "./pages/Challans";
import StockHistory from "./pages/StockHistory";

function App(){

return(

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/customers" element={<Customers/>}/>

<Route path="/products" element={<Products/>}/>

<Route path="/challans" element={<Challans/>}/>

 <Route path="/customers/:id" element={<CustomerDetails />} />
 
 <Route path="/stock" element={<StockHistory />} />

</Routes>

);

}

export default App;


