import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function LineChartComp({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2ff" />
        <XAxis dataKey="month" tick={{ fill: "#64748b" }} />
        <YAxis tick={{ fill: "#64748b" }} />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}

