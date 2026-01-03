import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

// ---------------- VALIDATION ----------------
const DCSchema = Yup.object({
  dcNo: Yup.string().required("DC No is required"),
  dcDate: Yup.string().required("DC Date is required"),
  soReference: Yup.string().required("SO Reference is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  vehicleNo: Yup.string().required("Vehicle No is required"),
  transporter: Yup.string().required("Transporter is required"),
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
    "w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        dcNo: value.dcNo || "",
        dcDate: value.dcDate || "",
        soReference: value.soReference || "",
        warehouse: value.warehouse || "",
        vehicleNo: value.vehicleNo || "",
        transporter: value.transporter || "",
      }}
      validationSchema={DCSchema}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="bg-white rounded-xl shadow-sm p-4">
          <SyncValues values={values} onChange={onChange} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* DC No */}
            <div>
              <label className={label}>DC No</label>
              <Field name="dcNo" className={input} />
              <ErrorMessage name="dcNo" component="div" className="text-xs text-red-500" />
            </div>

            {/* DC Date */}
            <div>
              <label className={label}>DC Date</label>
              <Field type="date" name="dcDate" className={input} />
              <ErrorMessage name="dcDate" component="div" className="text-xs text-red-500" />
            </div>

            {/* SO Reference */}
            <div>
              <label className={label}>SO Reference</label>
              <Field name="soReference" className={input} />
              <ErrorMessage name="soReference" component="div" className="text-xs text-red-500" />
            </div>

            {/* Warehouse */}
            <div>
              <label className={label}>Warehouse</label>
              <Field name="warehouse" className={input} />
              <ErrorMessage name="warehouse" component="div" className="text-xs text-red-500" />
            </div>

            {/* Vehicle No */}
            <div>
              <label className={label}>Vehicle No</label>
              <Field name="vehicleNo" className={input} />
              <ErrorMessage name="vehicleNo" component="div" className="text-xs text-red-500" />
            </div>

            {/* Transporter */}
            <div>
              <label className={label}>Transporter</label>
              <Field name="transporter" className={input} />
              <ErrorMessage name="transporter" component="div" className="text-xs text-red-500" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
