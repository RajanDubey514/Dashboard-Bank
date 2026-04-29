import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";
import ForgotPassword from "./pages/loginPage/ForgotPassword";
import ResetPassword from "./pages/loginPage/ResetPassword";

import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./layoutWraper/MainLayout";
import Settings from "./pages/Settings";

import AdminRouter from "./pages/admin/AdminRouter";
import SalesRouter from "./pages/sales/SalesRouter";
import PurchaseRouter from "./pages/parchase/PurchaseRouter";
import FinanceRouter from "./pages/finance/FinanceRouter";

import { setAuthFromToken } from "./redux/slice/auth/authSlice";

// 🔒 PrivateRoute
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// 🔓 PublicRoute (ONLY for not logged in users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthFromToken());
  }, [dispatch]);

  return (
    <Routes>

      {/* 🔓 Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password/:uid" element={<PublicRoute><ResetPassword /></PublicRoute>} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="admin" element={<AdminRouter />} />
        <Route path="sales" element={<SalesRouter />} />
        <Route path="setting" element={<Settings />} />
        <Route path="purchase" element={<PurchaseRouter />} />
        <Route path="finance" element={<FinanceRouter />} />
      </Route>

      {/* ❌ Fallback LAST me hona chahiye */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}