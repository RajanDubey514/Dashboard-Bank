import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#7c3aed", "#f97316", "#10b981"];

export default function PieChartComp({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
