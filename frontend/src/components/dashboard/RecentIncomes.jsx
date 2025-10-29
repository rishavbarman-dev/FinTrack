import React from "react";
import TransactionInfoCard from "../card/TransactionInfoCard";

const RecentIncomes = ({
  transaction,
  transactions,
  onSeeMore,
  darkMode = false,
}) => {
  // accept either `transaction` (existing prop) or `transactions`
  const list = Array.isArray(transactions)
    ? transactions
    : Array.isArray(transaction)
    ? transaction
    : [];

  return (
    <div
      className={`p-4 rounded-md shadow-sm ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-lg font-semibold">Incomes</h5>
        <button
          onClick={() => onSeeMore && onSeeMore()}
          className="text-sm text-indigo-600 hover:underline"
        >
          See All
        </button>
      </div>

      <div className="space-y-2">
        {list.length > 0 ? (
          list.slice(0, 5).map((item) => {
            const title =
              item.type === "income"
                ? item.category
                : item.source || item.description || "Transaction";
            return (
              <TransactionInfoCard
                key={item.id ?? `${item.date}-${item.amount}`}
                title={title}
                icon={item.icon}
                date={item.date}
                amount={item.amount}
                type="income"
                hideDeleteBtn={true}
                onDelete={item.onDelete}
                darkMode={darkMode}
              />
            );
          })
        ) : (
          <div
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            No recent transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncomes;
