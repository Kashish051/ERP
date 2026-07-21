import express from "express";

import {
  addCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";


const router = express.Router();


// Add new customer

import { verifyToken } from "../middleware/authMiddleware";

router.post("/", verifyToken, addCustomer);


// Get all customers
router.get("/", getCustomers);


// Get single customer by id
router.get("/:id", getCustomer);


// Update customer
router.put("/:id", updateCustomer);


// Delete customer
router.delete("/:id", deleteCustomer);


export default router;