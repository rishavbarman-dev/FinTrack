import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "@/utils/helper";
import CustomLineChart from "../charts/CustomLineChart";
import ActionButton from "../buttons/ActionButton";
import { Minus } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);
  const { darkMode } = useOutletContext();

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  // --- Dynamic styling ---
  const containerClasses = `
    rounded-2xl shadow-lg border p-8 transition-colors
    ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}
  `;

  const headerBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-600";
  const gradientText = darkMode
    ? "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent";

  return (
    <div className={containerClasses}>
      <div
        className={`flex items-start justify-between mb-8 pb-6 border-b ${headerBorder}`}
      >
        <div className="space-y-2">
          <h1 className={`text-4xl font-bold ${gradientText}`}>
            Expense Overview
          </h1>
          <p className={`${textMuted} text-sm`}>
            Track your expense trends and categories over time
          </p>
        </div>

        <ActionButton
          label="Add Expense"
          onClick={onAddExpense}
          icon={Minus}
          color="purple"
        />
      </div>

      <div className="mt-8">
        <CustomLineChart data={chartData} xKey="month" darkMode={darkMode} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
