import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserContext";
import NotFound from "./pages/NotFound";
import GlobalLoader from "./utils/GlobalLoader";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "./utils/apiPaths";

const Login = React.lazy(() => import("./components/Login"));
const Signup = React.lazy(() => import("./components/Signup"));
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const DashboardMain = React.lazy(
  () => import("./components/dashboard/DashboardMain"),
);
const Income = React.lazy(() => import("./components/main-content/Income"));
const Expense = React.lazy(() => import("./components/main-content/Expense"));

const App = () => {
  // Backend pre-warm (hides Render cold start)
  useEffect(() => {
    fetch(`${BASE_URL}/health`).catch(() => {});
  }, []);

  return (
    <UserProvider>
      <Suspense fallback={<GlobalLoader />}>
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
      </Suspense>

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
