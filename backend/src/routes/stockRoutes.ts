import express from "express";
import {
  addStockMovement,
  getStockMovements,
} from "../controllers/stockController";

const router = express.Router();


import { verifyToken } from "../middleware/authMiddleware";

router.post("/", verifyToken, addStockMovement);

router.get("/", getStockMovements);

export default router;