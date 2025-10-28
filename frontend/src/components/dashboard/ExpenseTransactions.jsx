import React from "react";
import TransactionInfoCard from "../card/TransactionInfoCard";

const ExpenseTransactions = ({
  transaction,
  transactions,
  onSeeMore,
  darkMode,
}) => {
  const list = Array.isArray(transactions)
    ? transactions
    : Array.isArray(transaction)
    ? transaction
    : [];

  console.log("ExpenseTransactions list:", transactions);

  return (
    <div
      className={`p-4 rounded-md shadow-sm ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-lg font-semibold">Expenses</h5>
        <button
          onClick={() => onSeeMore && onSeeMore()}
          className="text-sm text-indigo-600 hover:underline"
        >
          See All
        </button>
      </div>

      <div>
        {list?.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={expense.date}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
