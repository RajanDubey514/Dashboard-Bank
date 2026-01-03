import { Formik, Form } from "formik";
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
  billingAddress: Yup.string().required("Billing Address is required"),
  shippingAddress: Yup.string().required("Shipping Address is required"),
});

// ---------------- SYNC ----------------
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function InvoiceDetails({ onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      initialValues={{
        soNo: "",
        soDate: "",
        salesPerson: "",
        customerName: "",
        paymentTerms: "",
        deliveryPriority: "",
        billingAddress: "",
        shippingAddress: "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl shadow-sm p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* SO No */}
              <div>
                <label className={label}>SO No</label>
                <input
                  name="soNo"
                  value={values.soNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.soNo && errors.soNo && (
                  <p className="text-xs text-red-500">{errors.soNo}</p>
                )}
              </div>

              {/* SO Date */}
              <div>
                <label className={label}>SO Date</label>
                <input
                  type="date"
                  name="soDate"
                  value={values.soDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.soDate && errors.soDate && (
                  <p className="text-xs text-red-500">{errors.soDate}</p>
                )}
              </div>

              {/* Sales Person */}
              <div>
                <label className={label}>Sales Person</label>
                <input
                  name="salesPerson"
                  value={values.salesPerson}
                  onChange={handleChange}
                  className={input}
                />
                {touched.salesPerson && errors.salesPerson && (
                  <p className="text-xs text-red-500">{errors.salesPerson}</p>
                )}
              </div>

              {/* Customer Name */}
              <div>
                <label className={label}>Customer Name</label>
                <input
                  name="customerName"
                  value={values.customerName}
                  onChange={handleChange}
                  className={input}
                />
                {touched.customerName && errors.customerName && (
                  <p className="text-xs text-red-500">{errors.customerName}</p>
                )}
              </div>

              {/* Payment Terms */}
              <div>
                <label className={label}>Payment Terms</label>
                <input
                  name="paymentTerms"
                  value={values.paymentTerms}
                  onChange={handleChange}
                  className={input}
                />
                {touched.paymentTerms && errors.paymentTerms && (
                  <p className="text-xs text-red-500">{errors.paymentTerms}</p>
                )}
              </div>

              {/* Delivery Priority */}
              <div>
                <label className={label}>Delivery Priority</label>
                <select
                  name="deliveryPriority"
                  value={values.deliveryPriority}
                  onChange={handleChange}
                  className={input}
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {touched.deliveryPriority && errors.deliveryPriority && (
                  <p className="text-xs text-red-500">{errors.deliveryPriority}</p>
                )}
              </div>
              

              {/* Billing Address */}
              <div className="lg:col-span-1">
                <label className={label}>Billing Address</label>
                <input
                  name="billingAddress"
                  value={values.billingAddress}
                  onChange={handleChange}
                  className={input}
                />
                {touched.billingAddress && errors.billingAddress && (
                  <p className="text-xs text-red-500">{errors.billingAddress}</p>
                )}
              </div>

              {/* Shipping Address */}
              <div className="lg:col-span-1">
                <label className={label}>Shipping Address</label>
                <input
                  name="shippingAddress"
                  value={values.shippingAddress}
                  onChange={handleChange}
                  className={input}
                />
                {touched.shippingAddress && errors.shippingAddress && (
                  <p className="text-xs text-red-500">{errors.shippingAddress}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
