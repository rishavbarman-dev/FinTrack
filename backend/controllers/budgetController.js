import { isValidObjectId, Types } from "mongoose";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

/**
 * @desc Create or update user's budget
 * @route POST /api/budget
 */
export const setBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Budget amount must be greater than zero." });
    }

    // Check if user already has a budget
    let budget = await Budget.findOne({ userId });

    if (budget) {
      budget.amount = amount;
      await budget.save();
      return res
        .status(200)
        .json({ message: "Budget updated successfully", budget });
    } else {
      budget = await Budget.create({ userId, amount });
      return res
        .status(201)
        .json({ message: "Budget created successfully", budget });
    }
  } catch (error) {
    console.error("Error setting budget:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get user's budget
 * @route GET /api/budget
 */
export const getBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "No budget found for this user." });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error getting budget:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete user's budget
 * @route DELETE /api/budget
 */
export const deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await Budget.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ message: "No budget found to delete." });
    }

    res.status(200).json({ message: "Budget deleted successfully." });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Check if user's expenses exceed budget
 * @route GET /api/budget/check
 */
export const checkBudgetStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await Budget.findOne({ userId });
    const userObjectId = isValidObjectId(userId)
      ? new Types.ObjectId(String(userId))
      : userId;

    if (!budget) {
      return res.status(404).json({ message: "No budget set for this user." });
    }

    const totalExpenses = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const spent = totalExpenses[0]?.total || 0;
    const remaining = budget.amount - spent;

    const status =
      remaining < 0
        ? `Over budget by ₹${Math.abs(remaining)}`
        : `Remaining budget ₹${remaining}`;

    res.status(200).json({
      budget: budget.amount,
      spent,
      remaining,
      status,
    });
  } catch (error) {
    console.error("Error checking budget status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
