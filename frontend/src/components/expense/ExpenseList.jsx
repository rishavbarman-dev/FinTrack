import React from "react";
import TransactionInfoCard from "../card/TransactionInfoCard";
import { Download, IndianRupee } from "lucide-react";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Expenses
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {transactions?.length || 0} expense{" "}
              {transactions?.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-5 py-2.5 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-600 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {transactions?.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={expense.date}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <IndianRupee className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No expense entries yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Start tracking your expenses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
