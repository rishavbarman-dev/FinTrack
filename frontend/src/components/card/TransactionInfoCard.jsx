import React from "react";
import { Trash2, TrendingDown, TrendingUp, Utensils } from "lucide-react";

export default function TransactionInfoCard({
  title,
  icon,
  date,
  amount = 0,
  type = "",
  hideDeleteBtn = false,
  onDelete,
  darkMode = false,
}) {
  const parsedDate = date ? new Date(date) : null;
  const dateLabel = parsedDate
    ? parsedDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : date || "—";

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  const isIncome = String(type).toLowerCase() === "income";
  const amountClass = isIncome ? "text-green-500" : "text-red-500";
  const AmountIcon = isIncome ? TrendingUp : TrendingDown;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors ${
        darkMode
          ? "hover:bg-gray-800 bg-gray-800 text-gray-100"
          : "hover:bg-gray-50 bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          {icon ? (
            // if icon is a string path show img else assume it's a component
            typeof icon === "string" ? (
              <img src={icon} alt={title} className="w-6 h-6 object-contain" />
            ) : (
              React.createElement(icon || Utensils, {
                className: "w-5 h-5 text-gray-700 dark:text-gray-200",
              })
            )
          ) : (
            <Utensils className="w-5 h-5 text-gray-500" />
          )}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{title}</div>
          <div
            className={`text-xs ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {dateLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className={`text-right font-semibold ${amountClass} w-32`}>
          {isIncome ? "+" : "-"}
          {currencyFormatter.format(Math.abs(Number(amount) || 0))}
        </div>

        <div className="flex items-center space-x-2">
          <AmountIcon
            className={`w-4 h-4 ${
              isIncome ? "text-green-500" : "text-red-500"
            }`}
          />
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="p-2 rounded-md text-red-600 hover:text-red-800 transition"
              aria-label="Delete transaction"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
