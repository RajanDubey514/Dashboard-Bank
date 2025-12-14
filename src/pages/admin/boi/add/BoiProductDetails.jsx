import React from "react";
import Select from "react-select";

export default function BoiProductDetails({ productList, formik }) {
  // Convert product list to react-select options
  const productOptions = productList.map((p) => ({
    value: p.productName,
    label: p.productName,
    code: p.productCode,
  }));

  // Find currently selected option for formik.productName
  const selectedOption = productOptions.find(
    (opt) => opt.value === formik.values.productName
  ) || null;

  return (
    <fieldset className="border p-4 rounded-lg">
      <legend className="text-xs font-semibold px-2">Product Details</legend>

      <div className="grid grid-cols-2 gap-4 mt-3">
        
        {/* Product Name Dropdown */}
        <div>
          <label className="text-xs font-medium mb-1 block">Product Name</label>
          <Select
            className="text-sm"
            value={selectedOption}
            options={productOptions}
            onChange={(selected) => {
              formik.setFieldValue("productName", selected.value);
              formik.setFieldValue("productCode", selected.code);
            }}
            placeholder="Select product..."
          />
        </div>

        {/* Auto-Filled Product Code */}
        <div>
          <label className="text-xs font-medium mb-1 block">Product Code</label>
          <input
            type="text"
            className="w-full text-sm border rounded px-2 py-2 bg-gray-100"
            value={formik.values.productCode}
            readOnly
          />
        </div>

      </div>
    </fieldset>
  );
}
