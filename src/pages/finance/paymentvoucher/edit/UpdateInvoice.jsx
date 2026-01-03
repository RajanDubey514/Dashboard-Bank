import Select from "react-select";
import { X } from "lucide-react";

export default function UpdateInvoice({
  invoiceData,
  setInvoiceData,
  onClose,
}) {
  const handleChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!invoiceData) return null;

  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
  ];

  return (
    <div className="relative bg-white p-2">
      {/* HEADER */}
   

      {/* FORM */}
      <div className="space-y-6">
        {/* ROW 1 — 3 inputs */}
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
          {/* Cash / Bank */}
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

        {/* Narration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Narration
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 transition resize-none"
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
   INPUT FIELD (TAILWIND)
========================= */
const Field = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-blue-500 transition"
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
