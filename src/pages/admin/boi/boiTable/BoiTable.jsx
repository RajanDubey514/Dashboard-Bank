import React, { useState } from "react";
import { Pencil, Save, Check, X, Trash2 } from "lucide-react";

import Modal from "../../../../components/modalComp/ModalCom";
import SubBoiTable from "./SubBoiTable";
import ConsumableSubTable from "./ConsumableSubTable";

const BoiTable = ({
  headers,
  rows,
  editRowId,
  editedData,
  handleEdit,
  handleSave,
  handleCancel,
  handleChange,
  editableFields = [],
  handleArchive,
  handleSubDataUpdate,
  hideEdit = false,
  hideAction = false,
  productOptions = [],
}) => {
  // -----------------------
  // Modal States
  // -----------------------
  const [isConsumableModalOpen, setIsConsumableModalOpen] = useState(false);
  const [isManufacturingModalOpen, setIsManufacturingModalOpen] = useState(false);

  const [selectedOtherData, setSelectedOtherData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // -----------------------
  // Open Correct Component
  // -----------------------
  const handleShowOtherData = (data, userId, type) => {
    setSelectedOtherData(data);
    setSelectedUserId(userId);

    if (type === "consumable") {
      setIsConsumableModalOpen(true);
    } else {
      setIsManufacturingModalOpen(true);
    }
  };

  const flattenRow = (row) => {
    if (!row || typeof row !== "object") return {};
    const flat = {};
    Object.keys(row).forEach((key) => (flat[key] = row[key]));
    return flat;
  };

  return (
    <div className="relative w-full rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="max-h-[40vh] min-h-[40vh] overflow-auto scrollbar-hide">

        {/* ================= TABLE ================= */}
        <table className="w-full table-auto border-collapse text-xs">

          {/* ===== HEADER ===== */}
          <thead className="bg-gray-500 text-white uppercase text-xs sticky top-0 z-20">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-1.5 py-2 border border-gray-500 font-semibold whitespace-nowrap
                    ${index === 0 ? "sticky left-0 bg-gray-600 z-30" : ""}`}
                >
                  {header}
                </th>
              ))}

              {!hideAction && (
                <th className="px-1.5 py-2 text-center border border-gray-500 font-semibold sticky right-0 bg-gray-600 z-40">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* ===== BODY ===== */}
          <tbody>
            {rows?.length > 0 ? (
              rows.map((originalRow, rowIndex) => {
                const row = flattenRow(originalRow);
                const rowKey = row.id ?? row.UserId ?? rowIndex;

                return (
                  <tr
                    key={rowKey}
                    className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-1.5 py-1 border border-gray-200 text-gray-800 truncate max-w-[220px]
                          ${colIndex === 0 ? "sticky left-0 bg-gray-100 z-10" : ""}`}
                        title={String(row[header])}
                      >

                        {/* ========== Show Details for OBJECT columns ========== */}
                        {typeof row[header] === "object" && row[header] !== null ? (
                          <button
                            onClick={() =>
                              handleShowOtherData(
                                row[header],
                                row.UserId,
                                header.toLowerCase().includes("consumable")
                                  ? "consumable"
                                  : "manufacturing"
                              )
                            }
                            className="text-blue-600 underline hover:text-blue-800 text-xs"
                          >
                            Show Details
                          </button>
                        ) : editRowId === row.id &&
                          editableFields.includes(header) ? (
                          /* ===== Edit Mode Inputs ===== */
                          header === "productName" ? (
                            <select
                              value={editedData.productName ?? row.productName ?? ""}
                              onChange={(e) => handleChange(e, "productName")}
                              className="w-full p-1 border border-gray-300 rounded text-xs"
                            >
                              <option value="">Select Product</option>
                              {productOptions.map((opt) => (
                                <option key={opt.productCode} value={opt.productName}>
                                  {opt.productName}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={editedData[header] ?? String(row[header] ?? "")}
                              onChange={(e) => handleChange(e, header)}
                              onKeyUp={(e) => e.key === "Enter" && handleSave()}
                              className="w-full p-1 border border-gray-300 rounded text-xs"
                            />
                          )
                        ) : row[header] === true ? (
                          <Check size={16} className="text-green-600 mx-auto" />
                        ) : row[header] === false ? (
                          <X size={16} className="text-red-500 mx-auto" />
                        ) : (
                          String(row[header] ?? "-")
                        )}
                      </td>
                    ))}

                    {/* ===== ACTION BUTTONS ===== */}
                    {!hideAction && (
                      <td className="px-1.5 py-1 text-center border border-gray-200 sticky right-0 bg-gray-50 z-10">
                        {editRowId === row.id ? (
                          <div className="flex justify-center gap-2">
                            <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                              <Save size={16} />
                            </button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-800">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-3">
                            {!hideEdit && (
                              <button
                                onClick={() => handleEdit(row.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Pencil size={16} />
                              </button>
                            )}

                            <button
                              onClick={() => handleArchive(row.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
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

      {/* ================================================== */}
      {/* =============  CONSUMABLE MODAL  ================= */}
      {/* ================================================== */}
      {isConsumableModalOpen && (
        <Modal
          isOpen={isConsumableModalOpen}
          onClose={() => setIsConsumableModalOpen(false)}
          title="Consumable Material Details"
          content={
            <ConsumableSubTable
              data={selectedOtherData}
              selectedUserId={selectedUserId}
              handleSubDataUpdate={handleSubDataUpdate}
            />
          }
        />
      )}

      {/* ================================================== */}
      {/* ============  MANUFACTURING MODAL  =============== */}
      {/* ================================================== */}
      {isManufacturingModalOpen && (
        <Modal
          isOpen={isManufacturingModalOpen}
          onClose={() => setIsManufacturingModalOpen(false)}
          title="Manufacturing Material Details"
          content={
            <SubBoiTable
              data={selectedOtherData}
              selectedUserId={selectedUserId}
              handleSubDataUpdate={handleSubDataUpdate}
            />
          }
        />
      )}
    </div>
  );
};

export default BoiTable;
