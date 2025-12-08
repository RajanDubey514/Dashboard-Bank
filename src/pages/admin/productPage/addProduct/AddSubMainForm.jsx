import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { FakeGroupData } from "../../../../components/FakeData";

const AddSubMainForm = ({ dataList, setDataList, onClose }) => {
  const groupOptions = FakeGroupData.map((g) => ({
    value: g.groupName,
    label: g.groupName,
  }));

  const validationSchema = Yup.object({
    groupName: Yup.string().required("Group Name is required"),
    subGroupName: Yup.string().required("Sub Group Name is required"),
    remark: Yup.string().max(200, "Remark must be less than 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      groupName: "",
      subGroupName: "",
      remark: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newEntry = { id: Date.now(), ...values };
      setDataList([newEntry, ...dataList]);
      resetForm();
      if (onClose) onClose();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-lg border flex flex-col h-[70vh] max-h-[70vh]"
    >
      {/* Scrollable Form Content */}
      <div className="overflow-y-auto flex-1 space-y-4 p-4">
        {/* Group Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Group Name <span className="text-red-500">*</span>
          </label>
          <Select
            name="groupName"
            options={groupOptions}
            value={groupOptions.find(
              (o) => o.value === formik.values.groupName
            )}
            onChange={(option) => formik.setFieldValue("groupName", option.value)}
            className="text-xs"
            placeholder="Select Group"
          />
          {formik.touched.groupName && formik.errors.groupName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.groupName}
            </p>
          )}
        </div>

        {/* Sub Group Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Sub Group Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subGroupName"
            value={formik.values.subGroupName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2 text-xs focus:ring focus:ring-blue-100"
            placeholder="Enter sub group name"
          />
          {formik.touched.subGroupName && formik.errors.subGroupName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.subGroupName}
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
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.remark}
            </p>
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
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-100"
          />
          <label htmlFor="isActive" className="text-xs text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* Fixed Buttons */}
      <div className="flex justify-end gap-3 p-3  bg-white sticky -bottom-4">
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1 border rounded-md text-xs text-gray-600 hover:bg-gray-100"
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

export default AddSubMainForm;
