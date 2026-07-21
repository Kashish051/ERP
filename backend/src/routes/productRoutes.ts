import express from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

import { verifyToken } from "../middleware/authMiddleware";

router.post("/", verifyToken, addProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;