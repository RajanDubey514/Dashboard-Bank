import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess, alertError } from "../../../../components/alert/Alert";
import {
  getUsersAccountStatus,
  createUserAccountStatus,
} from "../../../../redux/slice/accountStatus/AccountStatusSlice";
import { useDispatch, useSelector } from "react-redux";

const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label} <span className="text-red-600 ml-1">(*)</span>
  </label>
);

// ✅ Simple validation only for Department
const validationSchema = Yup.object({
  name: Yup.string()
    // .min(3, "Role must be at least 3 characters")
    .required("Status is required"),
});

const AddDepartment = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const resp = await dispatch(createUserAccountStatus(values)).unwrap();
        console.log(resp);
        alertSuccess(resp.message);
        dispatch(getUsersAccountStatus());
        resetForm();
      } catch (error) {
        alertError(error.message);
      }
    },
  });

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <form
        id="addRoleForm"
        onSubmit={formik.handleSubmit}
        className="p-4 space-y-4"
      >
        <div className="flex flex-col gap-1">
          <RequiredLabel label="Status Name" />

          <input
            type="text"
            name="name"
            placeholder="Enter status name"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {/* ✅ Error show */}
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={formik.resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm"
          >
            Reset
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
