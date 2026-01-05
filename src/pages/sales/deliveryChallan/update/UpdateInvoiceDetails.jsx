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

          <Form className="bg-white  rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.keys(formInitialValues).map((key) => (
              <div key={key}>
                <label className="text-xs font-semibold capitalize">{key}</label>
                <input
                  name={key}
                  value={values[key]}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 text-sm"
                  type={key === "dcDate" ? "date" : "text"}
                />
                {touched[key] && errors[key] && (
                  <p className="text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}
          </Form>
        </>
      )}
    </Formik>
  );
}
