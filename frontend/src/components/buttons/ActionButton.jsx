import React from "react";

const ActionButton = ({
  label,
  onClick,
  icon: Icon,
  color = "purple",
  gradient = true,
}) => {
  const baseStyles =
    "flex items-center justify-center space-x-2 px-6 py-3 text-sm mt-4 text-white rounded-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]";

  const colorClasses = {
    purple: gradient
      ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
      : "bg-purple-600 hover:bg-purple-700",
    red: gradient
      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
      : "bg-red-600 hover:bg-red-700",
    green: gradient
      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
      : "bg-green-600 hover:bg-green-700",
    blue: gradient
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      : "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorClasses[color]}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
