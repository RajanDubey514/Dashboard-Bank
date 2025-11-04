import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layoutWraper/MainLayout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      {/* All pages share MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
