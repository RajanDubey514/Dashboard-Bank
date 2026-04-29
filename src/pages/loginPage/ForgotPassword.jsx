import React from "react";
import { Mail } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess, alertError } from "../../components/alert/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { forgetPassword } from "../../redux/slice/auth/authSlice";
import Loader from "../../components/loader/Loader";



const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
  

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resn = await dispatch(forgetPassword(values)).unwrap();
        alertSuccess(resn.message);
        navigate("/login");
      } catch (err) {
        alertError("Something went wrong");
      }
    },
  });

  return (
    <>
     {loading && <Loader />}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#43cea2] to-[#185a9d] px-4 sm:px-6 py-8 font-poppins">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">

        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2 tracking-wide">
          Forgot Password
        </h2>

        <p className="text-center text-white/80 mb-6 text-sm sm:text-base">
          Enter your email to reset password
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

          {/* Button */}
          <button
            type="submit"
             disabled={loading}
            className="w-full py-3 text-base sm:text-lg font-semibold rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all duration-300"
          >
             {loading ? " Sending Reset Link..." : " Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
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

export default ForgotPassword;