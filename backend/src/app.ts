import express from "express";
import cors from "cors";
import followupRoutes from "./routes/followupRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customersRoutes";
import productRoutes from "./routes/productRoutes";
import challanRoutes from "./routes/challanRoutes";
import stockRoutes from "./routes/stockRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/challans", challanRoutes);
app.use("/api/followups", followupRoutes);
app.use("/api/stock", stockRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Mini ERP CRM Backend Running");
});

export default app;