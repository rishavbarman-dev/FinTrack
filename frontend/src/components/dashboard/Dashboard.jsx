import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Home,
  TrendingUp,
  Moon,
  Sun,
  User,
  TrendingDown,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { UserContext } from "@/context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
  {
    id: "income",
    label: "Income",
    icon: TrendingUp,
    path: "/dashboard/income",
  },
  {
    id: "expense",
    label: "Expense",
    icon: TrendingDown,
    path: "/dashboard/expense",
  }
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
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b`}
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
                  className={`text-xs sm:text-sm font-medium ${
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
                className={`p-2 rounded-lg cursor-pointer ${
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none ring-1 cursor-pointer ${
                    darkMode
                      ? "ring-gray-700 bg-linear-to-br from-blue-600 to-blue-400"
                      : "ring-white bg-linear-to-br from-blue-400 to-blue-600"
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
                        className={`w-full text-left px-3 py-2 rounded-md cursor-pointer ${
                          darkMode ? "text-white hover:bg-red-500" : "hover:bg-red-50 hover:text-red-600 transition-colors"
                        } `}
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
        className={`fixed top-16 left-0 w-full z-40 ${
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
                  onClick={() => {
                    setActiveItem(item.id);
                    navigate(item.path);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeItem === item.id
                      ? "bg-linear-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
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
      <div className="pt-32">
        <Outlet context={{ darkMode }} />
      </div>
    </div>
  );
};

export default Dashboard;
