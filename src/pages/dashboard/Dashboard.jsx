import React from "react";
import StatCard from "../../components/cards/StatCard";
import LineOverviewChart from "../../components/charts/LineChartComp";
import PieDeviceChart from "../../components/charts/PieChartComp";

const statData = [
  {
    title: "Revenue",
    value: "$48,920",
    color: "var(--color-primary)",
    trend: [{ v: 30 }, { v: 60 }, { v: 45 }, { v: 80 }, { v: 70 }],
    change: 12,
  },
  {
    title: "Active Users",
    value: "8,245",
    color: "var(--color-success)",
    trend: [{ v: 15 }, { v: 40 }, { v: 35 }, { v: 55 }, { v: 70 }],
    change: 6,
  },
  {
    title: "Orders",
    value: "1,215",
    color: "var(--color-warning)",
    trend: [{ v: 10 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 50 }],
    change: -3,
  },
  {
    title: "Sessions",
    value: "22,310",
    color: "var(--color-secondary)",
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
    <div className="p-2 md:p-4 space-y-4 overflow-hidden"
      style={{ color: "var(--color-text)" }}
    >
      {/* Stat Cards */}
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

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Revenue Overview Card */}
        <div
          className="flex-1 p-3 md:p-4 rounded-xl transition-all duration-300"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-text-light)",
            boxShadow: "var(--shadow)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Revenue Overview
          </h2>

          <div className="h-44 sm:h-56 md:h-64">
            <LineOverviewChart
              data={revenueData}
              strokeColor="var(--color-primary)"
              fillColor="var(--color-primary)"
            />
          </div>
        </div>

        {/* Device Chart Card */}
        <div
          className="flex-1 lg:max-w-[35%] p-3 md:p-4 rounded-xl transition-all duration-300"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-text-light)",
            boxShadow: "var(--shadow)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            User Devices
          </h2>

          <div className="h-44 sm:h-56 md:h-64">
            <PieDeviceChart
              data={deviceData}
              colors={[
                "var(--color-primary)",
                "var(--color-secondary)",
                "var(--color-warning)",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
