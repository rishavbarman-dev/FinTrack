import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import UserProvider from "./context/UserContext";
import Income from "./components/main-content/Income";
import { Toaster } from "react-hot-toast";
import Expense from "./components/main-content/Expense";
import DashboardMain from "./components/dashboard/DashboardMain";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardMain />} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        </Routes>

        <Toaster position="top-right" reverseOrder={false} />
      </UserProvider>
    </>
  );
};

export default App;

const Root = () => {
  // check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
