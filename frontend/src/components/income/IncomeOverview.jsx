import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { prepareIncomeBarChartData } from "@/utils/helper";
import CustomBarChart from "../charts/CustomBarChart";
import ActionButton from "../buttons/ActionButton";
import { useOutletContext } from "react-router-dom";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const { darkMode } = useOutletContext();

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  // Define dynamic classes for dark/light mode
  const containerClasses = `
    rounded-2xl shadow-lg border p-8
    ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}
  `;

  const headerBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-600";
  const gradientText = darkMode
    ? "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div
        className={`flex items-start justify-between mb-8 pb-6 border-b ${headerBorder}`}
      >
        <div className="space-y-2">
          <h1 className={`text-base sm:text-xl font-bold ${gradientText}`}>
            Income Overview
          </h1>
          <p className={`${textMuted} text-sm`}>
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

      {/* Chart Section */}
      <div className="mt-8">
        <CustomBarChart data={chartData} xKey="month" darkMode={darkMode} />
      </div>
    </div>
  );
};

export default IncomeOverview;
