import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../../../components/alert/Alert";

// Red asterisk for required fields
const RequiredLabel = ({ label }) => (
  <label className="text-sm font-medium text-gray-700">
    {label} <span className="text-red-600">*</span>
  </label>
);

const validationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
});

const AddIntrestedProduct = ({ dataList, setDataList }) => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      productShortDesc: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = { ...values, id: Date.now() };
      if (setDataList) setDataList((prev) => [...prev, formData]);
      alertSuccess("Product details saved successfully!");
      resetForm();
    },
  });

  return (
    <div className="bg-gray-100 rounded-lg flex flex-col h-full">
      <form
       id="addForm"
        onSubmit={formik.handleSubmit}
        className="flex-1 overflow-y-auto space-y-4  p-2 bg-[#eaeaeb]"
      >
        {/* Product Name */}
        <div className="flex flex-col">
          <RequiredLabel label="Product Name" />
          <input
            type="text"
            name="productName"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
          {formik.touched.productName && formik.errors.productName && (
            <p className="text-xs text-red-500">{formik.errors.productName}</p>
          )}
        </div>

        {/* Product Code */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Product Code</label>
          <input
            type="text"
            name="productCode"
            value={formik.values.productCode}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Product Short Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Product Short Description</label>
          <textarea
            name="productShortDesc"
            rows={3}
            value={formik.values.productShortDesc}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </form>
        {/* Footer Buttons */}
        <div className="p-2 bg-white flex justify-end gap-4 sticky -bottom-4">
          <button
            type="submit"
            form="addForm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6  rounded-md text-sm font-medium transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="border border-red-500 text-red-600 hover:bg-red-50 px-6  rounded-md text-sm font-medium transition"
          >
            Reset
          </button>
        </div>
    </div>
  );
};

export default AddIntrestedProduct;
