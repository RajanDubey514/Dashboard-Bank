import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

/* ================== Validation Schema ================== */
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

/* ================== Sync Values ================== */
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

/* ================== Main Component ================== */
export default function GRNDetails({ onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      initialValues={{
        grnNo: "",
        vehicleNo: "",
        poNo: "",
        receivedBy: "",
        supplier: "",
        date: "",
      }}
      validationSchema={GRNSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl shadow-sm p-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

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

              {/* Vehicle No */}
              <div>
                <label className={label}>Vehicle No</label>
                <input
                  name="vehicleNo"
                  value={values.vehicleNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.vehicleNo && errors.vehicleNo && (
                  <p className="text-xs text-red-500">{errors.vehicleNo}</p>
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

              {/* Received By */}
              <div>
                <label className={label}>Received By</label>
                <input
                  name="receivedBy"
                  value={values.receivedBy}
                  onChange={handleChange}
                  className={input}
                />
                {touched.receivedBy && errors.receivedBy && (
                  <p className="text-xs text-red-500">{errors.receivedBy}</p>
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
