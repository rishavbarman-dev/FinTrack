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
    <div className="card">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-purple-600">Income Overview</h1>
        <br />
        <p>Track..................</p>
        <button
          onClick={onAddIncome}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Add Income</span>
        </button>
      </div>

      <div className="mt-7">
        <CustomBarChart data={chartData} xKey="month" />
      </div>
    </div>
  );
};

export default IncomeOverview;
