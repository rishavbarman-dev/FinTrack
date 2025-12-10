/* eslint-disable react-hooks/exhaustive-deps */
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import IncomeOverview from "../income/IncomeOverview";
import Model from "../Model";
import AddIncomeForm from "../income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../income/IncomeList";
import DeleteAlert from "../DeleteAlert";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useOutletContext } from "react-router-dom";

const Income = () => {
  useUserAuth();
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const { darkMode } = useOutletContext();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //   Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const respone = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (respone.data) {
        const incomes = Array.isArray(respone.data)
          ? respone.data
          : respone.data?.incomes || respone.data?.data || [];
        setIncomeData(incomes);
      }
    } catch (error) {
      console.log("Something went wrong! Try agin", error);
    } finally {
      setLoading(false);
    }
  };

  //   Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, description, amount, date } = income;

    // Validation checks
    if (!source || !String(source).trim()) {
      toast.error("Sorce is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grater than 0.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        description,
        amount,
        date,
      });

      setOpenAddIncomeModel(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income",
        error.respone?.data?.message || error.message
      );
    }
  };

  //   Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income",
        error.respone?.data?.message || error.message
      );
    }
  };

  //   Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Income details", error);
      toast.error("Failed to download income details. Please try again later");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Income Overview  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeOverview
            darkMode={darkMode}
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModel(true)}
          />

          <IncomeList
            darkMode={darkMode}
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Model
          darkMode={darkMode}
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            initialValues={{}}
            onCancel={() => setOpenAddIncomeModel(false)}
            darkMode={darkMode}
          />
        </Model>

        <Model
          darkMode={darkMode}
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            darkMode={darkMode}
            content="Are you sure you want to delete income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert(false)}
          />
        </Model>
      </main>
    </div>
  );
};

export default Income;
