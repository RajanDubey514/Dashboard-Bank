import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Navbar from "../components/layout/Navbar";
import StatCard from "../components/cards/StatCard";
import LineOverviewChart from "../components/charts/LineChartComp";
import PieDeviceChart from "../components/charts/PieChartComp";
import { IconButton } from "@mui/material";
import { Menu } from "lucide-react";

const statData = [
  {
    title: "Revenue",
    value: "$48,920",
    color: "#6366f1",
    trend: [{ v: 30 }, { v: 60 }, { v: 45 }, { v: 80 }, { v: 70 }],
    change: 12,
  },
  {
    title: "Active Users",
    value: "8,245",
    color: "#10b981",
    trend: [{ v: 15 }, { v: 40 }, { v: 35 }, { v: 55 }, { v: 70 }],
    change: 6,
  },
  {
    title: "Orders",
    value: "1,215",
    color: "#f59e0b",
    trend: [{ v: 10 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 50 }],
    change: -3,
  },
  {
    title: "Sessions",
    value: "22,310",
    color: "#3b82f6",
    trend: [{ v: 25 }, { v: 50 }, { v: 30 }, { v: 60 }, { v: 80 }],
    change: 9,
  },
];

const revenueData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 4200 },
  { month: "Mar", revenue: 3800 },
  { month: "Apr", revenue: 5200 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7200 },
];

const deviceData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 10 },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen overflow-hidden">
      <Sidebar open={open} onClose={() => setOpen(false)} sidebarWidth="w-45" />

      <div className="flex-1 md:ml-45 transition-all duration-300">
        {/* Top Section */}
        <div className="sticky top-0 bg-slate-50 z-30">
          <div className="md:hidden flex p-2">
            <IconButton onClick={() => setOpen(true)}>
              <Menu />
            </IconButton>
          </div>
          {/* <Topbar /> */}
          <Navbar />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 mt-3">
          {statData.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3">
          <div className="col-span-2 bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">
              Revenue Overview
            </h2>
            <div className="h-48">
              <LineOverviewChart data={revenueData} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-sm font-semibold text-slate-700 mb-2">
              User Devices
            </h2>
            <div className="h-48">
              <PieDeviceChart data={deviceData} />
            </div>
          </div>
        </div>

        {/* Footer summary */}
        <div className="px-3 pb-3 text-xs text-slate-400 text-center">
          © 2025 TPro Admin. Built with ❤️ by a 20-year React Developer.
        </div>
      </div>
    </div>
  );
}
