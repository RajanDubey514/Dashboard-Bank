import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", users: 240 },
  { month: "Feb", users: 320 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 420 },
  { month: "May", users: 610 },
  { month: "Jun", users: 480 },
];

const BarChartComp = () => (
  <div className="bg-white p-4 rounded-xl shadow-md w-full h-80">
    <h3 className="font-semibold mb-4 text-gray-700">User Growth</h3>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#16a34a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComp;
