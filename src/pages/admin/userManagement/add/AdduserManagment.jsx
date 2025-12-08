import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../../../components/alert/Alert";

import {
  fakeDepartments,
  fakeUserRoles,
  fakeStatuses,
} from "../../../../components/FakeData";

const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label} <span className="text-red-600 ml-1">(*)</span>
  </label>
);

// Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  department: Yup.string().required("Department is required"),
  role: Yup.string().required("User role is required"),
  status: Yup.string().required("Account status is required"),

  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  expiryDate: Yup.date().required("Account expiry date is required"),
});

const AdduserManagment = ({ dataList, setDataList }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      department: "",
      role: "",
      status: "",
      username: "",
      password: "",
      confirmPassword: "",
      expiryDate: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setDataList?.((prev) => [...prev, values]);
      alertSuccess("User saved successfully!");
      resetForm();
    },
  });

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <form
        id="addUserForm"
        onSubmit={formik.handleSubmit}
        className="overflow-y-auto flex-1 p-2 space-y-8"
      >
        {/* PERSONAL INFORMATION */}
        <fieldset className="border rounded-lg p-4">
          <legend className="font-semibold text-indigo-600 px-2">Personal Information</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Full Name" />
              <input
                type="text"
                name="fullName"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-xs text-red-500">{formik.errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Email Address" />
              <input
                type="email"
                name="email"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Phone Number" />
              <input
                type="text"
                name="phone"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500">{formik.errors.phone}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* DEPARTMENT & ROLE */}
        <fieldset className="border rounded-lg p-4">
          <legend className="font-semibold text-indigo-600 px-2">Department & Role</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Department */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Department" />
              <select
                name="department"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select department</option>
                {fakeDepartments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {formik.touched.department && formik.errors.department && (
                <p className="text-xs text-red-500">{formik.errors.department}</p>
              )}
            </div>

            {/* User Role */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="User Role" />
              <select
                name="role"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select role</option>
                {fakeUserRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-xs text-red-500">{formik.errors.role}</p>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Account Status" />
              <select
                name="status"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select status</option>
                {fakeStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {formik.touched.status && formik.errors.status && (
                <p className="text-xs text-red-500">{formik.errors.status}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* LOGIN CREDENTIALS */}
        <fieldset className="border rounded-lg p-4">
          <legend className="font-semibold text-indigo-600 px-2">Login Credentials</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Username */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Username" />
              <input
                type="text"
                name="username"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-red-500">{formik.errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Password" />
              <input
                type="password"
                name="password"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Confirm Password" />
              <input
                type="password"
                name="confirmPassword"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Account Expiry Date" />
              <input
                type="date"
                name="expiryDate"
                className="border border-gray-300 rounded-md px-3 py-2 text-xs"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <p className="text-xs text-red-500">{formik.errors.expiryDate}</p>
              )}
            </div>
          </div>
        </fieldset>
      </form>

      {/* FOOTER BUTTONS */}
      <div className="p-3 flex justify-end gap-4 bg-white sticky -bottom-4">
        <button
          type="submit"
          form="addUserForm"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-xs"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="border border-red-500 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AdduserManagment;
