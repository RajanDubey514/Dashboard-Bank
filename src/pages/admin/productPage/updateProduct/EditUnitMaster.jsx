import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  uomName: Yup.string().required("UOM Name is required"),
  remarks: Yup.string().max(200, "Remarks must be less than 200 characters"),
  isActive: Yup.boolean(),
});

const EditUnitMaster = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      uomName: selectedData?.uomName || "",
      remarks: selectedData?.remarks || "",
      isActive: selectedData?.isActive ?? true,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id ? { ...item, ...values } : item
      );
      setDataList(updatedList);
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative bg-white shadow-md rounded-lg border flex flex-col h-full max-h-[80vh]"
    >
      {/* 🧾 Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* UOM Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            UOM Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="uomName"
            value={formik.values.uomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-100"
            placeholder="Enter UOM Name"
          />
          {formik.touched.uomName && formik.errors.uomName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.uomName}</p>
          )}
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-100"
            placeholder="Enter remarks (optional)"
          />
          {formik.touched.remarks && formik.errors.remarks && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.remarks}
            </p>
          )}
        </div>

        {/* ✅ Active Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formik.values.isActive}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* ✅ Fixed Footer Buttons */}
      <div className="sticky bottom-0 bg-white flex justify-end gap-3 px-4 py-2 border-t">
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="px-4 py-1.5 border rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1.5 border rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditUnitMaster;
