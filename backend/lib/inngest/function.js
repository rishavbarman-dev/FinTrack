import { inngest } from "../inngest/client.js";
import Budget from "../../models/Budget.js";
import Expense from "../../models/Expense.js";
import mongoose from "mongoose";
import { sendBudgetAlertEmail } from "./sendEmail.js";

export const checkBudgetAlert = inngest.createFunction(
  { name: "Check Budget Alert" },
  { cron: "0 */6 * * *" }, // for every 6 hours
  // { cron: "*/1 * * * *" }, // for 1 min
  async ({ step }) => {
    const budgets = await step.run("fetch-all-budgets", async () => {
      return await Budget.find().populate("userId", "email");
    });

    for (const budget of budgets) {
      const userId =
        typeof budget.userId._id === "string"
          ? new mongoose.Types.ObjectId(budget.userId._id)
          : budget.userId._id;

      const totalExpense = await step.run("fetch-expenses", async () => {
        const result = await Expense.aggregate([
          { $match: { userId } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        return result[0]?.total || 0;
      });

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
