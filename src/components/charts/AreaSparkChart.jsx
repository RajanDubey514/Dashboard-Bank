import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function AreaSparkChart({
  data = [],
  color = "#7c3aed",
  showTooltip = false,
  showGrid = false,
  height = 60,
}) {
  const gradientId = `grad-${color.replace("#", "")}`;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
        >
          {/* 🌈 Gradient */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* 🧭 Optional grid and axis for debugging */}
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {showGrid && (
            <>
              <XAxis dataKey="x" hide />
              <YAxis hide />
            </>
          )}

          {/* 📈 Main Area */}
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />

          {/* 💬 Optional Tooltip */}
          {showTooltip && (
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#475569" }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
