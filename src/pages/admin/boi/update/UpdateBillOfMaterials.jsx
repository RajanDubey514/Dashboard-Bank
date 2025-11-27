import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertSuccess } from "../../../../components/alert/Alert";
import { fakeMainProductData } from "../../../../components/FakeData";

// ⭐ Reusable required label
const RequiredLabel = ({ label }) => (
  <label className="text-sm font-medium text-gray-700">
    {label} <span className="text-red-600 ml-1">(*)</span>
  </label>
);

// ⭐ Validation Schema
const validationSchema = Yup.object({
  selectedProduct: Yup.string().required("Please select product"),
  requiredItemCode: Yup.string().required("Item code is required"),
  requiredItemName: Yup.string().required("Item name is required"),
  unit: Yup.string().required("Unit is required"),
  quantity: Yup.number().typeError("Enter valid number").required("Quantity is required"),

  material: Yup.string().required("Material name is required"),
  materialQuantity: Yup.number().typeError("Invalid").required("Material quantity is required"),
  materialRate: Yup.number().typeError("Invalid").required("Material rate is required"),
  materialAmount: Yup.number().typeError("Invalid").required("Material amount is required"),
});

const UpdateBillOfMaterials = ({ selectedData, dataList, setDataList, closeModal }) => {
  const [productList, setProductList] = useState([]);

  // ⭐ Load dropdown product list
  useEffect(() => {
    setProductList(fakeMainProductData);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      selectedProduct: selectedData?.selectedProduct || "",
      autoProductCode: selectedData?.autoProductCode || "",
      requiredItemCode: selectedData?.requiredItemCode || "",
      requiredItemName: selectedData?.requiredItemName || "",
      unit: selectedData?.unit || "",
      quantity: selectedData?.quantity || "",

      material: selectedData?.material || "",
      materialQuantity: selectedData?.materialQuantity || "",
      materialRate: selectedData?.materialRate || "",
      materialAmount: selectedData?.materialAmount || "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Update the selected item in the list
      const updatedList = dataList.map((item) =>
        item.id === selectedData.id ? { ...item, ...values } : item
      );
      setDataList(updatedList);
      alertSuccess("Bill of Material updated successfully!");
      if (closeModal) closeModal();
    },
  });

  // ⭐ Auto fill product code, item name, and unit when product is selected
  useEffect(() => {
    if (!formik.values.selectedProduct) return;

    const selected = productList.find(
      (p) => p.id === Number(formik.values.selectedProduct)
    );

    if (selected) {
      formik.setFieldValue("autoProductCode", selected.productCode);
      formik.setFieldValue("requiredItemName", selected.productName);
      formik.setFieldValue("unit", selected.saleUom);
    }
  }, [formik.values.selectedProduct, productList]);

  // ⭐ Auto calculate Material Amount = Qty × Rate
  useEffect(() => {
    const qty = Number(formik.values.materialQuantity);
    const rate = Number(formik.values.materialRate);

    if (!isNaN(qty) && !isNaN(rate)) {
      formik.setFieldValue("materialAmount", qty * rate, false); // false avoids validation loop
    }
  }, [formik.values.materialQuantity, formik.values.materialRate]);

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <form
        onSubmit={formik.handleSubmit}
        id="updateBill"
        className="space-y-6 p-3 overflow-y-auto"
      >
        {/* 🔵 BLOCK 1 : Select Product */}
        <fieldset className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
          <legend className="px-2 text-lg font-semibold text-indigo-700">
            Manufacturing Item
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Select */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Product Name" />
              <select
                name="selectedProduct"
                value={formik.values.selectedProduct}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">-- Select Product --</option>
                {productList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.productName}
                  </option>
                ))}
              </select>
              {formik.touched.selectedProduct && formik.errors.selectedProduct && (
                <p className="text-xs text-red-500">{formik.errors.selectedProduct}</p>
              )}
            </div>

            {/* Auto-Filled Product Code */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Product Code" />
              <input
                type="text"
                name="autoProductCode"
                value={formik.values.autoProductCode}
                readOnly
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
              />
            </div>
          </div>
        </fieldset>

        {/* 🔵 BLOCK 2 : Required Material */}
        <fieldset className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
          <legend className="px-2 text-lg font-semibold text-indigo-700">
            Required Material
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Required Item Name */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Item Name" />
              <input
                type="text"
                name="requiredItemName"
                readOnly
                value={formik.values.requiredItemName}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
              />
              {formik.touched.requiredItemName && formik.errors.requiredItemName && (
                <p className="text-xs text-red-500">{formik.errors.requiredItemName}</p>
              )}
            </div>

            {/* Required Item Code */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Item Code" />
              <input
                type="text"
                name="requiredItemCode"
                value={formik.values.autoProductCode}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {formik.touched.autoProductCode && formik.errors.autoProductCode && (
                <p className="text-xs text-red-500">{formik.errors.autoProductCode}</p>
              )}
            </div>

            {/* Unit */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Unit" />
              <input
                type="text"
                name="unit"
                value={formik.values.unit}
                readOnly
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Quantity" />
              <input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <p className="text-xs text-red-500">{formik.errors.quantity}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* 🔵 BLOCK 3 : Consumable Material */}
        <fieldset className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
          <legend className="px-2 text-lg font-semibold text-indigo-700">
            Consumable Material
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Material Name */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Material Name" />
              <input
                type="text"
                name="material"
                value={formik.values.material}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {formik.touched.material && formik.errors.material && (
                <p className="text-xs text-red-500">{formik.errors.material}</p>
              )}
            </div>

            {/* Material Quantity */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Material Quantity" />
              <input
                type="number"
                name="materialQuantity"
                value={formik.values.materialQuantity}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {formik.touched.materialQuantity && formik.errors.materialQuantity && (
                <p className="text-xs text-red-500">{formik.errors.materialQuantity}</p>
              )}
            </div>

            {/* Material Rate */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Material Rate" />
              <input
                type="number"
                name="materialRate"
                value={formik.values.materialRate}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {formik.touched.materialRate && formik.errors.materialRate && (
                <p className="text-xs text-red-500">{formik.errors.materialRate}</p>
              )}
            </div>

            {/* Material Amount */}
            <div className="flex flex-col gap-1">
              <RequiredLabel label="Material Amount" />
              <input
                type="number"
                name="materialAmount"
                value={formik.values.materialAmount}
                readOnly
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
              />
              {formik.touched.materialAmount && formik.errors.materialAmount && (
                <p className="text-xs text-red-500">{formik.errors.materialAmount}</p>
              )}
            </div>
          </div>
        </fieldset>
      </form>

      {/* SUBMIT + RESET */}
      <div className="p-3 flex justify-end gap-4 bg-white sticky -bottom-4">
        <button
          type="submit"
          form="updateBill"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Update
        </button>

        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UpdateBillOfMaterials;
