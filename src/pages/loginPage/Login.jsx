import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../components/alert/Alert";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("authToken", "fake-jwt-token");
      setIsLoggedIn(true);
      alertSuccess("Login Successful");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#43cea2] to-[#185a9d] px-4 sm:px-6 py-8 font-poppins">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-white/80 mb-6 text-sm sm:text-base">
          Sign in to continue your journey
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email Field */}
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

          {/* Password Field */}
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
                placeholder="Enter your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-base sm:text-lg font-semibold rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6">
          <div className="h-px bg-white/20 w-1/4"></div>
          <span className="mx-3 text-white/60 text-sm">OR</span>
          <div className="h-px bg-white/20 w-1/4"></div>
        </div>

        {/* Google Button */}
        <div className="mt-5">
          <button className="w-full py-2 rounded-lg bg-white/20 text-white/90 hover:bg-white/30 transition font-medium text-sm sm:text-base">
            Continue with Google
          </button>
        </div>

        <p className="text-center text-white/70 mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-teal-300 hover:underline hover:text-teal-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
