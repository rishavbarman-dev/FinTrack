import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import UserProvider from "./context/UserContext";
import Income from "./components/main-content/Income";
import Expense from "./components/main-content/Expense";
import DashboardMain from "./components/dashboard/DashboardMain";
import NotFound from "./pages/NotFound";
import GlobalLoader from "./utils/GlobalLoader";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GlobalLoader />; // Corrected

  return (
    <UserProvider>
      <Routes>
        {/* Root redirect based on auth */}
        <Route path="/" element={<Root />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardMain />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </UserProvider>
  );
};

export default App;

// Root redirect component
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
