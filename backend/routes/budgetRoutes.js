import express from "express";
import {
  setBudget,
  getBudget,
  deleteBudget,
  checkBudgetStatus,
} from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, setBudget)
  .get(protect, getBudget)
  .delete(protect, deleteBudget);

router.get("/check", protect, checkBudgetStatus);

export default router;
