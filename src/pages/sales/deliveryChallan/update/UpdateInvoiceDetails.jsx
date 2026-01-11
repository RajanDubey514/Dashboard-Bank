import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useRef } from "react";

/* ---------------- VALIDATION ---------------- */
const InvoiceSchema = Yup.object({
  dcNo: Yup.string().required("DC No is required"),
  dcDate: Yup.string().required("DC Date is required"),
  soReference: Yup.string().required("SO Reference is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  vehicleNo: Yup.string().required("Vehicle No is required"),
  transporter: Yup.string().required("Transporter is required"),
});

/* ---------------- SYNC HELPER ---------------- */
function SyncValues({ values, onChange }) {
  const prev = useRef(values);

  useEffect(() => {
    if (!onChange) return;

    const changed = Object.keys(values).some(
      (key) => values[key] !== prev.current[key]
    );

    if (changed) {
      prev.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  return null;
}

/* ---------------- COMPONENT ---------------- */
export default function UpdateInvoiceDetails({
  initialValues = {},
  onChange,
}) {

   const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  const formInitialValues = useMemo(
    () => ({
      dcNo: initialValues.dcNo ?? "",
      dcDate: initialValues.dcDate ?? "",
      soReference: initialValues.soReference ?? "",
      warehouse: initialValues.warehouse ?? "",
      vehicleNo: initialValues.vehicleNo ?? "",
      transporter: initialValues.transporter ?? "",
    }),
    [initialValues]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, handleChange, errors, touched }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(formInitialValues).map((key) => (
              <div key={key}>
                <label className={label}>{key}</label>
                <input
                  name={key}
                  value={values[key]}
                  onChange={handleChange}
                  className={input}
                  type={key === "dcDate" ? "date" : "text"}
                />
                {touched[key] && errors[key] && (
                  <p className="text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
