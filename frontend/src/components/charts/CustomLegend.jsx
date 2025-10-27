import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center mb-2">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
