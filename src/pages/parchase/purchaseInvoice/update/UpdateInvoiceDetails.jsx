import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ---------------- VALIDATION ---------------- */
const InvoiceSchema = Yup.object({
  invoiceNo: Yup.string().required("Invoice number is required"),

  supplier: Yup.string().required("Supplier is required"),

  gstNo: Yup.string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number"
    )
    .required("GST number is required"),

  poNo: Yup.string().required("PO number is required"),

  grnNo: Yup.string().required("GRN number is required"),

  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date"),
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
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        invoiceNo: value?.invoiceNo || "",
        supplier: value?.supplier || "",
        gstNo: value?.gstNo || "",
        poNo: value?.poNo || "",
        grnNo: value?.grnNo || "",
        date: value?.date || "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="bg-white rounded-xl">
          <SyncValues values={values} onChange={onChange} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

            {/* GST No */}
            <div>
              <label className={label}>GST No</label>
              <Field name="gstNo" className={input} />
              <ErrorMessage
                name="gstNo"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* PO No */}
            <div>
              <label className={label}>PO No</label>
              <Field name="poNo" className={input} />
              <ErrorMessage
                name="poNo"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {/* GRN No */}
            <div>
              <label className={label}>GRN No</label>
              <Field name="grnNo" className={input} />
              <ErrorMessage
                name="grnNo"
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
          </div>
        </Form>
      )}
    </Formik>
  );
}
