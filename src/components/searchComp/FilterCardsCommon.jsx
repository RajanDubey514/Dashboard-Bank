import React from "react";

export default function FilterCardsCommon({ value, onChange, options = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {options.map((item, index) => {
        const isActive = value === item.value;

        return (
          <div
            key={index}
            onClick={() => onChange(item.value)}
            className={`
              flex items-center gap-3 p-2 rounded-xl border cursor-pointer
              transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1
              ${isActive ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] scale-[1.03]" : "bg-gray-200 text-white border-gray-300"}
            `}
          >
            <div
              className={`
                p-3 rounded-xl text-lg flex items-center justify-center
                transition-all duration-300
                ${isActive ? "bg-white/90 text-white" : "bg-gray-100 text-[var(--color-primary)]"}
              `}
            >
              {item.icon}
            </div>

            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-800"}`}>
                {item.label}
              </span>
              <span className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
                {item.count} items
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
