import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import TransactionButton from "../buttons/TransactionButton";
import { Select } from "../ui/select";

export default function AddExpenseForm({
  initialValues = { category: "", amount: "", date: "" },
  darkMode = false,
  onAddExpense,
}) {
  const [expense, setExpense] = useState({ ...initialValues });

  useEffect(() => {
    if (!expense.date) {
      setExpense((f) => ({
        ...f,
        date: new Date().toISOString().slice(0, 10),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setExpense((f) => ({ ...f, ...initialValues }));
  }, [initialValues]);

  const handleChange = (key) => (e) =>
    setExpense((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div className="space-y-4">
      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>

        <Select
          label="Category"
          options={[
            "Rent",
            "Food & Groceries",
            "Transportation",
            "Health & Wellness",
            "Shopping & Personal Care",
            "Miscellaneous",
          ]}
          value={expense.source}
          onChange={handleChange("category")}
          placeholder="Select Expense Source"
          darkMode={darkMode}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <Input
          value={expense.description || ""}
          onChange={(e) =>
            setExpense((s) => ({ ...s, description: e.target.value }))
          }
          placeholder="Enter description"
          darkMode={darkMode}
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>
        <Input
          label="Amount"
          type="number"
          step="0.01"
          value={expense.amount}
          onChange={handleChange("amount")}
          placeholder="0.00"
          darkMode={darkMode}
        />
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <Input
          label="Date"
          type="date"
          value={expense.date}
          onChange={handleChange("date")}
          placeholder="dd/mm/yyyy"
          darkMode={darkMode}
        />
      </div>

      <TransactionButton
        label="Add Expense"
        onClick={() => onAddExpense(expense)}
        color="purple"
      />
    </div>
  );
}
