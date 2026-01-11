import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  typeName: Yup.string().required("Type Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
});

const AddProductType = ({ dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      typeName: "",
      remark: "",
      isActive: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newType = {
        id: Date.now(),
        typeName: values.typeName,
        remark: values.remark,
        isActive: values.isActive,
      };
      setDataList([newType, ...dataList]);
      resetForm();
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded-lg border flex flex-col h-full max-h-[80vh]"
    >
      {/* Scrollable Content */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Type Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Type Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="typeName"
            value={formik.values.typeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter type name"
          />
          {formik.touched.typeName && formik.errors.typeName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.typeName}
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
          <label htmlFor="isActive" className="text-xs text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* ✅ Fixed Footer Buttons */}
      <div className="flex justify-end gap-3 bg-white p-1 sticky -bottom-4">
        <button
          type="button"
          onClick={() => formik.resetForm()}
           className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
        >
          Reset
        </button>
        {/* <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1.5 border rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
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

export default AddProductType;
