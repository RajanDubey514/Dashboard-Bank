import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", users: 240 },
  { month: "Feb", users: 320 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 420 },
  { month: "May", users: 610 },
  { month: "Jun", users: 480 },
];

export default function BarChartComp() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 w-full">
      <h3 className="font-semibold text-slate-700 mb-4 text-sm md:text-base">
        User Growth
      </h3>

      <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            {/* 🧭 Grid & Axis */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />

            {/* 💬 Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            {/* 🏷 Legend */}
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: "12px", color: "#475569" }}
            />

            {/* 🎨 Bar Gradient */}
            <defs>
              <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            {/* 📊 Bars */}
            <Bar
              dataKey="users"
              fill="url(#barColor)"
              radius={[6, 6, 0, 0]}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
