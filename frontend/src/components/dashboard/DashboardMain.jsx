/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CreditCard,
  DollarSign,
  IndianRupee,
  Percent,
  TrendingUp,
} from "lucide-react";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import InfoCard from "../card/InfoCard";
import RecentTransactions from "./RecentTransaction";
import FinancialOverview from "./FinancialOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncomes from "./RecentIncomes";
import BudgetProgress from "./BudgetProgress";
import CurrentMonthStats from "./CurrentMonthStats";

export default function DashboardMain() {
  useUserAuth();

  const navigate = useNavigate();
  const { darkMode } = useOutletContext();
  const [dashboardData, setDashboardData] = useState(null);
  const [budgetData, setBudgetData] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [budgetLoading, setBudgetLoading] = useState(true);

  const fetchDashboardData = async () => {
    setDashboardLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );
      console.log("Dashboard data:", response.data);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const fetchBudgetData = async () => {
    setBudgetLoading(true);

    try {
      const response = await axiosInstance.get(`/api/v1/budget/check`);
      console.log("Budget data:", response.data);

      if (response.data) {
        setBudgetData(response.data);
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    } finally {
      setBudgetLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchBudgetData();
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

  const currentMonthIncomes = dashboardData?.currentMonthStats.income;
  const currentMonthExpense = dashboardData?.currentMonthStats.expense;

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  if (dashboardLoading || budgetLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 animate-pulse">
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 bg-gray-200 dark:bg-gray-700 rounded-xl"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Budget Process */}
      <BudgetProgress
        darkMode={darkMode}
        initialBudget={{ amount: budgetData?.budget }}
        currentExpense={currentMonthExpense}
        onBudgetUpdate={fetchBudgetData}
      />

      {/* Current Month Stats */}
      <CurrentMonthStats
        darkMode={darkMode}
        currentMonthIncome={currentMonthIncomes}
        currentMonthExpense={currentMonthExpense}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard
          icon={TrendingUp}
          label="Overall Balance"
          value={`${currencyFormatter.format(totalBalance)}`}
          color="bg-purple-500"
          darkMode={darkMode}
        />
        <InfoCard
          icon={IndianRupee}
          label="Overall Income"
          value={currencyFormatter.format(totalIncome)}
          color="bg-cyan-500"
          darkMode={darkMode}
        />

        <InfoCard
          icon={CreditCard}
          label="Overall Expenses"
          value={currencyFormatter.format(Math.abs(totalExpense))}
          color="bg-red-500"
          darkMode={darkMode}
        />

        <InfoCard
          icon={Percent}
          label="Overall Savings Rate"
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
          onSeeMore={() => navigate("/dashboard/expense")}
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
          onSeeMore={() => navigate("/dashboard/expense")}
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
          onSeeMore={() => navigate("/dashboard/income")}
        />
      </div>
    </main>
  );
}
