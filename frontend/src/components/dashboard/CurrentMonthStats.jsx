import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function CurrentMonthStats({
  darkMode,
  currentMonthIncome = 0,
  currentMonthExpense = 0,
}) {
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const netAmount = currentMonthIncome - Math.abs(currentMonthExpense);
  const isPositive = netAmount >= 0;

  // Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-xl border shadow-lg overflow-hidden mb-8`}
    >
      {/* Header */}
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-r from-blue-600 to-purple-600"
            : "bg-gradient-to-r from-blue-500 to-purple-500"
        } px-6 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">
            {currentMonth} Overview
          </h2>
        </div>
        <div
          className={`px-3 py-1 rounded-full ${
            isPositive
              ? "bg-green-500/20 text-green-100"
              : "bg-red-500/20 text-red-100"
          } flex items-center gap-1 text-sm font-medium`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {isPositive ? "Surplus" : "Deficit"}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
        {/* Income */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`p-3 rounded-lg ${
                darkMode ? "bg-green-500/10" : "bg-green-50"
              }`}
            >
              <ArrowUpRight className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Income
              </p>
              <p className={`text-2xl font-bold mt-1 text-cyan-500`}>
                {currencyFormatter.format(currentMonthIncome)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Expense */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`p-3 rounded-lg ${
                darkMode ? "bg-red-500/10" : "bg-red-50"
              }`}
            >
              <ArrowDownRight className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Expense
              </p>
              <p className={`text-2xl font-bold mt-1 text-red-500`}>
                {currencyFormatter.format(Math.abs(currentMonthExpense))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-500"
                style={{
                  width:
                    currentMonthIncome > 0
                      ? `${Math.min((Math.abs(currentMonthExpense) / currentMonthIncome) * 100, 100)}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Net */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`p-3 rounded-lg ${
                isPositive
                  ? darkMode
                    ? "bg-blue-500/10"
                    : "bg-blue-50"
                  : darkMode
                    ? "bg-orange-500/10"
                    : "bg-orange-50"
              }`}
            >
              {isPositive ? (
                <TrendingUp
                  className={`w-6 h-6 ${isPositive ? "text-blue-500" : "text-orange-500"}`}
                />
              ) : (
                <TrendingDown className="w-6 h-6 text-orange-500" />
              )}
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Net Balance
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  isPositive ? "text-blue-500" : "text-orange-500"
                }`}
              >
                {currencyFormatter.format(netAmount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isPositive
                  ? darkMode
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : darkMode
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-orange-50 text-orange-600"
              }`}
            >
              {isPositive ? "✓ On Track" : "⚠ Review Budget"}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div
        className={`${
          darkMode ? "bg-gray-900/50" : "bg-gray-50"
        } px-6 py-3 flex items-center justify-between text-sm`}
      >
        <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
          <span className="font-medium">Spending Rate: </span>
          {currentMonthIncome > 0
            ? `${Math.round((Math.abs(currentMonthExpense) / currentMonthIncome) * 100)}%`
            : "0%"}{" "}
          of income
        </div>
        <div
          className={`font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive
            ? `Saved ${currencyFormatter.format(netAmount)}`
            : `Over by ${currencyFormatter.format(Math.abs(netAmount))}`}
        </div>
      </div>
    </div>
  );
}
