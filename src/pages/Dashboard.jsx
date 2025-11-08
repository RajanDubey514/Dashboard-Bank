import React from "react";
import StatCard from "../components/cards/StatCard";
import LineOverviewChart from "../components/charts/LineChartComp";
import PieDeviceChart from "../components/charts/PieChartComp";

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
  return (
    <div className="p-2 md:p-4 space-y-4 overflow-hidden">
      {/* 🔹 Stat Cards Section */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {statData.map((s, i) => (
          <div
            key={i}
            className="w-[48%] sm:w-[45%] md:w-[22%] lg:w-[23%] min-w-[150px]"
          >
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* 🔸 Charts Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Revenue Overview */}
        <div className="flex-1 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
         
          <div className="h-44 sm:h-56 md:h-64">
            <LineOverviewChart data={revenueData} />
          </div>
        </div>

        {/* User Devices */}
        <div className="flex-1 lg:max-w-[35%] bg-white p-3 md:p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
         
          <div className="h-44 sm:h-56 md:h-64">
            <PieDeviceChart data={deviceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
