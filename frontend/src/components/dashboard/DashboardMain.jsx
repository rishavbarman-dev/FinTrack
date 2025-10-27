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
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialOverview
          darkMode={darkMode}
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        {/* <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category, index) => {
                const value = Number(category.value ?? 0);
                const pct = Math.round(
                  (Math.abs(value) / maxCategoryValue) * 100
                );
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${category.color}`}
                      ></div>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                    <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${category.color}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } w-12 text-right`}
                    >
                      {currencyFormatter.format(Math.abs(value))}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card> */}

        {/* Monthly Overview */}
        {/* <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Monthly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-center space-x-12 h-64">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-32">
                  <div className="h-48 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-t-lg shadow-lg"></div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Income
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-32">
                  <div className="h-12 bg-gradient-to-t from-red-500 to-red-600 rounded-t-lg shadow-lg"></div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Expenses
                </span>
              </div>
            </div>
            <div className="text-center mt-4">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                September 25
              </span>
            </div>
          </CardContent>
        </Card> */}
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
