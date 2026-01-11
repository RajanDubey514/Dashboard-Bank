import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useMemo } from "react";

// ---------------- VALIDATION ----------------
const InvoiceSchema = Yup.object({
  invoiceNo: Yup.string().required("Invoice No is required"),
  invoiceDate: Yup.string().required("Invoice Date is required"),
  dcRef: Yup.string().required("DC Reference is required"),
  gstin: Yup.string().required("GSTIN is required"),
  placeOfSupply: Yup.string().required("Place of Supply is required"),
  dueDate: Yup.string().required("Due Date is required"),
});

// ---------------- SYNC ----------------
function SyncValues({ values, onChange }) {
  const prevValues = useRef(values);

  useEffect(() => {
    if (!onChange) return;

    // Check if any value actually changed
    const changed = Object.keys(values).some(
      (key) => values[key] !== prevValues.current[key]
    );

    if (changed) {
      prevValues.current = values;
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
      invoiceNo: initialValues.invoiceNo ?? "",
      invoiceDate: initialValues.invoiceDate ?? "",
      dcRef: initialValues.dcRef ?? "",
      gstin: initialValues.gstin ?? "",
      placeOfSupply: initialValues.placeOfSupply ?? "",
      dueDate: initialValues.dueDate ?? "",
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
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {Object.keys(formInitialValues).map((key) => (
              <div key={key}>
                <label className={label}>{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  name={key}
                  type={key.toLowerCase().includes("date") ? "date" : "text"}
                  value={values[key]}
                  onChange={handleChange}
                  className={input}
                />
                {touched[key] && errors[key] && (
                  <p className="text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}

          </Form>
        </>
      )}
    </Formik>
  );
}
