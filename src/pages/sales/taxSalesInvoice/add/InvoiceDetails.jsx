import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

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
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function InvoiceDetails({ onChange, value = {} }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        invoiceNo: value.invoiceNo || "",
        invoiceDate: value.invoiceDate || "",
        dcRef: value.dcRef || "",
        gstin: value.gstin || "",
        placeOfSupply: value.placeOfSupply || "",
        dueDate: value.dueDate || "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl shadow-sm ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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

              {/* Invoice Date */}
              <div>
                <label className={label}>Invoice Date</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={values.invoiceDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.invoiceDate && errors.invoiceDate && (
                  <p className="text-xs text-red-500">{errors.invoiceDate}</p>
                )}
              </div>

              {/* DC Reference */}
              <div>
                <label className={label}>DC Reference</label>
                <input
                  name="dcRef"
                  value={values.dcRef}
                  onChange={handleChange}
                  className={input}
                />
                {touched.dcRef && errors.dcRef && (
                  <p className="text-xs text-red-500">{errors.dcRef}</p>
                )}
              </div>

              {/* GSTIN */}
              <div>
                <label className={label}>GSTIN</label>
                <input
                  name="gstin"
                  value={values.gstin}
                  onChange={handleChange}
                  className={input}
                />
                {touched.gstin && errors.gstin && (
                  <p className="text-xs text-red-500">{errors.gstin}</p>
                )}
              </div>

              {/* Place of Supply */}
              <div>
                <label className={label}>Place of Supply</label>
                <input
                  name="placeOfSupply"
                  value={values.placeOfSupply}
                  onChange={handleChange}
                  className={input}
                />
                {touched.placeOfSupply && errors.placeOfSupply && (
                  <p className="text-xs text-red-500">{errors.placeOfSupply}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className={label}>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={values.dueDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.dueDate && errors.dueDate && (
                  <p className="text-xs text-red-500">{errors.dueDate}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
