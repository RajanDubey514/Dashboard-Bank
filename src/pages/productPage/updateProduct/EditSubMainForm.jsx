import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { FakeGroupData } from "../../../components/FakeData";

const EditSubMainForm = ({ selectedData, dataList, setDataList, onClose }) => {
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
    initialValues: selectedData || {
      groupName: "",
      subGroupName: "",
      remark: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const updated = dataList.map((item) =>
        item.id === selectedData.id ? { ...item, ...values } : item
      );
      setDataList(updated);
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
        <Select
          name="groupName"
          options={groupOptions}
          value={groupOptions.find((o) => o.value === formik.values.groupName)}
          onChange={(option) => formik.setFieldValue("groupName", option.value)}
          className="text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sub Group Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subGroupName"
          value={formik.values.subGroupName}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Remark
        </label>
        <textarea
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="px-4 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditSubMainForm;
