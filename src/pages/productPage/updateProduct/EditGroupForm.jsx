import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  groupName: Yup.string().required("Group Name is required"),
  remark: Yup.string().max(200, "Remark must be less than 200 characters"),
});

const EditGroupForm = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      groupName: selectedData?.groupName || "",
      remark: selectedData?.remark || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id
          ? { ...item, groupName: values.groupName, remark: values.remark }
          : item
      );
      setDataList(updatedList);
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4 border"
    >
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

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1 border rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditGroupForm;
