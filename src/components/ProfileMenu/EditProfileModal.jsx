import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getUserInfo , updatePersonalInfo} from "../../redux/slice/personalInfo/PersonalInfoSlice";
import { alertError, alertSuccess } from "../alert/Alert";

export default function EditProfileModal({ data, onClose }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: data?.fullName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      location: data?.location || "",
      bio: data?.bio || "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
        .required("Phone is required"),
      location: Yup.string(),
      bio: Yup.string().max(120, "Max 120 characters"),
    }),

    onSubmit: async (values) => {
      try {
     const resp =  await dispatch(updatePersonalInfo(values)).unwrap();
        dispatch(getUserInfo());
        alertSuccess(resp.message);
        onClose();
      } catch (err) {
        alertError(err.message);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">

      {/* Modal */}
      <div className="w-full max-w-md rounded-xl shadow-xl border border-slate-200 bg-[var(--color-surface)] text-[var(--color-text)] p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-light)] hover:text-[var(--color-text)]"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-3">

          {/* Full Name */}
          <div>
            <input
              name="fullName"
              readOnly
              value={formik.values.fullName}
              onChange={formik.handleChange}
              placeholder="Full Name"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm
              bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              readOnly
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm
              bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Phone"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm
              bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <input
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              placeholder="Location"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm
              bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Bio */}
          <div>
            <textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              placeholder="Bio"
              rows={3}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm resize-none
              bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.bio}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-3 py-1.5 rounded-md border border-slate-200
              text-[var(--color-text-light)] hover:bg-[var(--color-surface-hover)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="text-sm px-4 py-1.5 rounded-md
              bg-[var(--color-primary)] text-white hover:opacity-90 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}