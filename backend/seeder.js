/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
import User from "./models/User.js";
import Income from "./models/Income.js";
import Expense from "./models/Expense.js";
import Budget from "./models/Budget.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";

dotenv.config();

connectDB();

// -------------------------------------------------
// IMPORT DATA
// -------------------------------------------------
const importData = async () => {
  try {
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const user = createdUser[0]._id;

    console.log("Data Imported.");
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
