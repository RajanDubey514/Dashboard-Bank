import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function PieChartComp({ data }) {
  return (
    <div className="w-full bg-white rounded-xl flex flex-col items-center justify-center">
      <div className="w-full h-[200px] sm:h-[240px] md:h-[280px] flex items-center justify-center">
        <ResponsiveContainer width="95%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              dataKey="value"
              nameKey="name"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={3}
              stroke="#fff"
              strokeWidth={2}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
                color: "#334155",
              }}
            />

            {/* Legend */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                color: "#475569",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
