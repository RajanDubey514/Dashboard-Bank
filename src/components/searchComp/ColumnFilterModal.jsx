


import React, { useEffect, useState } from "react";
import { X, ArrowUpAZ, ArrowDownAZ, Search } from "lucide-react";

export default function ColumnFilterModal({
  isOpen,
  onClose,
  header,
  onSort,
  onSearch,        // expects (header, keysArray)
  activeKeys = [], // parent sends saved keys for this column
}) {
  const [searchText, setSearchText] = useState("");
  const [keys, setKeys] = useState([]);

  // Sync keys only when modal opens
  useEffect(() => {
    if (isOpen) {
      setKeys(activeKeys || []);
    }
  }, [isOpen, activeKeys]);

  if (!isOpen) return null;

  const addKey = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    const newKeys = [...keys, trimmed];
    setKeys(newKeys);
    onSearch(header, newKeys);   // send updated list to parent
    setSearchText("");
  };

  const removeKey = (index) => {
    const newKeys = keys.filter((_, i) => i !== index);
    setKeys(newKeys);
    onSearch(header, newKeys);   // send updated list to parent
  };

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
        <h2 className="text-xs font-semibold mb-4 text-gray-800">
          Filter Options – <span className="text-blue-600">{header}</span>
        </h2>

        {/* SORT BUTTONS */}
        <div className="space-y-3 mb-3">
          <button
            onClick={() => { onSort(header, "asc"); onClose(); }}
            className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-lg transition shadow-sm"
          >
            <ArrowUpAZ size={15} className="text-blue-600" />
            <span className="text-gray-500 text-xs">Sort A → Z</span>
          </button>

          <button
            onClick={() => { onSort(header, "desc"); onClose(); }}
            className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-lg transition shadow-sm"
          >
            <ArrowDownAZ size={15} className="text-blue-600" />
            <span className="text-gray-500 text-xs">Sort Z → A</span>
          </button>
        </div>

        {/* SEARCH INPUT */}
        <label className="text-xs text-gray-700">Search in this column</label>

        <div className="relative mt-1">
          <Search size={15} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="w-full text-xs border rounded-lg px-10 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter search & press Enter"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addKey()}
          />
        </div>

        <button
          onClick={addKey}
          className="w-full text-xs bg-blue-600 text-white rounded-lg mt-2 hover:bg-blue-700 transition shadow-md"
        >
          Add Search Key
        </button>

        {/* ACTIVE KEYS */}
        <div className="mt-3 space-y-2 max-h-32 overflow-auto">
          {keys.map((k, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-lg text-sm"
            >
              <span className="text-gray-700">{k}</span>
              <button
                onClick={() => removeKey(i)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}

