import { prepareExpenseLineChartData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { Minus, Plus } from "lucide-react";
import CustomLineChart from "../charts/CustomLineChart";
import ActionButton from "../buttons/ActionButton";

const ExpenseOverview = ({ darkMode, transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    // console.log("Chart Data", result);

    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Expense Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
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
        <CustomLineChart data={chartData} xKey="month" />
      </div>
    </div>
  );
};

export default ExpenseOverview;
