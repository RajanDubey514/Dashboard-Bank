import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

// ---------------- VALIDATION ----------------
const InvoiceSchema = Yup.object({
  invNo: Yup.string().required("Invoice number is required"),
  invDate: Yup.string().required("Invoice date is required"),
  dueDays: Yup.number()
    .typeError("Must be a number")
    .min(0, "Invalid days"),
});

// ---------------- SYNC HELPER ----------------
function SyncValues({ values, onChange, setFieldValue }) {
  useEffect(() => {
    // Auto-calc dueDate
    if (values.invDate && values.dueDays !== "") {
      const d = new Date(values.invDate);
      d.setDate(d.getDate() + Number(values.dueDays));
      const newDueDate = d.toISOString().slice(0, 10);
      if (values.dueDate !== newDueDate) {
        setFieldValue("dueDate", newDueDate);
      }
    }
    // Sync parent if any value changed
    onChange(values);
  }, [values, onChange, setFieldValue]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function UpdateInvoiceDetails({ value = {}, onChange }) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        invNo: value.invNo || "",
        invDate: value.invDate || "",
        dueDays: value.dueDays || "",
        dueDate: value.dueDate || "",
        customerName: value.customerName || "",
        mobile: value.mobile || "",
        address: value.address || "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => {
        const input =
          "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
        const label = "text-xs font-semibold text-gray-600 mb-1";

        return (
          <Form className="bg-white rounded-xl shadow-sm p-4">
            <SyncValues values={values} onChange={onChange} setFieldValue={setFieldValue} />

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className={label}>Invoice No</label>
                <Field name="invNo" className={input} />
                <ErrorMessage name="invNo" component="div" className="text-xs text-red-500 mt-0.5" />
              </div>

              <div>
                <label className={label}>Invoice Date</label>
                <Field type="date" name="invDate" className={input} />
                <ErrorMessage name="invDate" component="div" className="text-xs text-red-500 mt-0.5" />
              </div>

              <div>
                <label className={label}>Customer Name</label>
                <Field name="customerName" className={input} />
              </div>

              <div>
                <label className={label}>Mobile No</label>
                <Field name="mobile" className={input} />
              </div>

              <div className="lg:col-span-2">
                <label className={label}>Address</label>
                <Field name="address" className={input} />
              </div>

              <div>
                <label className={label}>Due Days</label>
                <Field name="dueDays" className={input} />
                <ErrorMessage name="dueDays" component="div" className="text-xs text-red-500 mt-0.5" />
              </div>

              <div>
                <label className={label}>Due Date</label>
                <Field
                  name="dueDate"
                  type="date"
                  readOnly
                  className={`${input} bg-gray-100 cursor-not-allowed`}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
