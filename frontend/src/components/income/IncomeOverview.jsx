import { prepareIncomeBarChartData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ darkMode, transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    // console.log("Chart Data", result);

    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Income Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Track your income trends and sources over time
          </p>
        </div>
        <button
          onClick={onAddIncome}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Add Income</span>
        </button>
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} xKey="month" />
      </div>
    </div>
  );
};

export default IncomeOverview;
