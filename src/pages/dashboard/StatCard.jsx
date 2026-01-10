import { ArrowUp } from "lucide-react";

export default function StatCard({ title, value, sub, positive }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
      <span className="text-sm text-gray-500">{title}</span>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-800">
          {value}
        </span>
        {positive && (
          <span className="flex items-center text-green-600 text-sm">
            <ArrowUp size={16} /> {positive}
          </span>
        )}
      </div>

      {sub && (
        <span className="text-xs text-gray-400">{sub}</span>
      )}
    </div>
  );
}
