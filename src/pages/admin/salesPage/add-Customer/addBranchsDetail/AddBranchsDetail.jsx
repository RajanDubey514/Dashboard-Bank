import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { alertSuccess } from "../../../../../components/alert/Alert";

const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label} <span className="text-red-600 ml-1">(*)</span>
  </label>
);

const validationSchema = Yup.object({
  branchName: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const AddBranchsDetail = ({ dataList, setDataList }) => {
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

  const formik = useFormik({
    initialValues: {
      branchName: "",
      contactPerson: "",
      designation: "",
      email: "",
      city: "",
      cstNo: "",
      panNo: "",
      tinNo: "",
      gstNo: "",
      annualTurnover: "",
      mobileNo: "",
      contactNo: "",
      fax: "",
      pincode: "",
      country: "",
      state: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setDataList?.((prev) => [...prev, { ...values }]);
      alertSuccess("Branch details saved successfully!");
      resetForm();
    },
  });

  return (
    <div className="bg-white rounded-md  h-full flex flex-col">
      <form
        onSubmit={formik.handleSubmit}
        id="addBranch"
        className="overflow-y-auto flex-1 space-y-4  p-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text Inputs */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Branch Name" />
            <input
              type="text"
              name="branchName"
              value={formik.values.branchName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.branchName && formik.errors.branchName && (
              <p className="text-xs text-red-500">{formik.errors.branchName}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formik.values.contactPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="City" />
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-xs text-red-500">{formik.errors.city}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">CST Number</label>
            <input
              type="text"
              name="cstNo"
              value={formik.values.cstNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">PAN Number</label>
            <input
              type="text"
              name="panNo"
              value={formik.values.panNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">TIN Number</label>
            <input
              type="text"
              name="tinNo"
              value={formik.values.tinNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">GST Number</label>
            <input
              type="text"
              name="gstNo"
              value={formik.values.gstNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Annual Turnover</label>
            <input
              type="text"
              name="annualTurnover"
              value={formik.values.annualTurnover}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Number Fields */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Mobile Number</label>
            <input
              type="number"
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Contact Number</label>
            <input
              type="number"
              name="contactNo"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-yellow-50 border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="bg-yellow-50 border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="bg-yellow-50 border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
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

          {/* Address */}
          <div className=" col-span-2 sm:col-span-1 flex flex-col gap-1">
            <RequiredLabel label="Address" />
            <textarea
              name="address"
              rows={3}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
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
            onClick={() => formik.resetForm()}
            className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
          >
            Reset
          </button>
           <button
            type="submit"
            form="addBranch"
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
          >
            Submit
          </button>
        </div>
    </div>
  );
};

export default AddBranchsDetail;
