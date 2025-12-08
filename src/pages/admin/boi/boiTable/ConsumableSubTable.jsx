import React, { useState, useEffect } from "react";
import { Pencil, Save, X, Plus } from "lucide-react";
import { fakeMaterialList } from "../../../../components/FakeData";

export default function ConsumableSubTable({
  data = [],
  selectedUserId,
  handleSubDataUpdate,
}) {
  const emptyRow = {
    ItemName: "",
    ItemCode: "",
    Qty: "",
    Rate: "",
    Unit: "",
  };

  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // FIX: Normalize incoming data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const normalized = data.map((row) => ({
        ItemName: row.ItemName || row.itemName || "",
        ItemCode: row.ItemCode || row.code || "",
        Qty: row.Qty || row.quantity || "",
        Rate: row.Rate || row.rate || "",
        Unit: row.Unit || row.unit || "",
      }));
      setRows(normalized);
    }
  }, [data]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const onSelectItemName = (index, value) => {
    const m = fakeMaterialList.find((x) => x.materialName === value);
    const updated = [...rows];

    updated[index].ItemName = m?.materialName || "";
    updated[index].ItemCode = m?.materialCode || "";

    setRows(updated);
  };

  const onSelectItemCode = (index, value) => {
    const m = fakeMaterialList.find((x) => x.materialCode === value);
    const updated = [...rows];

    updated[index].ItemName = m?.materialName || "";
    updated[index].ItemCode = m?.materialCode || "";

    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { ...emptyRow }]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleSubDataUpdate(selectedUserId, rows);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setRows(data);
  };

  return (
    <div className="overflow-x-auto text-xs">

      {/* EDIT / SAVE / CANCEL BUTTONS */}
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
            <th className="border px-3 py-2">Item Name</th>
            <th className="border px-3 py-2">Item Code</th>
            <th className="border px-3 py-2">Qty</th>
            <th className="border px-3 py-2">Rate</th>
            <th className="border px-3 py-2">Unit</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>

              {/* ITEM NAME */}
              <td className="border px-3 py-2">
                {isEditing ? (
                  <select
                    value={row.ItemName}
                    onChange={(e) => onSelectItemName(index, e.target.value)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    {fakeMaterialList.map((m) => (
                      <option key={m.materialCode} value={m.materialName}>
                        {m.materialName}
                      </option>
                    ))}
                  </select>
                ) : (
                  row.ItemName || "-"
                )}
              </td>

              {/* ITEM CODE */}
              <td className="border px-3 py-2">
                {isEditing ? (
                  <select
                    value={row.ItemCode}
                    onChange={(e) => onSelectItemCode(index, e.target.value)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    {fakeMaterialList.map((m) => (
                      <option key={m.materialCode} value={m.materialCode}>
                        {m.materialCode}
                      </option>
                    ))}
                  </select>
                ) : (
                  row.ItemCode || "-"
                )}
              </td>

              {/* QTY */}
              <td className="border px-3 py-2">
                {isEditing ? (
                  <input
                    type="number"
                    value={row.Qty}
                    onChange={(e) => handleChange(index, "Qty", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.Qty || "-"
                )}
              </td>

              {/* RATE */}
              <td className="border px-3 py-2">
                {isEditing ? (
                  <input
                    type="number"
                    value={row.Rate}
                    onChange={(e) => handleChange(index, "Rate", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.Rate || "-"
                )}
              </td>

              {/* UNIT */}
              <td className="border px-3 py-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={row.Unit}
                    onChange={(e) => handleChange(index, "Unit", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row.Unit || "-"
                )}
              </td>

            </tr>
          ))}

          {isEditing && (
            <tr>
              <td colSpan={5} className="text-center py-3 bg-gray-50">
                <button
                  onClick={addRow}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex mx-auto gap-1"
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
}
