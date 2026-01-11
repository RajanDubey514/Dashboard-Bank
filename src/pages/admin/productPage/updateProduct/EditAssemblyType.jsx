import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  assemblyTypeName: Yup.string().required("Assembly Type Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
  isActive: Yup.boolean(),
});

const EditAssemblyType = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      assemblyTypeName: selectedData?.assemblyTypeName || "",
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

   const handleReset = () => {
    // setDataList({
    //   // assemblyTypeName: "",
    //   // remark: "",
    //   // isActive: true,
    // });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative bg-white shadow-md rounded-lg border flex flex-col h-[300px]"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Assembly Type Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Assembly Type Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assemblyTypeName"
            value={formik.values.assemblyTypeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter assembly type name"
          />
          {formik.touched.assemblyTypeName && formik.errors.assemblyTypeName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.assemblyTypeName}
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

        {/* Active Checkbox */}
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

      {/* Fixed Footer Buttons */}
      <div className="sticky -bottom-4 bg-white flex justify-end gap-3 px-4 py-1">
         <button
          type="button"
          onClick={handleReset}
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

export default EditAssemblyType;
