import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import IncomeOverview from "../income/IncomeOverview";

const Income = ({ darkMode }) => {
  const [openAddModel, setOpenAddIncomeModel] = useState(false);

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
  const handleAddIncome = async (income) => {};

  //   Delete Income
  const deleteIncome = async (id) => {};

  //   Handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, [fetchIncomeDetails]);

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
        </div>

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

export default Income;
