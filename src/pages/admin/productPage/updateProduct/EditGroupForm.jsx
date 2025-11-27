import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  groupName: Yup.string().required("Group Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
  isActive: Yup.boolean(),
});

const EditGroupForm = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      groupName: selectedData?.groupName || "",
      remark: selectedData?.remark || "",
      isActive: selectedData?.isActive || false, // ✅ Prefilled checkbox
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id
          ? {
              ...item,
              groupName: values.groupName,
              remark: values.remark,
              isActive: values.isActive,
            }
          : item
      );
      setDataList(updatedList);
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative bg-white shadow-md rounded-lg border flex flex-col h-[300px]"
    >
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Group Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="groupName"
            value={formik.values.groupName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-100"
            placeholder="Enter group name"
          />
          {formik.touched.groupName && formik.errors.groupName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.groupName}
            </p>
          )}
        </div>

        {/* Remark */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remark
          </label>
          <textarea
            name="remark"
            value={formik.values.remark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-100"
            placeholder="Enter remark (optional)"
            rows="3"
          />
          {formik.touched.remark && formik.errors.remark && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.remark}</p>
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

      {/* ✅ Fixed Bottom Buttons */}
      <div className="sticky -bottom-4 bg-white  flex justify-end gap-3 px-4 py-2">
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditGroupForm;
