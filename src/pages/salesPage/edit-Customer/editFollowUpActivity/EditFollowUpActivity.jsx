import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { alertSuccess } from "../../../../components/alert/Alert";

// Required label component
const RequiredLabel = ({ label }) => (
  <span className="font-medium text-black">
    {label} <span className="text-red-600">(*)</span>
  </span>
);

// Validation Schema
const validationSchema = Yup.object({
  dueDateTime: Yup.string().required("Due Date/Time is required"),
  reminderDateTime: Yup.string().required("Reminder Date/Time is required"),
  followUpStatusReason: Yup.string().required(
    "Follow Up Status Reason is required"
  ),
  priority: Yup.string().required("Priority is required"),
  followUpStatus: Yup.string().required("Follow Up Status is required"),
});

const EditFollowUpActivity = ({ selectedData, dataList, setDataList, closeEditModal }) => {
  const formik = useFormik({
    initialValues: {
      dueDateTime: "",
      reminderDateTime: "",
      remarks: "",
      followUpStatusReason: "",
      assignFollowUp: "",
      followUpActivityType: "",
      priority: "",
      followUpStatus: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (selectedData && selectedData.id) {
        const updatedList = dataList.map((item) =>
          item.id === selectedData.id ? { ...item, ...values } : item
        );
        setDataList(updatedList);
        alertSuccess("Follow-up activity updated successfully!");
        if (closeEditModal) closeEditModal();
      }
    },
  });

  // Prefill form with selectedData
  useEffect(() => {
    if (selectedData) {
      formik.setValues({
        dueDateTime: selectedData.dueDateTime || "",
        reminderDateTime: selectedData.reminderDateTime || "",
        remarks: selectedData.remarks || "",
        followUpStatusReason: selectedData.followUpStatusReason || "",
        assignFollowUp: selectedData.assignFollowUp || "",
        followUpActivityType: selectedData.followUpActivityType || "",
        priority: selectedData.priority || "",
        followUpStatus: selectedData.followUpStatus || "",
      });
    }
  }, [selectedData]);

  // React-select options
  const followUpActivityTypeOptions = [
    { value: "Call", label: "Call" },
    { value: "Email", label: "Email" },
    { value: "Meeting", label: "Meeting" },
  ];
  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];
  const followUpStatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg h-[75vh]">
      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={formik.handleSubmit} id="editFollowUpForm" className="space-y-4">
          
          {/* Due Date/Time */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Due Date/Time" />
            </label>
            <input
              type="datetime-local"
              name="dueDateTime"
              value={formik.values.dueDateTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.dueDateTime && formik.errors.dueDateTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.dueDateTime && formik.errors.dueDateTime && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.dueDateTime}</p>
            )}
          </div>

          {/* Reminder Date/Time */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Reminder Date/Time" />
            </label>
            <input
              type="datetime-local"
              name="reminderDateTime"
              value={formik.values.reminderDateTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.reminderDateTime && formik.errors.reminderDateTime
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.reminderDateTime && formik.errors.reminderDateTime && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.reminderDateTime}</p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block mb-1">Remarks</label>
            <textarea
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              rows={3}
            />
          </div>

          {/* Follow Up Status Reason */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Follow Up Status Reason" />
            </label>
            <input
              type="text"
              name="followUpStatusReason"
              value={formik.values.followUpStatusReason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.followUpStatusReason && formik.errors.followUpStatusReason
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.followUpStatusReason && formik.errors.followUpStatusReason && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.followUpStatusReason}</p>
            )}
          </div>

          {/* Assign Follow Up */}
          <div>
            <label className="block mb-1">Assign Follow Up</label>
            <input
              type="text"
              name="assignFollowUp"
              value={formik.values.assignFollowUp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Follow Up Activity Type */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Follow Up Activity Type" />
            </label>
            <Select
              options={followUpActivityTypeOptions}
              value={followUpActivityTypeOptions.find(
                (option) => option.value === formik.values.followUpActivityType
              )}
              onChange={(selected) =>
                formik.setFieldValue("followUpActivityType", selected?.value || "")
              }
              onBlur={formik.handleBlur}
              className="w-full"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Priority" />
            </label>
            <Select
              options={priorityOptions}
              value={priorityOptions.find(
                (option) => option.value === formik.values.priority
              )}
              onChange={(selected) =>
                formik.setFieldValue("priority", selected?.value || "")
              }
              onBlur={formik.handleBlur}
              className="w-full"
            />
          </div>

          {/* Follow Up Status */}
          <div>
            <label className="block mb-1">
              <RequiredLabel label="Follow Up Status" />
            </label>
            <Select
              options={followUpStatusOptions}
              value={followUpStatusOptions.find(
                (option) => option.value === formik.values.followUpStatus
              )}
              onChange={(selected) =>
                formik.setFieldValue("followUpStatus", selected?.value || "")
              }
              onBlur={formik.handleBlur}
              className="w-full"
            />
          </div>
        </form>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t bg-white flex justify-center gap-4 sticky bottom-0">
        <button
          type="submit"
          form="editFollowUpForm"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="px-6 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EditFollowUpActivity;
