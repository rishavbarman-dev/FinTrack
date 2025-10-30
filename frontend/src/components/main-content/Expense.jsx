import { useUserAuth } from "@/hooks/useUserAuth";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ExpenseOverview from "../expense/ExpenseOverview";
import Model from "../Model";
import AddExpenseForm from "../expense/AddExpenseForm";
import ExpenseList from "../expense/ExpenseList";
import DeleteAlert from "../DeleteAlert";

const Expense = ({ darkMode }) => {
  useUserAuth();
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //   Get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const respone = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (respone.data) {
        const expenses = Array.isArray(respone.data)
          ? respone.data
          : respone.data?.expenses || respone.data?.data || [];
        setExpenseData(expenses);
      }
    } catch (error) {
      console.log("Something went wrong! Try agin", error);
    } finally {
      setLoading(false);
    }
  };

  //   Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date } = expense;

    // Validation checks
    if (!category || !String(category).trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grater than 0.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
      });

      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense",
        error.respone?.data?.message || error.message
      );
    }
  };

  //   Delete Income
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense",
        error.respone?.data?.message || error.message
      );
    }
  };

  //   Handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details", error);
      toast.error("Failed to download expense details. Please try again later");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Income Overview  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseOverview
            darkMode={darkMode}
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModel(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Model
          darkMode={darkMode}
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            initialValues={{}}
            onCancel={() => setShowAddModal(false)}
            darkMode={darkMode}
          />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete expense details?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setShowAlert(false)}
          />
        </Model>

        {/* Export Button */}
        {/* <div className="mt-8 flex justify-center">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow-md">
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Data</span>
        </button>
      </div> */}
      </main>
    </div>
  );
};

export default Expense;
