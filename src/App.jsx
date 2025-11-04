import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;


