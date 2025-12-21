import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ColumnFilterModal from "../searchComp/ColumnFilterModal";

const InvoiceTableCommonTable = ({
  headers = [],
  rows = [],
  onEdit,
  onDelete,
  sortConfig,
  onSort,

  // 🔍 Column Search
  onColumnSearch,
  columnSearchKeys = {},

  hideAction = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState("");

  const openModal = (header) => {
    setSelectedHeader(header);
    setModalOpen(true);
  };

  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header)
      return <ChevronDown size={12} className="ml-1 text-gray-300" />;

    return sortConfig.direction === "asc" ? (
      <ChevronUp size={12} className="ml-1 text-white" />
    ) : (
      <ChevronDown size={12} className="ml-1 text-white" />
    );
  };

  return (
    <div className="relative w-full rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="max-h-[40vh] min-h-[40vh] overflow-auto scrollbar-hide">
        <table className="w-full table-auto border-collapse">
          {/* ===== HEADER ===== */}
          <thead className="bg-gray-500 text-white uppercase text-xs sticky top-0 z-20">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  className={`px-2 border border-gray-500 whitespace-nowrap
                    ${index === 0 ? "sticky left-0 bg-gray-600 z-30" : ""}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="cursor-pointer"
                      onClick={() => onSort(header)}
                    >
                      {header}
                      {getSortIcon(header)}
                    </span>

                    <button onClick={() => openModal(header)}>
                      🔍
                    </button>
                  </div>
                </th>
              ))}

              {!hideAction && (
                <th className="px-2 text-center border border-gray-500 sticky right-0 bg-gray-600 z-30">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* ===== BODY ===== */}
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {headers.map((header, colIndex) => (
                    <td
                      key={header}
                      className={`px-2 border border-gray-200 text-xs truncate
                        ${colIndex === 0 ? "sticky left-0 bg-gray-100 z-10" : ""}
                      `}
                    >
                      {row[header] === true ? (
                        <Check size={14} className="text-green-600 mx-auto" />
                      ) : row[header] === false ? (
                        <X size={14} className="text-red-500 mx-auto" />
                      ) : (
                        String(row[header] ?? "-")
                      )}
                    </td>
                  ))}

                  {!hideAction && (
                    <td className="px-2 border border-gray-200 sticky right-0 bg-gray-50 z-10">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => onEdit(row.id)}>
                          <Edit size={14} />
                        </button>
                        <button onClick={() => onDelete(row.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (!hideAction ? 1 : 0)}
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== FILTER MODAL ===== */}
      <ColumnFilterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={selectedHeader}
        onSort={onSort}
        onSearch={onColumnSearch}
        activeKeys={columnSearchKeys[selectedHeader] || []}
      />
    </div>
  );
};

export default InvoiceTableCommonTable;
