import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ---------------- VALIDATION ---------------- */
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
    .oneOf(["open", "fail", "inprocess"])
    .required("Status is required"),
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
export default function UpdatePODetails({ value, onChange }) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        poNo: value?.poNo || "",
        supplierName: value?.supplierName || "",
        paymentTerms: value?.paymentTerms || "",
        deliveryLocation: value?.deliveryLocation || "",
        poDate: value?.poDate || "",
        expectedDate: value?.expectedDate || "",
        gstNo: value?.gstNo || "",
        status: value?.status || "open",
      }}
      validationSchema={POSchema}
      onSubmit={() => {}}
    >
      {({ values }) => {
        const input =
          "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm " +
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

        const label = "text-xs font-semibold text-gray-600 mb-1";

        return (
          <Form className="bg-white rounded-xl ">
            {/* ✅ FIX: pass values */}
            <SyncValues values={values} onChange={onChange} />

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

              {/* PO Date */}
              <div>
                <label className={label}>PO Date</label>
                <Field type="date" name="poDate" className={input} />
                <ErrorMessage
                  name="poDate"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Supplier Name */}
              <div>
                <label className={label}>Supplier Name</label>
                <Field name="supplierName" className={input} />
                <ErrorMessage
                  name="supplierName"
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

              {/* Delivery Location */}
              <div className="">
                <label className={label}>Delivery Location</label>
                <Field name="deliveryLocation" className={input} />
                <ErrorMessage
                  name="deliveryLocation"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Payment Terms */}
              <div>
                <label className={label}>Payment Terms</label>
                <Field name="paymentTerms" className={input} />
                <ErrorMessage
                  name="paymentTerms"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Expected Date */}
              <div>
                <label className={label}>Expected Date</label>
                <Field type="date" name="expectedDate" className={input} />
                <ErrorMessage
                  name="expectedDate"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className={label}>Status</label>
                <Field as="select" name="status" className={input}>
                  <option value="open">Open</option>
                  <option value="inprocess">In Process</option>
                  <option value="fail">Fail</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
