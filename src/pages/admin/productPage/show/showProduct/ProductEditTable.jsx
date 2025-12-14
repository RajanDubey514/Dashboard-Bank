import React, { useState } from "react";
import {
  Edit,
  X,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,Eye
} from "lucide-react";

import ColumnFilterModal from "../../../../../components/searchComp/ColumnFilterModal";

const ProductEditTable = ({
  headers = [],
  rows = [],
  editRowId,
  editedData,
  handleEdit,
  handleSave,
  handleCancel,
  handleChange,
  editableFields = [],
  handleDelete,
   handleView,
  sortConfig,
  onSort,

  // 🔥 FIXED: keep only ONE onColumnSearch
  onColumnSearch,

  // 🔥 Added proper default
  columnSearchKeys = {},

  hideAction = false,
  hideEdit = false,
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
                  key={index}
                  className={`relative px-1.5 text-xs font-semibold border border-gray-500 whitespace-nowrap 
                    ${index === 0 ? "sticky left-0 bg-gray-600 z-30" : ""}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{header}</span>

                    <button className="rounded" onClick={() => openModal(header)}>
                      {getSortIcon(header)}
                    </button>
                  </div>
                </th>
              ))}

              {!hideAction && (
                <th className="px-1.5 text-center text-xs font-semibold border border-gray-500 sticky right-0 bg-gray-600 z-50">
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
                  className={`${
                    rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-1.5 border border-gray-200 text-gray-800 text-xs truncate max-w-[220px] 
                        ${colIndex === 0 ? "sticky left-0 bg-gray-100 z-10" : ""}
                      `}
                      title={row[header]}
                    >
                      {row[header] === true ? (
                        <Check size={16} className="text-green-600 mx-auto" />
                      ) : row[header] === false ? (
                        <X size={16} className="text-red-500 mx-auto" />
                      ) : (
                        String(row[header] ?? "-")
                      )}
                    </td>
                  ))}

                  {!hideAction && (
                    <td className="px-1.5 text-center border border-gray-200 sticky text-xs right-0 bg-gray-50 z-10">
  <div className="flex justify-center gap-2">
    {/* VIEW */}
    <button
      onClick={() => handleView(row)}
      className="text-gray-600 hover:text-gray-800"
      title="View"
    >
      <Eye size={15} />
    </button>

    {/* EDIT */}
    {!hideEdit && (
      <button
        onClick={() => handleEdit(row.id)}
        className="text-blue-600 hover:text-blue-800"
        title="Edit"
      >
        <Edit size={15} />
      </button>
    )}

    {/* DELETE */}
    <button
      onClick={() => handleDelete(row.id)}
      className="text-red-600 hover:text-red-800"
      title="Delete"
    >
      <Trash2 size={15} />
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

      {/* ===== MODAL ===== */}
      <ColumnFilterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={selectedHeader}
        onSort={onSort}
        onSearch={(header, keys) => onColumnSearch(header, keys)}
        activeKeys={columnSearchKeys[selectedHeader] || []}
      />
    </div>
  );
};

export default ProductEditTable;

