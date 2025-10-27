// ...existing code...
import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875ce5", "#1c64f2", "#14b8a6"];

export default function FinancialOverview({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
  darkMode = false,
}) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div
      className={`p-4 rounded-md shadow-sm mt-7 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="mb-4">
        <h5
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Financial Overview
        </h5>
        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Snapshot of your income, expenses and balance
        </p>
      </div>

      <div className="flex justify-center">
        <CustomPieChart
          data={balanceData}
          colors={COLORS}
          label="Total Balance"
          totalAmount={totalBalance}
          size={220}
        />
      </div>
    </div>
  );
}
