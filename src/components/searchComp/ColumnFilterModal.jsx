import React, { useState } from "react";
import { X, ArrowUpAZ, ArrowDownAZ, Search } from "lucide-react";

export default function ColumnFilterModal({
  isOpen,
  onClose,
  header,
  onSort,
  onSearch,
}) {
  const [searchText, setSearchText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white w-80 p-6 rounded-xl shadow-2xl relative animate-scaleIn">
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-2 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* TITLE */}
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          Filter Options – <span className="text-blue-600">{header}</span>
        </h2>

        {/* SORT BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={() => {
              onSort(header, "asc");
              onClose();
            }}
            className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-lg transition shadow-sm"
          >
            <ArrowUpAZ size={15} className="text-blue-600" />
            <span className="text-gray-500 text-sm">Sort A → Z</span>
          </button>

          <button
            onClick={() => {
              onSort(header, "desc");
              onClose();
            }}
            className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition shadow-sm"
          >
            <ArrowDownAZ size={15} className="text-blue-600" />
            <span className="text-gray-500 text-sm">Sort Z → A</span>
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div className="mt-2">
          <label className="text-sm text-gray-700">Search in this column</label>

          <div className="relative mt-1">
            <Search size={15} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full border rounded-lg px-10 py-1.5 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder={`Search ${header}...`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && onSearch(header, searchText)
              }
            />
          </div>

          <button
            onClick={() => onSearch(header, searchText)}
            className="w-full bg-blue-600 text-white  rounded-lg mt-2 hover:bg-blue-700 transition text-sm shadow-md"
          >
            Apply Search
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}
