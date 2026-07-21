import express from "express";

import {
  createChallan,
  getChallans,
} from "../controllers/challanController";

const router = express.Router();

import { verifyToken } from "../middleware/authMiddleware";

router.post("/", verifyToken, createChallan);

router.get("/", getChallans);

export default router;