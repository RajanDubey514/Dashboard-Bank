import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

// ---------------- VALIDATION ----------------
const ReturnSchema = Yup.object({
  returnNo: Yup.string().required("Return No is required"),
  returnDate: Yup.string().required("Return Date is required"),
  invoiceRef: Yup.string().required("Invoice Reference is required"),
  returnReason: Yup.string().required("Return Reason is required"),
  qcRemark: Yup.string().required("QC Remark is required"),
  returnWarehouse: Yup.string().required("Return Warehouse is required"),
});

// ---------------- SYNC ----------------
function SyncValues({ values, onChange }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}

// ---------------- COMPONENT ----------------
export default function ReturnDetails({ onChange, value = {} }) {
  const input =
    "w-full rounded-md border border-gray-300 px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  const label = "text-xs font-semibold text-gray-600 mb-1";

  return (
    <Formik
      enableReinitialize
      initialValues={{
        returnNo: value.returnNo || "",
        returnDate: value.returnDate || "",
        invoiceRef: value.invoiceRef || "",
        returnReason: value.returnReason || "",
        qcRemark: value.qcRemark || "",
        returnWarehouse: value.returnWarehouse || "",
      }}
      validationSchema={ReturnSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange }) => (
        <>
          <SyncValues values={values} onChange={onChange} />

          <Form className="bg-white rounded-xl ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Return No */}
              <div>
                <label className={label}>Return No</label>
                <input
                  name="returnNo"
                  value={values.returnNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.returnNo && errors.returnNo && (
                  <p className="text-xs text-red-500">{errors.returnNo}</p>
                )}
              </div>

              {/* Return Date */}
              <div>
                <label className={label}>Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={values.returnDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.returnDate && errors.returnDate && (
                  <p className="text-xs text-red-500">{errors.returnDate}</p>
                )}
              </div>

              {/* Invoice Reference */}
              <div>
                <label className={label}>Invoice Reference</label>
                <input
                  name="invoiceRef"
                  value={values.invoiceRef}
                  onChange={handleChange}
                  className={input}
                />
                {touched.invoiceRef && errors.invoiceRef && (
                  <p className="text-xs text-red-500">{errors.invoiceRef}</p>
                )}
              </div>

              {/* Return Reason */}
              <div>
                <label className={label}>Return Reason</label>
                <input
                  name="returnReason"
                  value={values.returnReason}
                  onChange={handleChange}
                  className={input}
                />
                {touched.returnReason && errors.returnReason && (
                  <p className="text-xs text-red-500">{errors.returnReason}</p>
                )}
              </div>

              {/* QC Remark */}
              <div>
                <label className={label}>QC Remark</label>
                <input
                  name="qcRemark"
                  value={values.qcRemark}
                  onChange={handleChange}
                  className={input}
                />
                {touched.qcRemark && errors.qcRemark && (
                  <p className="text-xs text-red-500">{errors.qcRemark}</p>
                )}
              </div>

              {/* Return Warehouse */}
              <div>
                <label className={label}>Return Warehouse</label>
                <input
                  name="returnWarehouse"
                  value={values.returnWarehouse}
                  onChange={handleChange}
                  className={input}
                />
                {touched.returnWarehouse && errors.returnWarehouse && (
                  <p className="text-xs text-red-500">{errors.returnWarehouse}</p>
                )}
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
