import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function AreaSparkChart({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
