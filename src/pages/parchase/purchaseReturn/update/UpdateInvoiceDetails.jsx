import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ---------------- VALIDATION ---------------- */
const InvoiceSchema = Yup.object({
  returnNo: Yup.string().required("Return number is required"),
  invoiceNo: Yup.string().required("Invoice number is required"),
  supplier: Yup.string().required("Supplier is required"),
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date"),
  reason: Yup.string().required("Reason is required"),
});

/* ---------------- SYNC HELPER ---------------- */
function SyncValues({ values, onChange }) {
  useEffect(() => {
    if (!values) return;
    onChange(values);
  }, [values, onChange]);

  return null;
}

/* ---------------- COMPONENT ---------------- */
export default function UpdateInvoiceDetails({ value, onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        returnNo: value?.returnNo || "",
        invoiceNo: value?.invoiceNo || "",
        supplier: value?.supplier || "",
        date: value?.date || "",
        reason: value?.reason || "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="bg-white rounded-xl">
          <SyncValues values={values} onChange={onChange} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {/* Return No */}
            <div>
              <label className={label}>Return No</label>
              <Field name="returnNo" className={input} />
              <ErrorMessage
                name="returnNo"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* Invoice No */}
            <div>
              <label className={label}>Invoice No</label>
              <Field name="invoiceNo" className={input} />
              <ErrorMessage
                name="invoiceNo"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* Supplier */}
            <div>
              <label className={label}>Supplier</label>
              <Field name="supplier" className={input} />
              <ErrorMessage
                name="supplier"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className={label}>Date</label>
              <Field type="date" name="date" className={input} />
              <ErrorMessage
                name="date"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* Reason */}
            <div className="col-span-2 lg:col-span-4">
              <label className={label}>Reason</label>
              <Field
                as="textarea"
                name="reason"
                rows={2}
                className={input}
              />
              <ErrorMessage
                name="reason"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
}
