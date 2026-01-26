import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import {
  Check,
  Pencil,
  X,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Input } from "../ui/input";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

export default function BudgetProgress({
  initialBudget,
  currentExpense,
  onBudgetUpdate,
  darkMode,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || "",
  );
  const prevExpense = useRef(currentExpense);
  const prevBudget = useRef(initialBudget?.amount);
  const percentUsed = initialBudget
    ? (currentExpense / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const parsedBudget = parseFloat(newBudget);

    if (!parsedBudget || isNaN(parsedBudget) || parsedBudget <= 0) {
      toast.error("Please enter a valid budget amount greater than 0.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.BUDGET.SET_BUDGET, {
        amount: parsedBudget,
      });

      toast.success(response.data?.message || "Budget updated successfully.");
      onBudgetUpdate?.(response.data?.budget);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update budget. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (!initialBudget?.amount || initialBudget.amount <= 0) return;
    if (
      prevExpense.current === currentExpense &&
      prevBudget.current === initialBudget.amount
    )
      return;

    prevExpense.current = currentExpense;
    prevBudget.current = initialBudget.amount;

    if (percentUsed >= 100) {
      toast.error(
        `Budget exceeded! You've spent more than ₹${initialBudget.amount.toLocaleString()}.`,
      );
    } else if (percentUsed >= 75) {
      toast(
        `Warning: You've spent ${percentUsed.toFixed(0)}% of your budget.`,
        { icon: "⚠️" },
      );
    } else if (percentUsed > 0) {
      toast.success(
        `You're at ${percentUsed.toFixed(0)}% of your monthly budget.`,
      );
    }
  }, [initialBudget, currentExpense, percentUsed]);

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const remaining = initialBudget?.amount
    ? initialBudget.amount - currentExpense
    : 0;
  const isOverBudget = percentUsed >= 100;
  const isWarning = percentUsed >= 75 && percentUsed < 100;
  const isGood = percentUsed < 75;

  return (
    <div
      className={`mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl transition-all duration-300 ${
        darkMode
          ? "bg-linear-to-br from-gray-800 via-gray-800 to-gray-900"
          : "bg-linear-to-br from-white via-white to-gray-50"
      }`}
    >
      {/* Header Section */}
      <div
        className={`relative overflow-hidden ${
          isOverBudget
            ? "bg-linear-to-r from-red-600 to-red-500"
            : isWarning
              ? "bg-linear-to-r from-amber-600 to-orange-500"
              : "bg-linear-to-r from-blue-600 to-purple-600"
        } px-4 sm:px-6 py-4 sm:py-5`}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20px 20px, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                Monthly Budget Tracker
                {isGood && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                {isWarning && (
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                {isOverBudget && (
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                )}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                {isOverBudget
                  ? "Budget exceeded - review spending"
                  : isWarning
                    ? "Approaching budget limit"
                    : "Track your spending progress"}
              </p>
            </div>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 w-full sm:w-auto">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full sm:w-36 h-9 bg-white/95 border-0 text-gray-900 font-semibold shadow-sm text-sm"
                placeholder="Enter amount"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUpdateBudget}
                className="h-9 w-9 bg-green-500/20 hover:bg-green-500/30 text-white transition-all shrink-0 cursor-pointer"
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="h-9 w-9 bg-red-500/20 hover:bg-red-500/30 text-white transition-all shrink-0 cursor-pointer"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
            >
              <Pencil className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Edit Budget
            </Button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {initialBudget?.amount ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Budget Set
                </p>
                <p
                  className={`text-lg sm:text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currencyFormatter.format(initialBudget.amount)}
                </p>
              </div>

              <div
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Spent
                </p>
                <p
                  className={`text-lg sm:text-xl font-bold ${
                    isOverBudget
                      ? "text-red-500"
                      : isWarning
                        ? "text-amber-500"
                        : "text-green-500"
                  }`}
                >
                  {currencyFormatter.format(currentExpense)}
                </p>
              </div>

              <div
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {isOverBudget ? "Over By" : "Remaining"}
                </p>
                <p
                  className={`text-lg sm:text-xl font-bold ${
                    isOverBudget
                      ? "text-red-500"
                      : darkMode
                        ? "text-blue-400"
                        : "text-blue-600"
                  }`}
                >
                  {currencyFormatter.format(Math.abs(remaining))}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Budget Usage
                </span>
                <span
                  className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full ${
                    isOverBudget
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : isWarning
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  {percentUsed.toFixed(1)}%
                </span>
              </div>

              <div className="relative">
                <Progress
                  value={Math.min(percentUsed, 100)}
                  extraStyles={`transition-all duration-500 ${
                    isOverBudget
                      ? "bg-red-500"
                      : isWarning
                        ? "bg-amber-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                  className={`h-2.5 sm:h-3 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                />
                {isOverBudget && (
                  <div className="absolute top-0 left-0 w-full h-2.5 sm:h-3 bg-red-500/20 animate-pulse rounded-full" />
                )}
              </div>

              {/* Status Message */}
              <div
                className={`flex items-start sm:items-center gap-2 p-2.5 sm:p-3 rounded-lg ${
                  isOverBudget
                    ? "bg-red-50 dark:bg-red-900/20"
                    : isWarning
                      ? "bg-amber-50 dark:bg-amber-900/20"
                      : "bg-green-50 dark:bg-green-900/20"
                }`}
              >
                {isGood && (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5 sm:mt-0" />
                )}
                {isWarning && (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                )}
                {isOverBudget && (
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5 sm:mt-0" />
                )}

                <p
                  className={`text-xs font-medium leading-relaxed ${
                    isOverBudget
                      ? "text-red-700 dark:text-red-300"
                      : isWarning
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-green-700 dark:text-green-300"
                  }`}
                >
                  {isOverBudget
                    ? `You've exceeded your budget by ${currencyFormatter.format(Math.abs(remaining))}. Consider reviewing your expenses.`
                    : isWarning
                      ? `You're using ${percentUsed.toFixed(0)}% of your budget. Be mindful of upcoming expenses.`
                      : `Great! You have ${currencyFormatter.format(remaining)} left to spend this month.`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-6 sm:py-8 px-4 rounded-xl border-2 border-dashed ${
              darkMode
                ? "border-gray-700 bg-gray-800/50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <Target
              className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
            <p
              className={`text-base sm:text-lg font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No Budget Set Yet
            </p>
            <p
              className={`text-xs sm:text-sm mb-4 ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Set a monthly budget to start tracking your expenses effectively
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base w-full sm:w-auto"
            >
              <Target className="w-4 h-4 mr-2" />
              Set Your Budget
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
