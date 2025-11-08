import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function LineChartComp({ data }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-5">
      <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
          >
            {/* 🩵 Gradient Definition (MUST be inside defs) */}
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* ✨ Background Grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            {/* 🧭 Axis Styles */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />

            {/* 💬 Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
                color: "#1e293b",
              }}
            />

            {/* 📊 Smooth Gradient Line */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#revenueGradient)"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 1, fill: "#7c3aed" }}
              activeDot={{
                r: 6,
                fill: "#7c3aed",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

            {/* 📍 Legend */}
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                fontSize: "12px",
                color: "#475569",
                paddingBottom: "8px",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
