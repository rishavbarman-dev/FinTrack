import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import UserProvider from "./context/UserContext";
import Income from "./components/main-content/Income";
import { Toaster } from "react-hot-toast";
import Expense from "./components/main-content/Expense";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "14px",
            },
          }}
        />
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
