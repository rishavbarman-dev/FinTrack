/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
import User from "./models/User.js";
import Income from "./models/Income.js";
import Expense from "./models/Expense.js";
import Budget from "./models/Budget.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import incomes from "./data/incomes.js";
import expenses from "./data/expenses.js";
import budgets from "./data/budgets.js";

dotenv.config();

connectDB();

// -------------------------------------------------
// IMPORT DATA
// -------------------------------------------------
const importData = async () => {
  try {
    await User.deleteMany();
    await Income.deleteMany();
    await Expense.deleteMany();
    await Budget.deleteMany();

    const createdUsers = await User.insertMany(users);
    const userId = createdUsers[0]._id; // first user id

    // 🎯 All seed data attach with same user
    const incomesWithUser = incomes.map((i) => ({ ...i, userId }));
    const expensesWithUser = expenses.map((e) => ({ ...e, userId }));
    const budgetsWithUser = budgets.map((b) => ({ ...b, userId }));

    await Income.insertMany(incomesWithUser);
    await Expense.insertMany(expensesWithUser);
    await Budget.insertMany(budgetsWithUser);

    console.log("🚀 All Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
// -------------------------------------------------
// DESTROY DATA
// -------------------------------------------------
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Income.deleteMany();
    await Expense.deleteMany();
    await Budget.deleteMany();
    console.log("🔥 All Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Destroy Error:", error);
    process.exit(1);
  }
};

// -------------------------------------------------
// CHECK COMMAND
// -------------------------------------------------
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
