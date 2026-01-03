import { useEffect } from "react";
import Select from "react-select";

/* =========================
   ADD INVOICE
========================= */
export default function AddInvoice({ invoiceData, setInvoiceData }) {
  const handleChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================
     AUTO CALCULATE GST & TOTAL
  ========================= */
  useEffect(() => {
    const amount = Number(invoiceData.amount) || 0;
    const gstRate = Number(invoiceData.gstRate) || 0;

    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;

    setInvoiceData((prev) => ({
      ...prev,
      gstAmount,
      totalAmount,
    }));
  }, [invoiceData.amount, invoiceData.gstRate]);

  /* =========================
     SELECT OPTIONS
  ========================= */
  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
  ];

  const gstOptions = [
    { value: 0, label: "0 %" },
    { value: 5, label: "5 %" },
    { value: 12, label: "12 %" },
    { value: 18, label: "18 %" },
    { value: 28, label: "28 %" },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="space-y-6">

        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field
            label="Voucher Number"
            value={invoiceData.voucherNo}
            onChange={(v) => handleChange("voucherNo", v)}
          />

          <Field
            label="Ref No"
            value={invoiceData.refNo}
            onChange={(v) => handleChange("refNo", v)}
          />

          <Field
            type="date"
            label="Date"
            value={invoiceData.date}
            onChange={(v) => handleChange("date", v)}
          />
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* PAYMENT TYPE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cash / Bank
            </label>
            <Select
              options={paymentOptions}
              value={paymentOptions.find(
                (o) => o.value === invoiceData.paymentType
              )}
              onChange={(opt) =>
                handleChange("paymentType", opt?.value)
              }
              placeholder="Select payment type"
              styles={reactSelectStyles}
            />
          </div>

          <Field
            label="Account No"
            value={invoiceData.accountNo}
            onChange={(v) => handleChange("accountNo", v)}
          />

          <Field
            type="number"
            label="Amount"
            value={invoiceData.amount}
            onChange={(v) => handleChange("amount", v)}
          />
        </div>

        {/* ROW 3 — AMOUNT → GST → TOTAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* GST RATE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              GST Rate
            </label>
            <Select
              options={gstOptions}
              value={gstOptions.find(
                (o) => o.value === invoiceData.gstRate
              )}
              onChange={(opt) =>
                handleChange("gstRate", opt?.value)
              }
              placeholder="Select GST %"
              styles={reactSelectStyles}
            />
          </div>

          {/* GST AMOUNT */}
          <Field
            type="number"
            label="GST Amount"
            value={invoiceData.gstAmount}
            readOnly
          />

          {/* TOTAL AMOUNT */}
          <Field
            type="number"
            label="Total Amount"
            value={invoiceData.totalAmount}
            readOnly
          />
        </div>

        {/* IGST */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={invoiceData.isIgst || false}
            onChange={(e) =>
              handleChange("isIgst", e.target.checked)
            }
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-sm font-semibold text-gray-700">
            Apply IGST
          </label>
        </div>

        {/* NARRATION */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Narration
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter narration"
            value={invoiceData.narration || ""}
            onChange={(e) =>
              handleChange("narration", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   INPUT FIELD
========================= */
const Field = ({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value ?? ""}
      readOnly={readOnly}
      onChange={(e) => !readOnly && onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-md border
        ${readOnly ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"}
        focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);

/* =========================
   REACT-SELECT STYLES
========================= */
const reactSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "6px",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
  }),
};
