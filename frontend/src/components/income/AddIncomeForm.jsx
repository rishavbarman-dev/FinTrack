import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import TransactionButton from "../buttons/TransactionButton";
import { useOutletContext } from "react-router-dom";
import { Select } from "../ui/select";

export default function AddIncomeForm({
  initialValues = { source: "", amount: "", description: "", date: "" },
  onAddIncome,
}) {
  const [income, setIncome] = useState({ ...initialValues });
  const { darkMode } = useOutletContext();

  useEffect(() => {
    if (!income.date) {
      setIncome((f) => ({ ...f, date: new Date().toISOString().slice(0, 10) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIncome((f) => ({ ...f, ...initialValues }));
  }, [initialValues]);

  const handleChange = (key) => (e) =>
    setIncome((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div className="space-y-4">
      {/* Source */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Source
        </label>
        <Select
          label="Source"
          options={[
            "Salary",
            "Bonus",
            "Freelance",
            "Business",
            "Investment",
            "Miscellaneous",
          ]}
          value={income.source}
          onChange={handleChange("source")}
          placeholder="Select Income Source"
          darkMode={darkMode}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <Input
          value={income.description || ""}
          onChange={handleChange("description")}
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
          type="number"
          step="0.01"
          value={income.amount}
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
          type="date"
          value={income.date}
          onChange={handleChange("date")}
          darkMode={darkMode}
        />
      </div>

      <TransactionButton
        label="Add Income"
        onClick={() => onAddIncome(income)}
        color="purple"
      />
    </div>
  );
}
