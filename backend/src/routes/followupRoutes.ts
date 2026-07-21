import express from "express";

import {
  addFollowup,
  getFollowups,
} from "../controllers/followupController";

const router = express.Router();

// Add Follow-up

import { verifyToken } from "../middleware/authMiddleware";

router.post("/", verifyToken, addFollowup);

// Get Follow-ups of a Customer
router.get("/:customerId", getFollowups);

export default router;