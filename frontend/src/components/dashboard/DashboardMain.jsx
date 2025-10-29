import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  Download,
  Percent,
  TrendingUp,
} from "lucide-react";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import InfoCard from "../card/InfoCard";
import RecentTransactions from "./RecentTransaction";
import FinancialOverview from "./FinancialOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncomes from "./RecentIncomes";

export default function DashboardMain({ darkMode }) {
  // fallback demo categories (used if API doesn't return categories)
  const fallbackCategories = [
    { name: "Food", color: "bg-red-400", value: 1000 },
    { name: "Transportation", color: "bg-blue-400", value: 200 },
    { name: "Housing", color: "bg-yellow-400", value: 3000 },
    { name: "Entertainment", color: "bg-gray-400", value: 300 },
    { name: "Shopping", color: "bg-purple-500", value: 0 },
    { name: "Test", color: "bg-sky-400", value: 0 },
  ];

  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      console.log("Dashboard data:", response.data);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  const totalIncome = dashboardData?.totalIncome ?? 0;
  const totalExpense = dashboardData?.totalExpense ?? 0;
  const totalBalance =
    dashboardData?.totalBalance ?? totalIncome - totalExpense;
  const savingsRate =
    totalIncome && totalIncome !== 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

  // categories from API if provided else fallback
  const categories = dashboardData?.categories ?? fallbackCategories;
  const maxCategoryValue = Math.max(
    1,
    ...categories.map((c) => Math.abs(Number(c.value ?? 0)))
  );

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard
          icon={TrendingUp}
          label="Total Balance"
          value={currencyFormatter.format(totalBalance)}
          color="bg-purple-500"
          darkMode={darkMode}
        />
        <InfoCard
          icon={DollarSign}
          label="Monthly Income"
          value={currencyFormatter.format(totalIncome)}
          color="bg-cyan-500"
          darkMode={darkMode}
        />

        <InfoCard
          icon={CreditCard}
          label="Monthly Expenses"
          value={currencyFormatter.format(Math.abs(totalExpense))}
          color="bg-red-500"
          darkMode={darkMode}
        />

        <InfoCard
          icon={Percent}
          label="Savings Rate"
          value={`${savingsRate}%`}
          color="bg-green-500"
          darkMode={darkMode}
        />
      </div>

      {/* Recent Transactions  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions
          darkMode={darkMode}
          transaction={dashboardData?.recentTransactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        <FinancialOverview
          darkMode={darkMode}
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        <ExpenseTransactions
          darkMode={darkMode}
          transaction={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        <Last30DaysExpenses
          darkMode={darkMode}
          data={dashboardData?.last30DaysExpenses?.transactions || []}
        />

        <RecentIncomeWithChart
          darkMode={darkMode}
          data={
            dashboardData?.last60DaysIncomes?.transactions?.slice(0, 4) || []
          }
          totalIncome={dashboardData?.totalIncome || 0}
        />

        <RecentIncomes
          darkMode={darkMode}
          transaction={dashboardData?.last60DaysIncomes?.transactions || []}
          onSeeMore={() => navigate("/income")}
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
  );
}
