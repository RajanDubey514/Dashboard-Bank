import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { alertSuccess } from "../../../../components/alert/Alert";

// Validation Schema
const validationSchema = Yup.object({
  customerName: Yup.string().required("Required"),
  customerCode: Yup.string().required("Required"),
  contactPerson: Yup.string().required("Required"),
  mobileNo: Yup.number().typeError("Must be a number").required("Required"),
  customerType: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

const AddCustomerBasic = ({ dataList = [], setDataList }) => {
  const countryOptions = useMemo(
    () => [
      { value: "India", label: "India" },
      { value: "USA", label: "USA" },
      { value: "UK", label: "UK" },
    ],
    []
  );

  const stateOptions = useMemo(
    () => [
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Delhi", label: "Delhi" },
      { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    ],
    []
  );

  const customerTypeOptions = useMemo(
    () => [
      { value: "Retail", label: "Retail" },
      { value: "Wholesale", label: "Wholesale" },
      { value: "Corporate", label: "Corporate" },
    ],
    []
  );

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
      customerType: "",
      state: "",
      country: "",
      activeStatus: false,
      gstExempt: false,
      address: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setDataList?.((prev) => [...prev, { id: Date.now(), ...values }]);
      alertSuccess("Customer added successfully!");
      resetForm();
    },
  });

  return (
    <div className="bg-white rounded-md p-4 h-full flex flex-col">
      <form
        onSubmit={formik.handleSubmit}
        className="overflow-y-auto flex-1 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Text Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Customer Name <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.customerName && formik.errors.customerName && (
              <p className="text-xs text-red-500">{formik.errors.customerName}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Customer Code <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              name="customerCode"
              value={formik.values.customerCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.customerCode && formik.errors.customerCode && (
              <p className="text-xs text-red-500">{formik.errors.customerCode}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Contact Person <span className="text-red-600">(*)</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formik.values.contactPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.contactPerson && formik.errors.contactPerson && (
              <p className="text-xs text-red-500">{formik.errors.contactPerson}</p>
            )}
          </div>

          {/* Number Fields with yellow background */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-600">(*)</span>
            </label>
            <input
              type="number"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.mobileNo && formik.errors.mobileNo && (
              <p className="text-xs text-red-500">{formik.errors.mobileNo}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="number"
              name="contactNo"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">FAX</label>
            <input
              type="number"
              name="fax"
              value={formik.values.fax}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Credit Limit</label>
            <input
              type="number"
              name="creditLimit"
              value={formik.values.creditLimit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Credit Days(s)</label>
            <input
              type="number"
              name="creditDays"
              value={formik.values.creditDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* React Select Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Customer Type <span className="text-red-600">(*)</span>
            </label>
            <Select
              options={customerTypeOptions}
              value={customerTypeOptions.find((opt) => opt.value === formik.values.customerType) || null}
              onChange={(opt) => formik.setFieldValue("customerType", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("customerType", true)}
            />
            {formik.touched.customerType && formik.errors.customerType && (
              <p className="text-xs text-red-500">{formik.errors.customerType}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              State <span className="text-red-600">(*)</span>
            </label>
            <Select
              options={stateOptions}
              value={stateOptions.find((opt) => opt.value === formik.values.state) || null}
              onChange={(opt) => formik.setFieldValue("state", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("state", true)}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-xs text-red-500">{formik.errors.state}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Country <span className="text-red-600">(*)</span>
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find((opt) => opt.value === formik.values.country) || null}
              onChange={(opt) => formik.setFieldValue("country", opt?.value || "")}
              onBlur={() => formik.setFieldTouched("country", true)}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-xs text-red-500">{formik.errors.country}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
            <label className="text-sm text-gray-700">Active Status</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="gstExempt"
              checked={formik.values.gstExempt}
              onChange={formik.handleChange}
              className="w-4 h-4 accent-indigo-600"
            />
            <label className="text-sm text-gray-700">GST Exempt</label>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 py-3 mt-2 bg-white sticky bottom-0">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCustomerBasic;
