import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fakeMainProductData,
  fakeMaterialList,
  fakeConsumableMaterialList
} from "../../../../components/FakeData";
import { alertSuccess } from "../../../../components/alert/Alert";

import ProductDetails from "./BoiProductDetails";
import ConsumableTable from "./BoiConsumableTable";
import ManufacturingTable from "./BoiManufacturingTable";

export default function MainProduct({ dataList, setDataList, onClose }) {
  const [productList, setProductList] = useState([]);
  const [consumableRows, setConsumableRows] = useState([]);
  const [manufacturingRows, setManufacturingRows] = useState([]);

  useEffect(() => {
    setProductList(fakeMainProductData);
  }, []);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      const finalData = {
        id: Date.now(),
        productName: values.productName,
        productCode: values.productCode,
        consumables: consumableRows,
        manufacturing: manufacturingRows,
      };

      // 🔥 ADD NEW BOM TO PARENT LIST
      setDataList((prev) => [finalData, ...prev]);

      alertSuccess("Product Saved Successfully!");

      onClose(); // Close modal
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setConsumableRows([]);
    setManufacturingRows([]);
  };

  return (
    <div className="relative p-4 pb-24 space-y-6">

      <ProductDetails
        productList={productList}
        formik={formik}
      />

      <ConsumableTable
        rows={consumableRows}
        setRows={setConsumableRows}
        materialList={fakeMaterialList}
        fakeConsumableMaterialList={fakeConsumableMaterialList}
      />

      <ManufacturingTable
        rows={manufacturingRows}
        setRows={setManufacturingRows}
      />

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-end gap-4">
        <button
          className="bg-gray-600 text-xs text-white px-6 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          className="bg-green-600 text-xs text-white px-6 py-2 rounded"
          onClick={formik.handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
