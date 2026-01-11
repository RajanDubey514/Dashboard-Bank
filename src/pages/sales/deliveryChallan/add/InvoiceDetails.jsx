import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const InvoiceSchema = Yup.object({
  dcNo: Yup.string().required("DC No is required"),
  dcDate: Yup.string().required("DC Date is required"),
  soReference: Yup.string().required("SO Reference is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  vehicleNo: Yup.string().required("Vehicle No is required"),
  transporter: Yup.string().required("Transporter is required"),
});

function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

export default function InvoiceDetails({ onChange }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      initialValues={{
        dcNo: "",
        dcDate: "",
        soReference: "",
        warehouse: "",
        vehicleNo: "",
        transporter: "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* DC No */}
              <div>
                <label className={label}>DC No</label>
                <input
                  name="dcNo"
                  value={values.dcNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.dcNo && errors.dcNo && (
                  <p className="text-xs text-red-500">{errors.dcNo}</p>
                )}
              </div>

              {/* DC Date */}
              <div>
                <label className={label}>DC Date</label>
                <input
                  type="date"
                  name="dcDate"
                  value={values.dcDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.dcDate && errors.dcDate && (
                  <p className="text-xs text-red-500">{errors.dcDate}</p>
                )}
              </div>

              {/* SO Reference */}
              <div>
                <label className={label}>SO Reference</label>
                <input
                  name="soReference"
                  value={values.soReference}
                  onChange={handleChange}
                  className={input}
                />
                {touched.soReference && errors.soReference && (
                  <p className="text-xs text-red-500">{errors.soReference}</p>
                )}
              </div>

              {/* Warehouse */}
              <div>
                <label className={label}>Warehouse</label>
                <input
                  name="warehouse"
                  value={values.warehouse}
                  onChange={handleChange}
                  className={input}
                />
                {touched.warehouse && errors.warehouse && (
                  <p className="text-xs text-red-500">{errors.warehouse}</p>
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

              {/* Transporter */}
              <div>
                <label className={label}>Transporter</label>
                <input
                  name="transporter"
                  value={values.transporter}
                  onChange={handleChange}
                  className={input}
                />
                {touched.transporter && errors.transporter && (
                  <p className="text-xs text-red-500">{errors.transporter}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
