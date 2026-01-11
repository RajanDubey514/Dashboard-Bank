import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../../../../components/alert/Alert";

// Red asterisk for required fields
const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label} <span className="text-red-600">(*)</span>
  </label>
);

// Validation Schema
const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
});

const EditBranchsDetail = ({ dataList, setDataList, selectedData, closeEditModal }) => {
  const initialValues = {
    branchName: "",
    contactPerson: "",
    email: "",
    designation: "",
    mobileNo: "",
    address: "",
    fax: "",
    contactNo: "",
    pincode: "",
    cstNo: "",
    tinNo: "",
    panNo: "",
    gstNo: "",
    annualTurnover: "",
    city: "",
    country: "",
    state: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (selectedData && selectedData.id) {
        const updatedList = dataList.map((item) =>
          item.id === selectedData.id ? { ...item, ...values } : item
        );
        setDataList(updatedList);
        alertSuccess("Branch details updated successfully!");
      }
      if (closeEditModal) closeEditModal();
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedData) {
      formik.setValues(selectedData);
    }
  }, [selectedData]);

  const handleReset = () => {
    formik.resetForm({ values: selectedData || initialValues });
  };

  return (
    <div className="bg-gray-100 rounded-lg flex flex-col h-[75vh]">
      <form onSubmit={formik.handleSubmit}
       id="addForm"
       className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Branch Name */}
          <div className="flex flex-col">
            <RequiredLabel label="Branch Name" />
            <input
              type="text"
              name="branchName"
              value={formik.values.branchName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.branchName && formik.errors.branchName && (
              <p className="text-xs text-red-500">{formik.errors.branchName}</p>
            )}
          </div>

          {/* Contact Person */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formik.values.contactPerson}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Number Inputs */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Mobile No</label>
            <input
              type="number"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Contact No</label>
            <input
              type="number"
              name="contactNo"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">FAX</label>
            <input
              type="number"
              name="fax"
              value={formik.values.fax}
              onChange={formik.handleChange}
             className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Other Text Inputs */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">CST No</label>
            <input
              type="text"
              name="cstNo"
              value={formik.values.cstNo}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">TIN No</label>
            <input
              type="text"
              name="tinNo"
              value={formik.values.tinNo}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">PAN No</label>
            <input
              type="text"
              name="panNo"
              value={formik.values.panNo}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">GST No</label>
            <input
              type="text"
              name="gstNo"
              value={formik.values.gstNo}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700">Annual Turnover</label>
            <input
              type="text"
              name="annualTurnover"
              value={formik.values.annualTurnover}
              onChange={formik.handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <RequiredLabel label="City" />
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-xs text-red-500">{formik.errors.city}</p>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <RequiredLabel label="Country" />
            <select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-xs text-red-500">{formik.errors.country}</p>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <RequiredLabel label="State" />
            <select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
            {formik.touched.state && formik.errors.state && (
              <p className="text-xs text-red-500">{formik.errors.state}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col col-span-1 sm:col-span-2">
            <RequiredLabel label="Address" />
            <textarea
              name="address"
              rows={3}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-xs text-red-500">{formik.errors.address}</p>
            )}
          </div>
        </div>

      </form>
        {/* Footer Buttons */}
        <div className="p-2 bg-white flex justify-end gap-4 sticky -bottom-4">
             <button
            type="button"
            onClick={handleReset}
              className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
          >
            Reset
          </button>
          <button
            type="submit"
            form="addForm"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
          >
            Update
          </button>
       
        </div>
    </div>
  );
};

export default EditBranchsDetail;
