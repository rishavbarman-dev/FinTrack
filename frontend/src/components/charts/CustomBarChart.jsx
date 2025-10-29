import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomBarChart = ({ data = [], darkMode = false, xKey = "category" }) => {
  const chartData = Array.isArray(data) ? data : [];
  const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#a78bfa");

  const MyTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const d = payload[0].payload;
      const containerClass = darkMode
        ? "bg-gray-900 text-gray-100 border border-gray-800"
        : "bg-white text-gray-900 border border-gray-100";
      return (
        <div
          className={`${containerClass} p-3 rounded-md shadow-sm max-w-xs`}
          role="status"
        >
          <div className="font-semibold text-sm mb-1 truncate">
            {d.category ?? d.month ?? "Item"}
          </div>
          <div className="text-sm">
            Amount: <span className="font-medium">{d.amount}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!chartData.length) {
    return (
      <div
        className={
          darkMode
            ? "bg-gray-800 p-4 rounded-md text-gray-300"
            : "bg-white p-4 rounded-md shadow-sm text-gray-600"
        }
      >
        <div className="text-sm">No data to display</div>
      </div>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 p-4 rounded-md"
          : "bg-white p-4 rounded-md shadow-sm"
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            stroke={darkMode ? "rgba(255,255,255,0.03)" : "transparent"}
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 8, right: 8 }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<MyTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
