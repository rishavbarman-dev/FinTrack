import { prepareExpenseBarChartData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [], darkMode = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div
      className={`p-4 rounded-md transition-colors ${
        darkMode
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900 shadow-sm"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h5
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Last 30 days expenses
        </h5>
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
        >
          Expenses overview
        </span>
      </div>

      <div>
        <CustomBarChart data={chartData} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
