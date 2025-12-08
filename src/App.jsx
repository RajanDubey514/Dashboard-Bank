import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";

import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./layoutWraper/MainLayout";
import Settings from "./pages/Settings";

import AdminRouter from "./pages/admin/AdminRouter";   // ✅ NEW

// 🔒 PrivateRoute
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
      />

      {/* Protected */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        {/* default dashboard */}
        <Route index element={<Dashboard />} />

        {/* Single admin route */}
        <Route path="admin" element={<AdminRouter />} />

        <Route path="setting" element={<Settings />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
