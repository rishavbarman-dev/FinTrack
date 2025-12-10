import React, { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = [
  "#E06B80",
  "#1c64f2",
  "#14b8a6",
  "#875ce5",
  "#8CE4FF",
  "#F4C542",
];

const RecentIncomeWithChart = ({ darkMode = false, data, totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    // console.log("adsadasdasd", dataArr);
    setChartData(dataArr);
  }, [data]);

  return (
    <div
      className={`p-4 rounded-md ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } shadow-sm`}
    >
      <div className="mb-3">
        <h5 className="text-lg font-semibold">{`Last 60 Days Income`}</h5>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
        >
          Breakdown by source
        </p>
      </div>

      <div className="flex items-center justify-center">
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={
            Number(totalIncome) || chartData.reduce((s, c) => s + c.amount, 0)
          }
          showTextAnchor
          colors={COLORS}
        />
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
