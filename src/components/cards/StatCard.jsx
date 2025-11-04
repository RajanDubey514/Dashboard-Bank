import React from "react";
import AreaSparkChart from "../charts/AreaSparkChart";

export default function StatCard({ title, value, color, trend, change }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {title}
        </h3>
        <span
          className={`text-[11px] font-medium px-2 py-[1px] rounded-full ${
            change > 0
              ? "text-green-600 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {change > 0 ? `+${change}%` : `${change}%`}
        </span>
      </div>
      <h2 className="text-lg font-bold text-slate-800 mt-1">{value}</h2>
      <div className="h-10 mt-1">
        <AreaSparkChart data={trend} color={color} />
      </div>
    </div>
  );
}
