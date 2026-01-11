import React, { useMemo, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { alertSuccess } from "../../../../components/alert/Alert";

// ✅ Validation Schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productCode: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  length: Yup.string().required("Required"),
  manufacturedBrand: Yup.string().required("Required"),
  hsnCode: Yup.string().required("Required"),
  salePrice: Yup.number().typeError("Must be a number").required("Required"),
  purchasePrice: Yup.number().typeError("Must be a number").required("Required"),
  reorderQty: Yup.number().typeError("Must be a number").required("Required"),
  minOrderQty: Yup.number().typeError("Must be a number").required("Required"),
  cgst: Yup.number().typeError("Must be a number").required("Required"),
  sgst: Yup.number().typeError("Must be a number").required("Required"),
  igst: Yup.number().typeError("Must be a number").required("Required"),
  productType: Yup.string().required("Required"),
  productMainGroup: Yup.string().required("Required"),
  productSubGroup: Yup.string().required("Required"),
  assemblyType: Yup.string().required("Required"),
  saleUom: Yup.string().required("Required"),
  purchaseUom: Yup.string().required("Required"),
});

const UpdateProduct = ({ selectedData, dataList, setDataList, closeEditModal }) => {
  const [imageName, setImageName] = useState(selectedData?.productImage || "");

  // ✅ Select Options
  const productTypeOptions = useMemo(
    () => [
      { value: "Finished", label: "Finished" },
      { value: "Raw Material", label: "Raw Material" },
      { value: "Semi-Finished", label: "Semi-Finished" },
    ],
    []
  );

  const mainGroupOptions = useMemo(
    () => [
      { value: "Electronics", label: "Electronics" },
      { value: "Furniture", label: "Furniture" },
      { value: "Clothing", label: "Clothing" },
    ],
    []
  );

  const subGroupOptions = useMemo(
    () => [
      { value: "Mobile", label: "Mobile" },
      { value: "Table", label: "Table" },
      { value: "Shirt", label: "Shirt" },
    ],
    []
  );

  const assemblyTypeOptions = useMemo(
    () => [
      { value: "Manual", label: "Manual" },
      { value: "Automatic", label: "Automatic" },
    ],
    []
  );

  const uomOptions = useMemo(
    () => [
      { value: "Piece", label: "Piece" },
      { value: "Box", label: "Box" },
      { value: "Kg", label: "Kg" },
      { value: "Meter", label: "Meter" },
    ],
    []
  );

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      size: "",
      length: "",
      manufacturedBrand: "",
      hsnCode: "",
      salePrice: "",
      purchasePrice: "",
      reorderQty: "",
      minOrderQty: "",
      cgst: "",
      sgst: "",
      igst: "",
      productType: "",
      productMainGroup: "",
      productSubGroup: "",
      assemblyType: "",
      saleUom: "",
      purchaseUom: "",
      serialApplicable: false,
      gstExempt: false,
      activeStatus: false,
      productImage: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedData = dataList.map((item) =>
        item.id === selectedData.id
          ? { ...item, ...values, productImage: imageName || item.productImage }
          : item
      );

      setDataList(updatedData);
      alertSuccess("Product updated successfully!");
      closeEditModal();
    },
  });

  // ✅ Prefill form when modal opens
  useEffect(() => {
    if (selectedData) {
      formik.setValues({
        productName: selectedData.productName || "",
        productCode: selectedData.productCode || "",
        size: selectedData.size || "",
        length: selectedData.length || "",
        manufacturedBrand: selectedData.manufacturedBrand || "",
        hsnCode: selectedData.hsnCode || "",
        salePrice: selectedData.salePrice || "",
        purchasePrice: selectedData.purchasePrice || "",
        reorderQty: selectedData.reorderQty || "",
        minOrderQty: selectedData.minOrderQty || "",
        cgst: selectedData.cgst || "",
        sgst: selectedData.sgst || "",
        igst: selectedData.igst || "",
        productType: selectedData.productType || "",
        productMainGroup: selectedData.productMainGroup || "",
        productSubGroup: selectedData.productSubGroup || "",
        assemblyType: selectedData.assemblyType || "",
        saleUom: selectedData.saleUom || "",
        purchaseUom: selectedData.purchaseUom || "",
        serialApplicable: selectedData.serialApplicable || false,
        gstExempt: selectedData.gstExempt || false,
        activeStatus: selectedData.activeStatus || false,
        productImage: selectedData.productImage || "",
      });
    }
  }, [selectedData]);

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <form
        onSubmit={formik.handleSubmit}
        id="updateProductForm"
        className="overflow-y-auto flex-1 space-y-4 p-3 bg-[#f3f3f4]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Text Fields */}
          {[
            { name: "productName", label: "Product Name" },
            { name: "productCode", label: "Product Code" },
            { name: "size", label: "Size" },
            { name: "length", label: "Length" },
            { name: "manufacturedBrand", label: "Manufactured Brand" },
            { name: "hsnCode", label: "HSN Code" },
          ].map((field) => (
            <TextField key={field.name} field={field} formik={formik} />
          ))}

          {/* Number Fields */}
          {[
            { name: "salePrice", label: "Sale Price" },
            { name: "purchasePrice", label: "Purchase Price" },
            { name: "reorderQty", label: "Reorder Qty" },
            { name: "minOrderQty", label: "Minimum Order Qty" },
            { name: "cgst", label: "CGST (%)" },
            { name: "sgst", label: "SGST (%)" },
            { name: "igst", label: "IGST (%)" },
          ].map((field) => (
            <NumberField key={field.name} field={field} formik={formik} />
          ))}

          {/* Select Boxes */}
          <SelectField name="productType" label="Product Type" options={productTypeOptions} formik={formik} />
          <SelectField name="productMainGroup" label="Product Main Group" options={mainGroupOptions} formik={formik} />
          <SelectField name="productSubGroup" label="Product Sub Group" options={subGroupOptions} formik={formik} />
          <SelectField name="assemblyType" label="Assembly Type" options={assemblyTypeOptions} formik={formik} />
          <SelectField name="saleUom" label="Sale UOM" options={uomOptions} formik={formik} />
          <SelectField name="purchaseUom" label="Purchase UOM" options={uomOptions} formik={formik} />

          {/* Image Upload */}
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setImageName(file.name);
              }}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-xs bg-white"
            />
            {imageName && (
              <p className="text-xs text-green-600 mt-1">
                Uploaded: <strong>{imageName}</strong>
              </p>
            )}
          </div>

          {/* Checkboxes */}
          {[
            { name: "serialApplicable", label: "Serial Applicable" },
            { name: "gstExempt", label: "GST Exempt" },
            { name: "activeStatus", label: "Active Status" },
          ].map((box) => (
            <div key={box.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={box.name}
                checked={formik.values[box.name]}
                onChange={formik.handleChange}
                className="w-4 h-4 accent-indigo-600"
              />
              <label className="text-xs text-gray-700">{box.label}</label>
            </div>
          ))}
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
          form="updateProductForm"
           className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md text-xs"
        >
          Update
        </button>
      
      </div>
    </div>
  );
};

// ✅ Small Components
const TextField = ({ field, formik }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-700">
      {field.label} <span className="text-red-600">(*)</span>
    </label>
    <input
      type="text"
      name={field.name}
      value={formik.values[field.name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
    />
    {formik.touched[field.name] && formik.errors[field.name] && (
      <p className="text-xs text-red-500">{formik.errors[field.name]}</p>
    )}
  </div>
);

const NumberField = ({ field, formik }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-700">
      {field.label} <span className="text-red-600">(*)</span>
    </label>
    <input
      type="number"
      name={field.name}
      value={formik.values[field.name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none bg-yellow-50 focus:ring-2 focus:ring-indigo-500"
    />
    {formik.touched[field.name] && formik.errors[field.name] && (
      <p className="text-xs text-red-500">{formik.errors[field.name]}</p>
    )}
  </div>
);

const SelectField = ({ name, label, options, formik }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-700">
      {label} <span className="text-red-600">(*)</span>
    </label>
    <Select
    className="text-xs"
      options={options}
      value={options.find((opt) => opt.value === formik.values[name]) || null}
      onChange={(opt) => formik.setFieldValue(name, opt?.value || "")}
      onBlur={() => formik.setFieldTouched(name, true)}
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-xs text-red-500">{formik.errors[name]}</p>
    )}
  </div>
);

export default UpdateProduct;
