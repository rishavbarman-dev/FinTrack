import React from "react";

const CustomTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const containerClasses = `
      p-2 border rounded shadow text-sm
      ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      }
    `;

    const labelColor = darkMode ? "text-gray-300" : "text-gray-700";
    const valueColor = darkMode ? "text-gray-200" : "text-gray-800";

    return (
      <div className={containerClasses}>
        <p className={`font-semibold ${labelColor}`}>{payload[0].name}</p>
        <p className={valueColor}>Amount: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
