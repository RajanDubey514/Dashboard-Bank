import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useMemo } from "react";

// ---------------- VALIDATION ----------------
const ReturnSchema = Yup.object({
  returnNo: Yup.string().required("Return No is required"),
  returnDate: Yup.string().required("Return Date is required"),
  invoiceRef: Yup.string().required("Invoice Reference is required"),
  returnReason: Yup.string().required("Return Reason is required"),
  qcRemark: Yup.string().required("QC Remark is required"),
  returnWarehouse: Yup.string().required("Return Warehouse is required"),
});

// ---------------- SYNC ----------------
function SyncValues({ values, onChange }) {
  const prev = useRef(values);

  useEffect(() => {
    if (!onChange) return;

    // Only call onChange if values actually changed
    const changed = Object.keys(values).some(
      (key) => values[key] !== prev.current[key]
    );

    if (changed) {
      prev.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function UpdateInvoiceDetails({ onChange, initialValues = {} }) {
  // Memoize initial values to avoid re-init loops
  const formInitialValues = useMemo(
    () => ({
      returnNo: initialValues.returnNo ?? "",
      returnDate: initialValues.returnDate ?? "",
      invoiceRef: initialValues.invoiceRef ?? "",
      returnReason: initialValues.returnReason ?? "",
      qcRemark: initialValues.qcRemark ?? "",
      returnWarehouse: initialValues.returnWarehouse ?? "",
    }),
    [initialValues]
  );

  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";
  const label = "text-xs font-semibold text-gray-600 mb-1 capitalize";

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      validationSchema={ReturnSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(formInitialValues).map((key) => (
                <div key={key}>
                  <label className={label}>{key}</label>
                  <input
                    name={key}
                    value={values[key]}
                    onChange={handleChange}
                    className={input}
                    type={key === "returnDate" ? "date" : "text"}
                  />
                  {touched[key] && errors[key] && (
                    <p className="text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
