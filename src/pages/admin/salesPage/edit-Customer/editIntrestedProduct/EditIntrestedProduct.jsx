import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../../../../components/alert/Alert";

// Red asterisk for required fields
const RequiredLabel = ({ label }) => (
  <label className="text-xs font-medium text-gray-700">
    {label} <span className="text-red-600">*</span>
  </label>
);

// Validation Schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
});

const EditIntrestedProduct = ({ selectedData, dataList, setDataList, closeEditModal }) => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      productShortDesc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (selectedData && selectedData.id) {
        // Update existing record
        const updatedList = dataList.map((item) =>
          item.id === selectedData.id ? { ...item, ...values } : item
        );
        setDataList(updatedList);
        alertSuccess("Product details updated successfully!");
      }
      if (closeEditModal) closeEditModal();
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (selectedData) {
      formik.setValues({
        productName: selectedData.productName || "",
        productCode: selectedData.productCode || "",
        productShortDesc: selectedData.productShortDesc || "",
      });
    }
  }, [selectedData]);

  const handleReset = () => {
    formik.resetForm({
      values: selectedData || {
        productName: "",
        productCode: "",
        productShortDesc: "",
      },
    });
  };

  return (
    <div className="bg-gray-100 rounded-lg flex flex-col h-[60vh]">
      <form
        onSubmit={formik.handleSubmit}
         id="addForm"
        className="flex-1 overflow-y-auto p-6 space-y-4"
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
            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
          />
          {formik.touched.productName && formik.errors.productName && (
            <p className="text-xs text-red-500">{formik.errors.productName}</p>
          )}
        </div>

        {/* Product Code */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-700">Product Code</label>
          <input
            type="text"
            name="productCode"
            value={formik.values.productCode}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Product Short Description */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-700">Product Short Description</label>
          <textarea
            name="productShortDesc"
            rows={3}
            value={formik.values.productShortDesc}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </form>
        {/* Footer Buttons */}
        <div className="p-2 bg-white flex justify-end gap-4 sticky -bottom-4">
           <button
            type="button"
            onClick={handleReset}
            className="border bg-gray-400 text-white px-4 py-2 rounded-md  text-xs"
          >
            Reset
          </button>
          <button
            type="submit"
            form="addForm"
             className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
          >
            Update
          </button>
         
        </div>
    </div>
  );
};

export default EditIntrestedProduct;

