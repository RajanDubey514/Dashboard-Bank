import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const InvoiceSchema = Yup.object({
  invNo: Yup.string().required("Invoice number is required"),
  invDate: Yup.string().required("Invoice date is required"),
  dueDays: Yup.number()
    .typeError("Must be a number")
    .min(0, "Invalid days"),
  customerName: Yup.string().required("Customer name required"),
  mobile: Yup.string().required("Mobile required"),
  address: Yup.string().required("Address required"),
});

function SyncValues({ values, onChange, setFieldValue }) {
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  useEffect(() => {
    if (values.invDate && values.dueDays !== "") {
      const d = new Date(values.invDate);
      d.setDate(d.getDate() + Number(values.dueDays));
      setFieldValue("dueDate", d.toISOString().slice(0, 10));
    }
  }, [values.invDate, values.dueDays, setFieldValue]);

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
        invNo: "",
        invDate: "",
        dueDays: "",
        dueDate: "",
        customerName: "",
        mobile: "",
        address: "",
      }}
      validationSchema={InvoiceSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <>
          <SyncValues
            values={values}
            onChange={onChange}
            setFieldValue={setFieldValue}
          />

          <Form className="bg-white rounded-xl shadow-sm p-3">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">

              {/* Invoice No */}
              <div>
                <label className={label}>Invoice No</label>
                <input
                  name="invNo"
                  value={values.invNo}
                  onChange={handleChange}
                  className={input}
                />
                {touched.invNo && errors.invNo && (
                  <p className="text-xs text-red-500">{errors.invNo}</p>
                )}
              </div>

              {/* Invoice Date */}
              <div>
                <label className={label}>Invoice Date</label>
                <input
                  type="date"
                  name="invDate"
                  value={values.invDate}
                  onChange={handleChange}
                  className={input}
                />
                {touched.invDate && errors.invDate && (
                  <p className="text-xs text-red-500">{errors.invDate}</p>
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

              {/* Mobile */}
              <div>
                <label className={label}>Mobile No</label>
                <input
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  className={input}
                />
                {touched.mobile && errors.mobile && (
                  <p className="text-xs text-red-500">{errors.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div className="lg:col-span-2">
                <label className={label}>Address</label>
                <input
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  className={input}
                />
                {touched.address && errors.address && (
                  <p className="text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Due Days */}
              <div>
                <label className={label}>Due Days</label>
                <input
                  name="dueDays"
                  value={values.dueDays}
                  onChange={handleChange}
                  className={input}
                />
                {touched.dueDays && errors.dueDays && (
                  <p className="text-xs text-red-500">{errors.dueDays}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className={label}>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={values.dueDate}
                  readOnly
                  className={`${input} bg-gray-100`}
                />
              </div>

            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
