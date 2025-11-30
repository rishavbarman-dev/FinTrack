import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import { Check, Pencil, X } from "lucide-react";
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
    initialBudget?.amount?.toString() || ""
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
          "Failed to update budget. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (!initialBudget?.amount || initialBudget.amount <= 0) return;
    // only run if expense or budget changed
      if (
        prevExpense.current === currentExpense &&
        prevBudget.current === initialBudget.amount
      ) return;

      prevExpense.current = currentExpense;
      prevBudget.current = initialBudget.amount;
    if (percentUsed >= 100) {
      toast.error(
        `Budget exceeded! You've spent more than ₹${initialBudget.amount.toLocaleString()}.`
      );
    } else if (percentUsed >= 75) {
      toast(
        `Warning: You've spent ${percentUsed.toFixed(0)}% of your budget.`,
        { icon: "⚠️" }
      );
    } else if (percentUsed > 0) {
      toast.success(
        `You're at ${percentUsed.toFixed(0)}% of your monthly budget.`
      );
    }
  }, [initialBudget, currentExpense, percentUsed]);

  return (
    <Card
      className={`mb-8 shadow-md border transition-colors ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Monthly Budget Progress
          </CardTitle>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className={`w-32 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
                placeholder="Enter amount"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUpdateBudget}
                className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CardDescription
                className={darkMode ? "text-gray-400" : "text-gray-600"}
              >
                {typeof initialBudget?.amount === "number"
                  ? `${currentExpense?.toFixed?.(2) ?? "0.00"} of ₹${initialBudget.amount.toFixed(2)} spent`
                  : "No budget set yet. Please set one to start tracking your expenses."}
              </CardDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className={`h-6 w-6 ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Pencil
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {initialBudget ? (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={`${
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              className={darkMode ? "bg-gray-700" : "bg-gray-200"}
            />
            <p
              className={`text-xs text-right ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        ) : (
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
            No budget set yet. Please set one to start tracking your expenses.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
