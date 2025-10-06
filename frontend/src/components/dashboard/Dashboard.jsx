import React, { useState } from "react";
import DashboardMain from "./DashboardMain";
import {
  Home,
  ArrowLeftRight,
  PieChart,
  TrendingUp,
  Target,
  Download,
  Moon,
  Sun,
  User,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "budgets", label: "Budgets", icon: PieChart },
  { id: "reports", label: "Reports", icon: TrendingUp },
  { id: "goals", label: "Savings Goals", icon: Target },
];

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardMain darkMode={darkMode} />;
      case "transactions":
        return <div className="p-8">Transactions Content</div>;
      case "budgets":
        return <div className="p-8">Budgets Content</div>;
      case "reports":
        return <div className="p-8">Reports Content</div>;
      case "goals":
        return <div className="p-8">Savings Goals Content</div>;
      case "profile":
        return <div className="p-8">Profile Content</div>;
      case "settings":
        return <div className="p-8">Settings Content</div>;
      default:
        return <DashboardMain darkMode={darkMode} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-12 flex items-center justify-center">
                <img src={logo} alt="logo" className="w-10 h-10" />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  FinTrack
                </h1>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Smarter Tracking Better Saving
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400"
                    : "bg-gray-100 text-gray-600"
                } hover:opacity-80 transition-all`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center`}
              >
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeItem === item.id
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
