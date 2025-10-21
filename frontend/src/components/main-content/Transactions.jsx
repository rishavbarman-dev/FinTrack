import React, { useState } from "react";
import { Edit2, Trash2, Plus, Utensils, Wallet, X } from "lucide-react";

export default function Transactions({ darkMode }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  //   demo data for transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "Sep 23, 2025",
      description: "Pizza",
      category: "Food",
      type: "Expense",
      amount: -500.0,
    },
    {
      id: 2,
      date: "Sep 10, 2025",
      description: "Salary",
      category: "Income",
      type: "Income",
      amount: 5000.0,
    },
  ]);

  const [filters, setFilters] = useState({
    type: "All",
    category: "All Categories",
    month: "All Months",
  });

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "Food",
    type: "Expense",
    amount: "",
  });

  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Shopping",
    "Income",
    "Salary",
    "Other",
  ];

  // Add transaction
  const handleAddTransaction = () => {
    if (
      newTransaction.description &&
      newTransaction.amount &&
      newTransaction.date
    ) {
      const transaction = {
        id: Date.now(),
        date: new Date(newTransaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description: newTransaction.description,
        category: newTransaction.category,
        type: newTransaction.type,
        amount:
          newTransaction.type === "Expense"
            ? -Math.abs(parseFloat(newTransaction.amount))
            : Math.abs(parseFloat(newTransaction.amount)),
      };
      setTransactions([transaction, ...transactions]);
      setShowAddModal(false);
      setNewTransaction({
        date: "",
        description: "",
        category: "Food",
        type: "Expense",
        amount: "",
      });
    }
  };

  // Handle Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditTransaction({
      ...transaction,
      amount: Math.abs(transaction.amount),
      date: new Date(transaction.date).toISOString().split("T")[0], // format for input[type="date"]
    });
    setShowEditModal(true);
  };

  // Update transaction
  const handleUpdateTransaction = () => {
    if (
      editTransaction.description &&
      editTransaction.amount &&
      editTransaction.date
    ) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editTransaction.id
            ? {
                ...editTransaction,
                amount:
                  editTransaction.type === "Expense"
                    ? -Math.abs(parseFloat(editTransaction.amount))
                    : Math.abs(parseFloat(editTransaction.amount)),
                date: new Date(editTransaction.date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                ),
              }
            : t
        )
      );
      setShowEditModal(false);
      setEditTransaction(null);
    }
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-purple-600">Transactions</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option>All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Month
            </label>
            <select
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option>All Months</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg overflow-hidden`}
        >
          {/* Table Header */}
          <div className="bg-purple-50 dark:bg-gray-700 px-6 py-4 grid grid-cols-6 gap-4 font-semibold text-purple-600 dark:text-purple-400">
            <div>Date</div>
            <div>Description</div>
            <div>Category</div>
            <div>Type</div>
            <div>Amount</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`px-6 py-4 grid grid-cols-6 gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                <div className="font-medium">{transaction.date}</div>
                <div>{transaction.description}</div>
                <div className="flex items-center space-x-2">
                  {transaction.category === "Food" && (
                    <Utensils className="w-4 h-4" />
                  )}
                  {transaction.category === "Income" && (
                    <Wallet className="w-4 h-4" />
                  )}
                  <span>{transaction.category}</span>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.type === "Expense"
                        ? "text-red-600 bg-red-50 dark:bg-red-900/20"
                        : "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>
                <div
                  className={`font-bold ${
                    transaction.amount < 0 ? "text-red-600" : "text-cyan-600"
                  }`}
                >
                  {transaction.amount < 0 ? "-" : "+"}₹
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleEditTransaction(transaction)}
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showAddModal && (
          <div className="fixed backdrop-blur-xs inset-0 flex items-center justify-center z-50 p-4">
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-xl max-w-md w-full p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Add Transaction
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        date: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter description"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Type
                  </label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Category
                  </label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    step="0.01"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTransaction}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Transaction Modal */}
        {showEditModal && editTransaction && (
          <div className="fixed backdrop-blur-xs inset-0 flex items-center justify-center z-50 p-4">
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-xl max-w-md w-full p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Edit Transaction
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditTransaction(null);
                  }}
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={editTransaction.date}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        date: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={editTransaction.description}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter description"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Type
                  </label>
                  <select
                    value={editTransaction.type}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        type: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Category
                  </label>
                  <select
                    value={editTransaction.category}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        category: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    value={editTransaction.amount}
                    onChange={(e) =>
                      setEditTransaction({
                        ...editTransaction,
                        amount: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    step="0.01"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditTransaction(null);
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTransaction}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Update Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
