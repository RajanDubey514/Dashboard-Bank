import React, { useState, useEffect } from "react";
import { Pencil, Save, X, Plus } from "lucide-react";

const SubBoiTable = ({ data = [], handleSubDataUpdate, selectedUserId }) => {
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { itemName: "", code: "", quantity: "", rate: "", unit: "" },
    ]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleSubDataUpdate(selectedUserId, rows);
  };

  const handleCancel = () => {
    setRows(data);
    setIsEditing(false);
  };

  return (
    <div className="overflow-x-auto text-xs">

      {/* EDIT BUTTONS */}
      <div className="flex justify-end mb-2">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            <Pencil size={14} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              <Save size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-600 text-white rounded shadow hover:bg-gray-700"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-500 text-white uppercase">
          <tr>
            <th className="border border-gray-400 px-3 py-2">Item Name</th>
            <th className="border border-gray-400 px-3 py-2">Code</th>
            <th className="border border-gray-400 px-3 py-2">Qty</th>
            <th className="border border-gray-400 px-3 py-2">Rate</th>
            <th className="border border-gray-400 px-3 py-2">Unit</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
            >
              {["itemName", "code", "quantity", "rate", "unit"].map((field) => (
                <td key={field} className="border border-gray-300 px-3 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={row[field]}
                      onChange={(e) => handleChange(index, field, e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    String(row[field] ?? "-")
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* ADD ROW */}
          {isEditing && (
            <tr>
              <td colSpan={5} className="py-3 text-center bg-gray-50">
                <button
                  onClick={addRow}
                  className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 flex gap-1 mx-auto"
                >
                  <Plus size={14} /> Add New Item
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubBoiTable;
