import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function DashboardMain({ darkMode }) {
  const categories = [
    { name: "Food", color: "bg-red-400", value: 0 },
    { name: "Transportation", color: "bg-blue-400", value: 0 },
    { name: "Housing", color: "bg-yellow-400", value: 0 },
    { name: "Entertainment", color: "bg-gray-400", value: 0 },
    { name: "Shopping", color: "bg-purple-500", value: 0 },
    { name: "Test", color: "bg-sky-400", value: 0 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              $0.00
            </div>
            <p className="text-sm text-green-500 mt-1 flex items-center">
              <span>↑ 0% from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-500">$0.00</div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              } mt-1`}
            >
              📅 This month
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">$0.00</div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              } mt-1`}
            >
              📅 This month
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              0%
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              } mt-1`}
            >
              % Of income
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
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
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } w-12 text-right`}
                  >
                    ${category.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card
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
        </Card>
      </div>

      {/* Export Button */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow-md">
          <Download className="w-5 h-5" />
          <span className="font-medium">Export Data</span>
        </button>
      </div>
    </main>
  );
}
