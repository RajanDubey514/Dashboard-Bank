import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ---------------- VALIDATION ---------------- */
const GRNSchema = Yup.object({
  grnNo: Yup.string().required("GRN number is required"),
  vehicleNo: Yup.string().required("Vehicle number is required"),
  poNo: Yup.string().required("PO number is required"),
  receivedBy: Yup.string().required("Received by is required"),
  supplier: Yup.string().required("Supplier is required"),
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
export default function UpdateGRNDetails({ value, onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        grnNo: value?.grnNo || "",
        vehicleNo: value?.vehicleNo || "",
        poNo: value?.poNo || "",
        receivedBy: value?.receivedBy || "",
        supplier: value?.supplier || "",
        date: value?.date || "",
      }}
      validationSchema={GRNSchema}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="bg-white rounded-xl shadow-sm p-4">
          <SyncValues values={values} onChange={onChange} />

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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

            {/* Vehicle No */}
            <div>
              <label className={label}>Vehicle No</label>
              <Field name="vehicleNo" className={input} />
              <ErrorMessage
                name="vehicleNo"
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

            {/* Received By */}
            <div>
              <label className={label}>Received By</label>
              <Field name="receivedBy" className={input} />
              <ErrorMessage
                name="receivedBy"
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
          </div>
        </Form>
      )}
    </Formik>
  );
}
