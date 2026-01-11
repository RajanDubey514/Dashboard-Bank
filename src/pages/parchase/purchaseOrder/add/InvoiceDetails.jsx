import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ================== Validation Schema ================== */
const POSchema = Yup.object({
  poNo: Yup.string().required("PO number is required"),

  supplierName: Yup.string().required("Supplier name is required"),

  paymentTerms: Yup.string().required("Payment terms are required"),

  deliveryLocation: Yup.string().required("Delivery location is required"),

  poDate: Yup.date()
    .required("PO date is required")
    .typeError("Invalid date"),

  expectedDate: Yup.date()
    .required("Expected date is required")
    .min(Yup.ref("poDate"), "Expected date cannot be before PO date")
    .typeError("Invalid date"),

  gstNo: Yup.string()
    .matches(
      // /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number"
    )
    .required("GST number is required"),

  status: Yup.string()
    .oneOf(["open", "fail", "inprocess"], "Invalid status")
    .required("Status is required"),
});

/* ================== Sync Values ================== */
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

/* ================== Main Component ================== */
export default function PODetails({ onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      initialValues={{
        poNo: "",
        supplierName: "",
        paymentTerms: "",
        deliveryLocation: "",
        poDate: "",
        expectedDate: "",
        gstNo: "",
        status: "open",
      }}
      validationSchema={POSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl ">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">

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

              {/* Supplier Name */}
              <div>
                <label className={label}>Supplier Name</label>
                <input
                  name="supplierName"
                  value={values.supplierName}
                  onChange={handleChange}
                  className={input}
                />
                {touched.supplierName && errors.supplierName && (
                  <p className="text-xs text-red-500">{errors.supplierName}</p>
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

              {/* Delivery Location */}
              <div>
                <label className={label}>Delivery Location</label>
                <input
                  name="deliveryLocation"
                  value={values.deliveryLocation}
                  onChange={handleChange}
                  className={input}
                />
                {touched.deliveryLocation && errors.deliveryLocation && (
                  <p className="text-xs text-red-500">
                    {errors.deliveryLocation}
                  </p>
                )}
              </div>

              {/* PO Date */}
              <div>
                <label className={label}>PO Date</label>
                <input
                  type="date"
                  name="poDate"
                  value={values.poDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.poDate && errors.poDate && (
                  <p className="text-xs text-red-500">{errors.poDate}</p>
                )}
              </div>

              {/* Expected Date */}
              <div>
                <label className={label}>Expected Date</label>
                <input
                  type="date"
                  name="expectedDate"
                  value={values.expectedDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.expectedDate && errors.expectedDate && (
                  <p className="text-xs text-red-500">{errors.expectedDate}</p>
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

              {/* Status */}
              <div>
                <label className={label}>Status</label>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className={input}
                >
                  <option value="open">Open</option>
                  <option value="inprocess">In Process</option>
                  <option value="fail">Fail</option>
                </select>
                {touched.status && errors.status && (
                  <p className="text-xs text-red-500">{errors.status}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}



