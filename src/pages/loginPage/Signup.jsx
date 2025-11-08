import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../components/alert/Alert";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      alertSuccess("Account Created Successfully!");
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#185a9d] to-[#43cea2] px-4 sm:px-6 py-8 font-poppins">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2 tracking-wide">
          Create Account
        </h2>
        <p className="text-center text-white/80 mb-6 text-sm sm:text-base">
          Join us and start your journey
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/60" size={20} />
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/60" size={20} />
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white/70 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white/90 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={20} />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-white/70 hover:text-white transition"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-base sm:text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white/70 mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-teal-300 hover:underline hover:text-teal-200"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
