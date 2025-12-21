import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ================== Validation Schema ================== */
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
        invoiceNo: "",
        supplier: "",
        gstNo: "",
        poNo: "",
        grnNo: "",
        date: "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl shadow-sm p-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

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

              {/* GST No */}
              <div>
                <label className={label}>GST No</label>
                <input
                  name="gstNo"
                  value={values.gstNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.gstNo && errors.gstNo && (
                  <p className="text-xs text-red-500">{errors.gstNo}</p>
                )}
              </div>

              {/* PO No */}
              <div>
                <label className={label}>PO No</label>
                <input
                  name="poNo"
                  value={values.poNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.poNo && errors.poNo && (
                  <p className="text-xs text-red-500">{errors.poNo}</p>
                )}
              </div>

              {/* GRN No */}
              <div>
                <label className={label}>GRN No</label>
                <input
                  name="grnNo"
                  value={values.grnNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.grnNo && errors.grnNo && (
                  <p className="text-xs text-red-500">{errors.grnNo}</p>
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

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
