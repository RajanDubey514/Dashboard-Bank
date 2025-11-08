import React from "react";
import {
  Edit,
  Save,
  X,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const EditableTable = ({
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
  sortConfig,
  onSort,
  hideAction = false,
  hideEdit = false,
}) => {
  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header)
      return <ChevronDown size={14} className="ml-1 text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} className="ml-1 text-white" />
    ) : (
      <ChevronDown size={14} className="ml-1 text-white" />
    );
  };

  return (
    <div
      className="
        relative w-full 
        rounded-lg border border-gray-200 shadow-sm 
        bg-white 
        overflow-hidden   /* ✅ hides both scrollbars */
      "
    >
      <div
        className="
          max-h-[50vh] min-h-[50vh]
          overflow-auto   /* ✅ only this inner div can scroll if needed */
          scrollbar-hide   /* optional, hide scrollbar but allow scroll */
        "
      >
        <table className="w-full table-auto border-collapse text-sm sm:text-base">
          {/* ===== HEADER ===== */}
          <thead className="bg-gray-500 text-white uppercase text-xs sticky top-0 z-20">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  onClick={() => onSort && onSort(header)}
                  className={`px-4 py-2 text-left font-semibold tracking-wide border border-gray-500 cursor-pointer select-none whitespace-nowrap ${
                    index === 0 ? "sticky left-0 z-30 bg-gray-600" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    {getSortIcon(header)}
                  </div>
                </th>
              ))}

              {!hideAction && (
                <th className="px-4 py-2 text-center font-semibold border border-gray-500 sticky right-0 bg-gray-600  shadow-[ -4px_0_8px_rgba(0,0,0,0.2)] whitespace-nowrap z-500">
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
                      className={`px-4 py-2 border border-gray-200 text-gray-800 text-sm truncate max-w-[220px] ${
                        colIndex === 0
                          ? "sticky left-0 bg-gray-100 z-10 font-medium"
                          : ""
                      }`}
                      title={row[header]}
                    >
                      {editRowId === row.id &&
                      editableFields.includes(header) ? (
                        <input
                          type="text"
                          value={editedData[header] || ""}
                          onChange={(e) => handleChange(e, header)}
                          onKeyUp={(e) => e.key === "Enter" && handleSave()}
                          className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                        />
                      ) : row[header] === true ? (
                        <Check size={16} className="text-green-600 mx-auto" />
                      ) : row[header] === false ? (
                        <X size={16} className="text-red-500 mx-auto" />
                      ) : (
                        String(row[header] ?? "-")
                      )}
                    </td>
                  ))}

                  {!hideAction && (
                    <td className="px-3 py-1.5 text-center border border-gray-200 sticky right-0 bg-gray-50 z-10 shadow-[ -4px_0_8px_rgba(0,0,0,0.1)] whitespace-nowrap">
                      {editRowId === row.id ? (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={handleSave}
                            className="p-1.5 text-green-600 hover:text-green-800 transition"
                            title="Save"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1.5 text-red-500 hover:text-red-700 transition"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-3">
                          {!hideEdit && (
                            <div className="relative group">
                              <button
                                onClick={() => handleEdit(row.id)}
                                className="text-blue-600 hover:text-blue-800 transition"
                              >
                                <Edit size={16} />
                              </button>
                              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Edit
                              </span>
                            </div>
                          )}
                          <div className="relative group">
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              Delete
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (hideAction ? 0 : 1)}
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;
