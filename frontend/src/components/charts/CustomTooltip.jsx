import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="text-sm font-semibold">{payload[0].name}</p>
        <p className="text-sm">Amount: {payload[0].value}</p>
      </div>
    );
  }
};

export default CustomTooltip;
