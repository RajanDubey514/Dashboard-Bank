import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

// ---------------- VALIDATION ----------------
const InvoiceSchema = Yup.object({
  soNo: Yup.string().required("SO No is required"),
  soDate: Yup.string().required("SO Date is required"),
  salesPerson: Yup.string().required("Sales Person is required"),
  customerName: Yup.string().required("Customer Name is required"),
  paymentTerms: Yup.string().required("Payment Terms is required"),
  deliveryPriority: Yup.string().required("Delivery Priority is required"),
});

// ---------------- SYNC HELPER ----------------
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function UpdateInvoiceDetails({ value = {}, onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        soNo: value.soNo || "",
        soDate: value.soDate || "",
        salesPerson: value.salesPerson || "",
        customerName: value.customerName || "",
        paymentTerms: value.paymentTerms || "",
        deliveryPriority: value.deliveryPriority || "",
        billingAddress: value.billingAddress || "",
        shippingAddress: value.shippingAddress || "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="bg-white rounded-xl shadow-sm p-4">
          <SyncValues values={values} onChange={onChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* SO No */}
            <div>
              <label className={label}>SO No</label>
              <Field name="soNo" className={input} />
              <ErrorMessage name="soNo" component="div" className="text-xs text-red-500" />
            </div>

            {/* SO Date */}
            <div>
              <label className={label}>SO Date</label>
              <Field type="date" name="soDate" className={input} />
              <ErrorMessage name="soDate" component="div" className="text-xs text-red-500" />
            </div>

            {/* Sales Person */}
            <div>
              <label className={label}>Sales Person</label>
              <Field name="salesPerson" className={input} />
              <ErrorMessage name="salesPerson" component="div" className="text-xs text-red-500" />
            </div>

            {/* Customer Name */}
            <div>
              <label className={label}>Customer Name</label>
              <Field name="customerName" className={input} />
              <ErrorMessage name="customerName" component="div" className="text-xs text-red-500" />
            </div>

            {/* Payment Terms */}
            <div>
              <label className={label}>Payment Terms</label>
              <Field name="paymentTerms" className={input} />
              <ErrorMessage name="paymentTerms" component="div" className="text-xs text-red-500" />
            </div>

            {/* Delivery Priority */}
            <div>
              <label className={label}>Delivery Priority</label>
              <Field as="select" name="deliveryPriority" className={input}>
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </Field>
              <ErrorMessage name="deliveryPriority" component="div" className="text-xs text-red-500" />
            </div>

            {/* Billing Address */}
            <div className="lg:col-span-2">
              <label className={label}>Billing Address</label>
              <Field name="billingAddress" className={input} />
            </div>

            {/* Shipping Address */}
            <div className="lg:col-span-2">
              <label className={label}>Shipping Address</label>
              <Field name="shippingAddress" className={input} />
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
}
