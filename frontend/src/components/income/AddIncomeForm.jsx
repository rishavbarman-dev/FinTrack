import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function AddIncomeForm({
  initialValues = { source: "", amount: "", date: "" },
  darkMode = false,
  onAddIncome,
}) {
  const [income, setIncome] = useState({ ...initialValues });

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
      <Input
        label="Source"
        value={income.source}
        onChange={handleChange("source")}
        placeholder="Salary, Freelance, etc."
        darkMode={darkMode}
      />

      <Input
        label="Amount"
        type="number"
        step="0.01"
        value={income.amount}
        onChange={handleChange("amount")}
        placeholder="0.00"
        darkMode={darkMode}
      />

      <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={handleChange("date")}
        placeholder="dd/mm/yyyy"
        darkMode={darkMode}
      />

      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => onAddIncome(income)}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700"
        >
          Add Income
        </button>
      </div>
    </div>
  );
}
