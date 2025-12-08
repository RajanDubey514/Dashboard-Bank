// UpdateBillOfMaterials.jsx
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { alertSuccess } from "../../../../components/alert/Alert";
import { fakeMainProductData, fakeMaterialList } from "../../../../components/FakeData";

// small required label component
const RequiredLabel = ({ label }) => (
  <label className="text-sm font-medium text-gray-700">
    {label} <span className="text-red-600 ml-1">(*)</span>
  </label>
);

const validationSchema = Yup.object({
  selectedProduct: Yup.string().required("Please select product"),
});

export default function UpdateBillOfMaterials({
  selectedData = null,
  dataList = [],
  setDataList = () => {},
  closeModal = null,
}) {
  // lists
  const [productList, setProductList] = useState([]);
  // table rows (editable)
  const [requiredRows, setRequiredRows] = useState([]);
  const [consumableRows, setConsumableRows] = useState([]);

  // temp storage for adding a required material (selected via react-select)
  const [tempRequiredMat, setTempRequiredMat] = useState(null);
  // temp storage for adding a consumable material
  const [tempConsumableMat, setTempConsumableMat] = useState(null);

  useEffect(() => {
    setProductList(fakeMainProductData || []);
  }, []);

  // initialize tables from selectedData when component mounts / selectedData changes
  useEffect(() => {
    if (!selectedData) {
      setRequiredRows([]);
      setConsumableRows([]);
      return;
    }

    // if selectedData uses the Option A structure, it has requiredRows & consumableRows
    setRequiredRows(
      (selectedData.requiredRows || []).map((r) => ({
        ...r,
      }))
    );

    setConsumableRows(
      (selectedData.consumableRows || []).map((r) => ({
        ...r,
      }))
    );
  }, [selectedData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      selectedProduct: selectedData?.selectedProduct ?? "",
      autoProductCode: selectedData?.autoProductCode ?? "",

      // fields for adding required row
      requiredQty: "",
      // fields for adding consumable row
      materialQty: "",
      materialRate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // build updated item
      const updatedItem = {
        ...selectedData,
        selectedProduct: values.selectedProduct,
        autoProductCode: values.autoProductCode,
        requiredRows,
        consumableRows,
      };

      const updatedList = dataList.map((item) =>
        item.id === selectedData.id ? updatedItem : item
      );

      setDataList(updatedList);
      alertSuccess("Bill of Material updated successfully!");
      if (typeof closeModal === "function") closeModal();
    },
  });

  // when product changes, auto-fill product code (and optional related values)
  useEffect(() => {
    if (!formik.values.selectedProduct) {
      formik.setFieldValue("autoProductCode", "");
      return;
    }
    const selected = productList.find(
      (p) => Number(p.id) === Number(formik.values.selectedProduct)
    );
    if (selected) {
      formik.setFieldValue("autoProductCode", selected.productCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.selectedProduct, productList]);

  /* -------------------------
     Required Material handlers
     ------------------------- */

  // when user picks material from react-select for Required Material
  const onSelectRequiredMaterial = (mat) => {
    if (!mat) {
      setTempRequiredMat(null);
      return;
    }
    setTempRequiredMat({
      id: mat.id,
      name: mat.name,
      code: mat.code,
      unit: mat.unit,
    });
  };

  const addRequiredRow = () => {
    // require a selected material and a qty
    if (!tempRequiredMat || !formik.values.requiredQty) return;

    const newRow = {
      id: Date.now(),
      itemName: tempRequiredMat.name,
      itemCode: tempRequiredMat.code,
      unit: tempRequiredMat.unit,
      quantity: formik.values.requiredQty,
    };

    setRequiredRows((prev) => [...prev, newRow]);

    // reset
    setTempRequiredMat(null);
    formik.setFieldValue("requiredQty", "");
  };

  const deleteRequiredRow = (id) => {
    setRequiredRows((prev) => prev.filter((r) => r.id !== id));
  };

  // update an existing required row field (quantity)
  const updateRequiredRow = (id, field, value) => {
    setRequiredRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  /* -------------------------
     Consumable Material handlers
     ------------------------- */

  const onSelectConsumableMaterial = (mat) => {
    if (!mat) {
      setTempConsumableMat(null);
      return;
    }
    setTempConsumableMat({
      id: mat.id,
      name: mat.name,
      code: mat.code,
      unit: mat.unit,
    });
  };

  const addConsumableRow = () => {
    if (!tempConsumableMat || !formik.values.materialQty || !formik.values.materialRate) return;

    const qty = Number(formik.values.materialQty);
    const rate = Number(formik.values.materialRate);
    const amount = !isNaN(qty) && !isNaN(rate) ? qty * rate : "";

    const newRow = {
      id: Date.now(),
      material: tempConsumableMat.name,
      materialCode: tempConsumableMat.code,
      unit: tempConsumableMat.unit,
      qty: formik.values.materialQty,
      rate: formik.values.materialRate,
      amount,
    };

    setConsumableRows((prev) => [...prev, newRow]);

    // reset
    setTempConsumableMat(null);
    formik.setFieldValue("materialQty", "");
    formik.setFieldValue("materialRate", "");
  };

  const deleteConsumableRow = (id) => {
    setConsumableRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateConsumableRow = (id, field, value) => {
    setConsumableRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [field]: value };
        if (field === "qty" || field === "rate") {
          const qty = Number(field === "qty" ? value : r.qty);
          const rate = Number(field === "rate" ? value : r.rate);
          updated.amount = !isNaN(qty) && !isNaN(rate) ? qty * rate : "";
        }
        return updated;
      })
    );
  };

  /* -------------------------
     react-select helpers
     ------------------------- */
  const materialOptions = (fakeMaterialList || []).map((m) => ({
    ...m,
    label: `${m.name} (${m.code}) — ${m.unit}`,
    value: m.id,
  }));

  const productOptions = (productList || []).map((p) => ({
    label: p.productName,
    value: String(p.id),
    code: p.productCode,
  }));

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <form
        id="updateBill"
        onSubmit={formik.handleSubmit}
        className="space-y-4 overflow-y-auto"
      >
        {/* Manufacturing Item */}
        <fieldset className="border border-gray-200 rounded-md bg-gray-50">
          <legend className="px-2 text-md font-semibold text-indigo-700">Manufacturing Item</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
            <div>
              <RequiredLabel label="Product Name" />
              <Select
                options={productOptions}
                value={productOptions.find((o) => o.value === String(formik.values.selectedProduct)) || null}
                onChange={(opt) => {
                  formik.setFieldValue("selectedProduct", opt ? opt.value : "");
                  formik.setFieldValue("autoProductCode", opt ? opt.code : "");
                }}
                isClearable
                placeholder="Select product..."
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
              />
              {formik.touched.selectedProduct && formik.errors.selectedProduct && (
                <div className="text-xs text-red-600 mt-1">{formik.errors.selectedProduct}</div>
              )}
            </div>

            <div>
              <RequiredLabel label="Product Code" />
              <input
                readOnly
                value={formik.values.autoProductCode}
                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
              />
            </div>
          </div>
        </fieldset>

        {/* Required Material */}
        <fieldset className="border border-gray-200 rounded-md bg-gray-50">
          <legend className="px-2 text-md font-semibold text-indigo-700">Required Material</legend>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end p-3">
            <div className="md:col-span-2">
              <RequiredLabel label="Item Name" />
              <Select
                options={materialOptions}
                value={tempRequiredMat ? { ...tempRequiredMat, label: `${tempRequiredMat.name} (${tempRequiredMat.code})`, value: tempRequiredMat.id } : null}
                onChange={(sel) => onSelectRequiredMaterial(sel ? { id: sel.value, name: sel.name, code: sel.code, unit: sel.unit } : null)}
                isClearable
                placeholder="Select item..."
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                getOptionLabel={(o) => o.label}
                getOptionValue={(o) => o.value}
              />
            </div>

            <div>
              <RequiredLabel label="Item Code" />
              <input
                type="text"
                readOnly
                value={tempRequiredMat?.code || ""}
                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <RequiredLabel label="Unit" />
              <input
                type="text"
                readOnly
                value={tempRequiredMat?.unit || ""}
                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div>
              <RequiredLabel label="Qty" />
              <input
                type="number"
                value={formik.values.requiredQty}
                onChange={(e) => formik.setFieldValue("requiredQty", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={addRequiredRow}
                className="w-full bg-green-600 text-white rounded px-3 py-2"
              >
                Add
              </button>
            </div>
          </div>

          {/* Required Rows table */}
          <div className="p-3">
            {requiredRows.length === 0 ? (
              <div className="text-sm text-gray-500">No required materials added.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border text-left">Item Name</th>
                      <th className="p-2 border text-left">Item Code</th>
                      <th className="p-2 border text-left">Unit</th>
                      <th className="p-2 border text-left w-28">Qty</th>
                      <th className="p-2 border text-left w-28">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requiredRows.map((r) => (
                      <tr key={r.id}>
                        <td className="p-2 border">{r.itemName}</td>
                        <td className="p-2 border">{r.itemCode}</td>
                        <td className="p-2 border">{r.unit}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={r.quantity}
                            onChange={(e) => updateRequiredRow(r.id, "quantity", e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2 border">
                          <button
                            type="button"
                            onClick={() => deleteRequiredRow(r.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </fieldset>

        {/* Consumable Material */}
        <fieldset className="border border-gray-200 rounded-md bg-gray-50">
          <legend className="px-2 text-md font-semibold text-indigo-700">Consumable Material</legend>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end p-3">
            <div>
              <RequiredLabel label="Material" />
              <Select
                options={materialOptions}
                value={tempConsumableMat ? { ...tempConsumableMat, label: `${tempConsumableMat.name} (${tempConsumableMat.code})`, value: tempConsumableMat.id } : null}
                onChange={(sel) => onSelectConsumableMaterial(sel ? { id: sel.value, name: sel.name, code: sel.code, unit: sel.unit } : null)}
                isClearable
                placeholder="Select material..."
                styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                getOptionLabel={(o) => o.label}
                getOptionValue={(o) => o.value}
              />
            </div>

            <div>
              <RequiredLabel label="Qty" />
              <input
                type="number"
                value={formik.values.materialQty}
                onChange={(e) => formik.setFieldValue("materialQty", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <RequiredLabel label="Rate" />
              <input
                type="number"
                value={formik.values.materialRate}
                onChange={(e) => formik.setFieldValue("materialRate", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <RequiredLabel label="Amount" />
              <input
                type="number"
                value={
                  formik.values.materialQty && formik.values.materialRate
                    ? Number(formik.values.materialQty) * Number(formik.values.materialRate)
                    : ""
                }
                readOnly
                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
                placeholder="0"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={addConsumableRow}
                className="w-full bg-green-600 text-white rounded px-3 py-2"
              >
                Add
              </button>
            </div>
          </div>

          <div className="p-3">
            {consumableRows.length === 0 ? (
              <div className="text-sm text-gray-500">No consumable materials added.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border text-left">Material</th>
                      <th className="p-2 border text-left">Code</th>
                      <th className="p-2 border text-left">Unit</th>
                      <th className="p-2 border text-left w-28">Qty</th>
                      <th className="p-2 border text-left w-28">Rate</th>
                      <th className="p-2 border text-left w-28">Amount</th>
                      <th className="p-2 border text-left w-28">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumableRows.map((r) => (
                      <tr key={r.id}>
                        <td className="p-2 border">{r.material}</td>
                        <td className="p-2 border">{r.materialCode || ""}</td>
                        <td className="p-2 border">{r.unit || ""}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={r.qty}
                            onChange={(e) => updateConsumableRow(r.id, "qty", e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={r.rate}
                            onChange={(e) => updateConsumableRow(r.id, "rate", e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm"
                          />
                        </td>
                        <td className="p-2 border">{r.amount}</td>
                        <td className="p-2 border">
                          <button
                            type="button"
                            onClick={() => deleteConsumableRow(r.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </fieldset>
      </form>

      {/* footer actions */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={() => formik.handleSubmit()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>

        <button
          type="button"
          onClick={() => {
            // reset to original selectedData values
            formik.resetForm();
            setRequiredRows(selectedData?.requiredRows || []);
            setConsumableRows(selectedData?.consumableRows || []);
            setTempRequiredMat(null);
            setTempConsumableMat(null);
          }}
          className="border border-red-500 text-red-600 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
