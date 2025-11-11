import React from "react";

const TransactionButton = ({ label, onClick, color = "purple" }) => {
  const baseStyles =
    "flex-1 px-4 py-2 rounded-md font-medium text-white transition-colors duration-200";

  const colorClasses = {
    purple: "bg-purple-600 hover:bg-purple-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
};

export default TransactionButton;
