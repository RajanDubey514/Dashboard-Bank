import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  groupName: Yup.string().required("Group Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
});

const AddGroupForm = ({ dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      groupName: "",
      remark: "",
      activeStatus: false, // ✅ default checked
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newGroup = {
        id: Date.now(),
        groupName: values.groupName,
        remark: values.remark,
        activeStatus: values.activeStatus, // ✅ include active status
      };
      setDataList([newGroup, ...dataList]);
      resetForm();
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded-lg border flex flex-col h-full max-h-[80vh]"
    >
      {/* Scrollable Form Content */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Group Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Group Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="groupName"
            value={formik.values.groupName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
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
          <label className="block text-xs font-medium text-gray-700">
            Remark
          </label>
          <textarea
            name="remark"
            value={formik.values.remark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter remark (optional)"
            rows="3"
          />
          {formik.touched.remark && formik.errors.remark && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.remark}
            </p>
          )}
        </div>

        {/* ✅ Active Status Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activeStatus"
            id="activeStatus"
            checked={formik.values.activeStatus}
            onChange={formik.handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
          />
          <label htmlFor="activeStatus" className="text-xs text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* ✅ Fixed Footer Buttons */}
      <div className="flex justify-end gap-3  bg-white p-1 sticky -bottom-4">
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="px-4 py-1 border rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1 border rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 rounded-md text-xs font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddGroupForm;
