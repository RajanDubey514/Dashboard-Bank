import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup"; // ✅ Added Signup Page
import Dashboard from "./pages/Dashboard";
import CustomerUrl from "./pages/salesPage/CustomerUrl";
import MainLayout from "./layoutWraper/MainLayout";
import Settings from "./pages/Settings";
import ShowProduct from "./pages/productPage/showProduct/ShowProduct";

// 🔒 PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      {/* 🔓 Public routes */}
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Login setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/signup"
        element={
          !isLoggedIn ? (
            <Signup />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* 🔒 Protected routes under MainLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        {/* Nested routes inside layout */}
        <Route index element={<Dashboard />} />
        <Route path="/sale-add" element={<CustomerUrl />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/product" element={<ShowProduct />}/>
      </Route>

      {/* 🔁 Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
