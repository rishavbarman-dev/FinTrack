const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

// NOTE: ISSUE IN THE TOTAL BALANCE CALCULATION LOGIC HERE

exports.getDahsboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = isValidObjectId(userId)
      ? new Types.ObjectId(String(userId))
      : userId;

    // fetch total income and total expense using aggregation
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("Total Income Aggregation Result:", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("Total Expense Aggregation Result:", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    // Get income transactions in the last 60 days
    const last60DaysIncomeTrabsactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total Income fot last 60 days
    const incomeLast60Days = last60DaysIncomeTrabsactions.reduce(
      (sum, transactions) => sum + transactions.amount,
      0
    );

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTrabsactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total Expense fot last 30 days
    const expenseLast30Days = last30DaysExpenseTrabsactions.reduce(
      (sum, transactions) => sum + transactions.amount,
      0
    );

    // Fetch last 5 transactions (income + expense)
    const incomes = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const expenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const last5Transactions = [
      ...incomes.map((txn) => ({ ...txn, type: "income" })),
      ...expenses.map((txn) => ({ ...txn, type: "expense" })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5); // latest first

    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTrabsactions,
      },
      last60DaysIncomes: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTrabsactions,
      },
      recentTransactions: last5Transactions,
    });
  } catch (error) {
    console.error("Error in getDahsboardData:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
