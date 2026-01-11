import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { alertSuccess } from "../../../../../components/alert/Alert";

// ✅ Validation Schema
const validationSchema = Yup.object({
  customerName: Yup.string().required("Required"),
  customerCode: Yup.string().required("Required"),
  contactPerson: Yup.string().required("Required"),
  mobileNo: Yup.number().typeError("Must be a number").required("Required"),
  customerType: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

// ✅ Red asterisk component
const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label}
    <span className="text-red-600 ml-1">(*)</span>
  </label>
);

const EditCustomerBasic = ({ selectedData, dataList, setDataList, closeEditModal }) => {
  // Dropdown options
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
  ];
  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  ];
  const customerTypeOptions = [
    { value: "Retail", label: "Retail" },
    { value: "Wholesale", label: "Wholesale" },
    { value: "Corporate", label: "Corporate" },
  ];

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerCode: "",
      contactPerson: "",
      designation: "",
      email: "",
      city: "",
      cstNo: "",
      tinNo: "",
      panNo: "",
      gstNo: "",
      sourceEmployee: "",
      exciseNo: "",
      annualTurnover: "",
      mobileNo: "",
      contactNo: "",
      fax: "",
      pincode: "",
      creditLimit: "",
      creditDays: "",
      country: "",
      state: "",
      customerType: "",
      address: "",
      activeStatus: false,
      gstExempt: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id ? { ...item, ...values } : item
      );
      setDataList(updatedList);
      alertSuccess("Customer details updated successfully!");
      closeEditModal();
    },
  });

  // Prefill form with selectedData
  useEffect(() => {
    if (selectedData) {
      formik.setValues({ ...formik.initialValues, ...selectedData });
    }
  }, [selectedData]);

  return (
    <div className="bg-white rounded-md p-4 h-full flex flex-col">
      <form onSubmit={formik.handleSubmit}
       id="addForm"
       className="overflow-y-auto flex-1 space-y-4 pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text Fields */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Customer Name" />
            <input
              type="text"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.customerName && formik.errors.customerName && (
              <p className="text-xs text-red-500">{formik.errors.customerName}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Customer Code" />
            <input
              type="text"
              name="customerCode"
              value={formik.values.customerCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.customerCode && formik.errors.customerCode && (
              <p className="text-xs text-red-500">{formik.errors.customerCode}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Contact Person" />
            <input
              type="text"
              name="contactPerson"
              value={formik.values.contactPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.contactPerson && formik.errors.contactPerson && (
              <p className="text-xs text-red-500">{formik.errors.contactPerson}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Number Fields */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Mobile Number" />
            <input
              type="number"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.mobileNo && formik.errors.mobileNo && (
              <p className="text-xs text-red-500">{formik.errors.mobileNo}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Contact Number</label>
            <input
              type="number"
              name="contactNo"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">FAX</label>
            <input
              type="number"
              name="fax"
              value={formik.values.fax}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Credit Limit</label>
            <input
              type="number"
              name="creditLimit"
              value={formik.values.creditLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Credit Days</label>
            <input
              type="number"
              name="creditDays"
              value={formik.values.creditDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Select Fields */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Country" />
            <Select
            className="text-xs"
              options={countryOptions}
              value={countryOptions.find((opt) => opt.value === formik.values.country) || null}
              onChange={(opt) => formik.setFieldValue("country", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("country", true)}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-xs text-red-500">{formik.errors.country}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="State" />
            <Select
            className="text-xs"
              options={stateOptions}
              value={stateOptions.find((opt) => opt.value === formik.values.state) || null}
              onChange={(opt) => formik.setFieldValue("state", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("state", true)}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-xs text-red-500">{formik.errors.state}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Customer Type" />
            <Select
            className="text-xs"
              options={customerTypeOptions}
              value={customerTypeOptions.find((opt) => opt.value === formik.values.customerType) || null}
              onChange={(opt) => formik.setFieldValue("customerType", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("customerType", true)}
            />
            {formik.touched.customerType && formik.errors.customerType && (
              <p className="text-xs text-red-500">{formik.errors.customerType}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Address" />
            <textarea
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-xs text-red-500">{formik.errors.address}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activeStatus"
              checked={formik.values.activeStatus}
              onChange={formik.handleChange}
              className="w-4 h-4 accent-indigo-600"
            />
            <label className="text-xs text-gray-700">Active Status</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="gstExempt"
              checked={formik.values.gstExempt}
              onChange={formik.handleChange}
              className="w-4 h-4 accent-indigo-600"
            />
            <label className="text-xs text-gray-700">GST Exempt</label>
          </div>
        </div>

      </form>
        {/* Footer Buttons */}
        <div className="p-2 bg-white flex justify-end gap-4 sticky -bottom-4">
             <button
            type="button"
            onClick={() => formik.resetForm()}
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

export default EditCustomerBasic;
