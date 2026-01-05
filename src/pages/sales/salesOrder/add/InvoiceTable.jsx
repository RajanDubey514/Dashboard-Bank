import { Trash2 } from "lucide-react";

/* ---------------- CALCULATION ---------------- */
const calculateRow = (row) => {
  const qty = Number(row.qty) || 0;
  const rate = Number(row.rate) || 0;
  const discountPercent = Number(row.discountPercent) || 0;

  const baseAmount = qty * rate;
  const discountAmount = (baseAmount * discountPercent) / 100;
  const taxableAmount = baseAmount - discountAmount;

  const sgstAmt = (taxableAmount * (row.sgst || 0)) / 100;
  const cgstAmt = (taxableAmount * (row.cgst || 0)) / 100;
  const igstAmt = (taxableAmount * (row.igst || 0)) / 100;

  const total = taxableAmount + sgstAmt + cgstAmt + igstAmt;

  return {
    ...row,
    discountAmount,
    total,
  };
};

/* ---------------- COLUMNS CONFIG ---------------- */
const columns = [
  { key: "index", label: "#" },
  { key: "product", label: "Product" },
  { key: "qty", label: "Qty", editable: true, width: "w-14" },
  { key: "rate", label: "Rate", editable: true, width: "w-20" },
  { key: "sgst", label: "SGST %", editable: true, width: "w-14" },
  { key: "cgst", label: "CGST %", editable: true, width: "w-14" },
  { key: "igst", label: "IGST %", editable: true, width: "w-14" },
  { key: "discountPercent", label: "Discount %", editable: true, width: "w-14" },
  { key: "discountAmount", label: "Discount Amt" },
  { key: "total", label: "Total" },
  { key: "action", label: "Act" },
];

/* ---------------- CELL ---------------- */
function EditableCell({ value, width, onChange }) {
  return (
    <input
      type="number"
      className={`${width} border rounded px-1 py-[2px] text-center`}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}

/* ---------------- COMPONENT ---------------- */
export default function InvoiceTable({ products = [], setProducts }) {
  const update = (index, field, value) => {
    setProducts((prev) =>
      prev.map((row, i) =>
        i === index ? calculateRow({ ...row, [field]: value }) : row
      )
    );
  };

  const remove = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="max-h-[260px] overflow-auto">
        <table className="w-full text-xs text-center border-separate border-spacing-0">
          {/* HEADER */}
          <thead className="sticky top-0 bg-slate-700 z-20">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-2 py-2 text-white font-semibold"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-4 text-gray-400 italic">
                  No products added
                </td>
              </tr>
            )}

            {products.map((row, i) => (
              <tr
                key={i}
                className="border-b even:bg-gray-50 hover:bg-blue-50"
              >
                {columns.map((col) => {
                  if (col.key === "index") return <td key={col.key}>{i + 1}</td>;

                  if (col.key === "action") {
                    return (
                      <td key={col.key}>
                        <Trash2
                          size={14}
                          className="mx-auto cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => remove(i)}
                        />
                      </td>
                    );
                  }

                  if (col.editable) {
                    return (
                      <td key={col.key}>
                        <EditableCell
                          value={row[col.key]}
                          width={col.width}
                          onChange={(val) => update(i, col.key, val)}
                        />
                      </td>
                    );
                  }

                  return (
                    <td
                      key={col.key}
                      className={`px-2 ${
                        col.key === "total"
                          ? "text-green-700 font-semibold text-right"
                          : col.key === "discountAmount"
                          ? "text-red-600 font-medium text-right"
                          : "text-left font-medium"
                      }`}
                    >
                      {Number.isFinite(row[col.key])
                        ? row[col.key]?.toFixed(2)
                        : row[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
