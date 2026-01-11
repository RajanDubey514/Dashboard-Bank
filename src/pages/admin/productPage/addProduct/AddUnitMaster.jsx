import React, { useState } from "react";

const AddUnitMaster = ({ dataList, setDataList, onClose }) => {
  const [formData, setFormData] = useState({
    uomName: "",
    remarks: "",
    active: true,
  });

  // 🧩 Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: dataList.length + 1,
      ...formData,
    };
    setDataList([...dataList, newEntry]);
    if (onClose) onClose();
  };

  // 🔄 Handle Reset
  const handleReset = () => {
    setFormData({
      uomName: "",
      remarks: "",
      active: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg border flex flex-col h-full max-h-[80vh]"
    >
      {/* 🧾 Scrollable Form Area */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* UOM Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            UOM Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="uomName"
            value={formData.uomName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter UOM Name"
            required
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter remarks (optional)"
            rows="3"
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={formData.active}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
          <label htmlFor="active" className="text-xs text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* ✅ Fixed Bottom Buttons */}
      <div className="flex justify-end gap-3 bg-white p-2  sticky bottom-0">
        <button
          type="button"
          onClick={handleReset}
          className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
        >
          Reset
        </button>
        {/* <button
          type="button"
          onClick={onClose}
          className="px-4 py-1  rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button> */}
        <button
          type="submit"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUnitMaster;
