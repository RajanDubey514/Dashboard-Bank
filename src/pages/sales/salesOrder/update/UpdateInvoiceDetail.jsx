import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";

/* ---------------- SAFE SYNC ---------------- */
function SyncValues({ values, onChange }) {
  const prev = useRef(values);

  useEffect(() => {
    if (!onChange) return;

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

/* ---------------- FIELD CONFIG ---------------- */
const invoiceFields = [
  { name: "soNo", label: "SO No", type: "text" },
  { name: "soDate", label: "SO Date", type: "date" },
  { name: "salesPerson", label: "Sales Person", type: "text" },
  { name: "customerName", label: "Customer Name", type: "text" },
  { name: "paymentTerms", label: "Payment Terms", type: "text" },
  {
    name: "deliveryPriority",
    label: "Delivery Priority",
    type: "select",
    options: ["High", "Medium", "Low"],
  },
  { name: "billingAddress", label: "Billing Address", type: "text" },
  { name: "shippingAddress", label: "Shipping Address", type: "text" },
];

/* ---------------- VALIDATION ---------------- */
const InvoiceSchema = Yup.object(
  invoiceFields.reduce((acc, field) => {
    acc[field.name] = Yup.string().required(`${field.label} is required`);
    return acc;
  }, {})
);

/* ---------------- COMPONENT ---------------- */
export default function UpdateInvoiceDetail({
  initialValues = {},
  onChange,
}) {
  const inputClass =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "text-xs font-semibold text-gray-600 mb-1";

  /* ---------- SAFE PREFILL ---------- */
  const formInitialValues = invoiceFields.reduce((acc, f) => {
    acc[f.name] = initialValues[f.name] ?? "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={InvoiceSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          {/* SYNC TO PARENT */}
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {invoiceFields.map((field) => (
                <div key={field.name}>
                  <label className={labelClass}>{field.label}</label>

                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  )}

                  {touched[field.name] && errors[field.name] && (
                    <p className="text-xs text-red-500">
                      {errors[field.name]}
                    </p>
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
