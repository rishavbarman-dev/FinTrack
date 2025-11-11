import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import TransactionButton from "../buttons/TransactionButton";

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
      <Input
        label="Category"
        value={expense.source}
        onChange={handleChange("category")}
        placeholder="Rent, Groceries, etc."
        darkMode={darkMode}
      />

      <Input
        label="Amount"
        type="number"
        step="0.01"
        value={expense.amount}
        onChange={handleChange("amount")}
        placeholder="0.00"
        darkMode={darkMode}
      />

      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={handleChange("date")}
        placeholder="dd/mm/yyyy"
        darkMode={darkMode}
      />

      <TransactionButton
        label="Add Expense"
        onClick={() => onAddExpense(expense)}
        color="purple"
      />
    </div>
  );
}
