import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  typeName: Yup.string().required("Product Type Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
  isActive: Yup.boolean(),
});

const EditProductType = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      typeName: selectedData?.typeName || "",
      remark: selectedData?.remark || "",
      isActive: selectedData?.isActive || false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id
          ? { ...item, ...values }
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
      {/* 🧾 Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Product Type Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Product Type Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="typeName"
            value={formik.values.typeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter product type name"
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
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter remark (optional)"
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

      {/* 📌 Fixed Footer Buttons */}
      <div className="sticky -bottom-4 bg-white flex justify-end gap-3 px-4 py-1">
             <button
          type="button"
          // onClick={handleReset}
          className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
        >
          Reset
        </button>
        <button
          type="submit"
         className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditProductType;
