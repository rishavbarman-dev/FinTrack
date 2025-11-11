import { prepareIncomeBarChartData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { Plus } from "lucide-react";
import ActionButton from "../buttons/ActionButton";

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

        <ActionButton
          label="Add Income"
          onClick={onAddIncome}
          icon={Plus}
          color="purple"
        />
      </div>

      <div className="mt-8">
        <CustomBarChart data={chartData} xKey="month" />
      </div>
    </div>
  );
};

export default IncomeOverview;
