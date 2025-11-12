import React, { useContext, useEffect, useRef, useState } from "react";
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
  TrendingDown,
  Receipt,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import Transactions from "../main-content/Transactions";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import Income from "../main-content/Income";
import Expense from "../main-content/Expense";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "income", label: "Income", icon: TrendingUp },
  { id: "expense", label: "Expense", icon: TrendingDown },
  { id: "reports", label: "Reports", icon: Receipt },
];

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const { user, clearUser } = useContext(UserContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // close menu on outside click or on route change
  useEffect(() => {
    const handleOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser && clearUser();
    setShowUserMenu(false);
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardMain darkMode={darkMode} />;
      case "income":
        return <Income darkMode={darkMode} />;
      case "expense":
        return <Expense darkMode={darkMode} />;
      case "reports":
        return <div className="p-8">Reports Content</div>;
      // case "goals":
      //   return <div className="p-8">Savings Goals Content</div>;
      // case "profile":
      //   return <div className="p-8">Profile Content</div>;
      // case "settings":
      //   return <div className="p-8">Settings Content</div>;
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

              {/* User avatar + menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu((s) => !s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none ring-1 ${
                    darkMode
                      ? "ring-gray-700 bg-gradient-to-br from-blue-600 to-blue-400"
                      : "ring-white bg-gradient-to-br from-blue-400 to-blue-600"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={showUserMenu}
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                {showUserMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="px-4 py-3">
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user?.firstName || user?.firstName || "User"}{" "}
                        {user?.lastName || user?.lastName || "User"}
                      </p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {user?.email || "no-email@example.com"}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-2 border-t ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
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
