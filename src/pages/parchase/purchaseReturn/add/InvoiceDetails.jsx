import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ================== Validation Schema ================== */
const ReturnInvoiceSchema = Yup.object({
  returnNo: Yup.string().required("Return number is required"),

  invoiceNo: Yup.string().required("Invoice number is required"),

  supplier: Yup.string().required("Supplier is required"),

  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date"),

  reason: Yup.string().required("Reason is required"),
});

/* ================== Sync Values ================== */
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

/* ================== Main Component ================== */
export default function InvoiceDetails({ onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      initialValues={{
        returnNo: "",
        invoiceNo: "",
        supplier: "",
        date: "",
        reason: "",
      }}
      validationSchema={ReturnInvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Return No */}
              <div>
                <label className={label}>Return No</label>
                <input
                  name="returnNo"
                  value={values.returnNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.returnNo && errors.returnNo && (
                  <p className="text-xs text-red-500">{errors.returnNo}</p>
                )}
              </div>

              {/* Invoice No */}
              <div>
                <label className={label}>Invoice No</label>
                <input
                  name="invoiceNo"
                  value={values.invoiceNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.invoiceNo && errors.invoiceNo && (
                  <p className="text-xs text-red-500">{errors.invoiceNo}</p>
                )}
              </div>

              {/* Supplier */}
              <div>
                <label className={label}>Supplier</label>
                <input
                  name="supplier"
                  value={values.supplier}
                  onChange={handleChange}
                  className={input}
                />
                {touched.supplier && errors.supplier && (
                  <p className="text-xs text-red-500">{errors.supplier}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className={label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  className={input}
                />
                {touched.date && errors.date && (
                  <p className="text-xs text-red-500">{errors.date}</p>
                )}
              </div>

              {/* Reason */}
              <div className="col-span-2 lg:col-span-2">
                <label className={label}>Reason</label>
                <textarea
                  name="reason"
                  value={values.reason}
                  onChange={handleChange}
                  rows={1}
                  className={input}
                />
                {touched.reason && errors.reason && (
                  <p className="text-xs text-red-500">{errors.reason}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
