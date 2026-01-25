import { inngest } from "../inngest/client.js";
import Budget from "../../models/Budget.js";
import Expense from "../../models/Expense.js";
import Income from "../../models/Income.js";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { sendBudgetAlertEmail, sendMonthlyReportEmail } from "./sendEmail.js";

export const checkBudgetAlert = inngest.createFunction(
  { id: "check-budget-alert", name: "Check Budget Alert" },
  // { cron: "0 */6 * * *" }, // for every 6 hours
  { cron: "*/1 * * * *" }, // for 1 min
  async ({ step }) => {
    const budgets = await step.run("fetch-all-budgets", async () => {
      return await Budget.find().populate("userId", "email");
    });

    for (const budget of budgets) {
      const userId =
        typeof budget.userId._id === "string"
          ? new mongoose.Types.ObjectId(budget.userId._id)
          : budget.userId._id;

      // Current Month Start Date
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Current Month Expense
      const totalExpense = await step.run("fetch-expenses", async () => {
        const result = await Expense.aggregate([
          { $match: { userId, date: { $gte: startOfMonth } } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        return result[0]?.total || 0;
      });

      // const totalExpense = await step.run("fetch-expenses", async () => {
      //   const result = await Expense.aggregate([
      //     { $match: { userId } },
      //     { $group: { _id: null, total: { $sum: "$amount" } } },
      //   ]);
      //   return result[0]?.total || 0;
      // });

      const percentUsed = (totalExpense / budget.amount) * 100;
      console.log(
        `User: ${budget.userId.email}, Budget: ₹${
          budget.amount
        }, Spent: ₹${totalExpense}, Used: ${percentUsed.toFixed(1)}%`
      );

      if (
        percentUsed >= 80 &&
        (!budget.lastAlertSent ||
          shouldSendMonthlyAlert(budget.lastAlertSent, new Date()))
      ) {
        //Send Email
        await step.run("send-email-alert", async () => {
          console.log(
            `Sending budget alert to ${
              budget.userId.email
            }: You’ve used ${percentUsed.toFixed(2)}% of your budget!`
          );
        });

        await sendBudgetAlertEmail({
          to: budget.userId.email,
          username: budget.userId.name || "User",
          data: {
            percentageUsed: percentUsed,
            budgetAmount: budget.amount,
            totalExpense,
          },
        });

        // Update lastAlertSent
        await step.run("update-last-alert-date", async () => {
          await Budget.updateOne(
            { _id: budget._id },
            { $set: { lastAlertSent: new Date() } }
          );
        });
      }
    }

    return { message: "Budget check completed successfully" };
  }
);

export const generateMonthlyReports = inngest.createFunction(
  { id: "generate-monthly-reports", name: "Generate Monthly Reports" },
  { cron: "0 0 1 * *" }, // Runs at midnight on the 1st of every month
  async ({ step }) => {
    // Fetch all users
    const users = await step.run("fetch-users", async () => {
      return await User.find();
    });

    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59
    );

    // Format month name for reporting (e.g., “October 2025”)
    const monthName = startOfLastMonth.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    for (const user of users) {
      // Calculate total expenses (by category)
      const expenses = await step.run(
        `fetch-expenses-${user._id}`,
        async () => {
          return await Expense.aggregate([
            {
              $match: {
                userId: new mongoose.Types.ObjectId(user._id),
                date: { $gte: startOfLastMonth, $lte: endOfLastMonth },
              },
            },
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
          ]);
        }
      );

      // Calculate total incomes (by source)
      const incomes = await step.run(`fetch-incomes-${user._id}`, async () => {
        return await Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(user._id),
              date: { $gte: startOfLastMonth, $lte: endOfLastMonth },
            },
          },
          { $group: { _id: "$source", total: { $sum: "$amount" } } },
        ]);
      });

      // Derive simple stats
      const totalExpense = expenses.reduce((sum, e) => sum + e.total, 0);
      const totalIncome = incomes.reduce((sum, i) => sum + i.total, 0);

      const stats = { expenses, incomes, totalExpense, totalIncome };

      // Generate insights (savings, top categories, etc.)
      const insights = await generateFinancialInsights(stats, monthName);

      console.log(`\n Monthly Report for ${user.email} (${monthName})`);
      console.log("Expenses:", expenses);
      console.log("Incomes:", incomes);
      console.log("Insights:", insights);

      // Send email with monthly report
      await step.run(`send-monthly-report-${user._id}`, async () => {
        await sendMonthlyReportEmail({
          to: user.email,
          username: user.name || "User",
          data: {
            stats,
            month: monthName,
            insights,
          },
        });
      });
    }

    return { message: "Monthly reports generated successfully" };
  }
);

async function generateFinancialInsights(stats, monthName) {
  const { totalExpense, totalIncome, expenses, incomes } = stats;

  const netSavings = totalIncome - totalExpense;
  const topExpense =
    expenses.sort((a, b) => b.total - a.total)[0]?._id || "N/A";
  const topIncome = incomes.sort((a, b) => b.total - a.total)[0]?._id || "N/A";

  return {
    month: monthName,
    totalIncome,
    totalExpense,
    netSavings,
    topExpense,
    topIncome,
    summary:
      netSavings > 0
        ? `You saved ₹${netSavings} in ${monthName}! 🎉`
        : `You overspent by ₹${Math.abs(netSavings)} in ${monthName}. 😬`,
  };
}

/**
 * Decide whether to send an alert this month.
 * - If lastAlert is falsy => send (no previous alert).
 * - Coerces strings/numbers to Date safely.
 * - If parse fails, treat as 'send' to be safe.
 */
async function shouldSendMonthlyAlert(lastAlert, now = new Date()) {
  if (!lastAlert) return true;

  // If it's already a Date instance, use it; otherwise try to coerce
  const last = lastAlert instanceof Date ? lastAlert : new Date(lastAlert);

  if (isNaN(last.getTime())) {
    // invalid date — treat as "no previous alert" so we can send (or decide otherwise)
    return true;
  }

  return (
    last.getMonth() !== now.getMonth() ||
    last.getFullYear() !== now.getFullYear()
  );
}
