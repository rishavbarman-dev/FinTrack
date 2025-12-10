import React from "react";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useOutletContext } from "react-router-dom";

export default function TransactionInfoCard({
  title,
  description = "",
  date,
  amount = 0,
  type = "",
  hideDeleteBtn = false,
  onDelete,
}) {
  const { darkMode } = useOutletContext();
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
      className={`group relative flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 border ${
        darkMode
          ? "hover:bg-gray-750 bg-gray-800 text-gray-100 border-gray-700/50 hover:border-gray-600"
          : "hover:bg-gray-50 bg-white text-gray-900 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Subtle accent bar on left */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-12 rounded-r-full transition-all duration-300 ${
          isIncome ? "bg-green-500" : "bg-red-500"
        }`}
      />

      <div className="flex items-center space-x-4 min-w-0">
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{title}</div>

          {description && (
            <div
              className={`text-xs truncate mt-0.5 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {description}
            </div>
          )}

          <div
            className={`text-xs mt-1 flex items-center gap-1 ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {dateLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div
          className={`text-right font-bold ${amountClass} w-32 text-base tracking-tight`}
        >
          {isIncome ? "+" : "-"}
          {currencyFormatter.format(Math.abs(Number(amount) || 0))}
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              isIncome
                ? "bg-green-500/10 group-hover:bg-green-500/20"
                : "bg-red-500/10 group-hover:bg-red-500/20"
            }`}
          >
            <AmountIcon
              className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                isIncome ? "text-green-500" : "text-red-500"
              }`}
            />
          </div>
          {!hideDeleteBtn && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "hover:bg-red-500/10 text-gray-500 hover:text-red-400"
                  : "hover:bg-red-50 text-gray-400 hover:text-red-600"
              }`}
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
