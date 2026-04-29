import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { alertSuccess, alertError } from "../../components/alert/Alert";
import { resetPassword } from "../../redux/slice/auth/authSlice";
import { useDispatch , useSelector} from "react-redux";


const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { uid } = useParams();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("UID:", uid);
        console.log(values);
        // await dispatch(resetPassword({ uid, ...values })).unwrap();
          const resp = await dispatch(resetPassword({ uid, payload: values })).unwrap();
         console.log(resp)
        alertSuccess(resp.message); 
        navigate("/login");

      } catch (err) {
        alertError(err?.message || "Failed to reset password");
      } 
    },
  });

  return (
    <>
     {loading && <Loader />}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#43cea2] to-[#185a9d] px-4 py-8 font-poppins">
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Reset Password
        </h2>

        <p className="text-center text-white/70 mb-6 text-sm">
          Enter your new password below
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* 🔑 Password */}
          <div>
            <label className="text-white/90 text-sm mb-1 block">
              New Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white/70 hover:text-white"
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

          {/* 🔑 Confirm Password */}
          <div>
            <label className="text-white/90 text-sm mb-1 block">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-400"
                    : "border-white/20"
                } bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 outline-none`}
              />
            </div>

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* 🚀 Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* 🔙 Back */}
        <p
          onClick={() => navigate("/login")}
          className="text-center text-white/70 mt-6 cursor-pointer hover:text-white"
        >
          Back to Login
        </p>

      </div>
    </div>
    </>
  );
};

export default ResetPassword;