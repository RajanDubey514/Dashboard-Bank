import { Trash2 } from "lucide-react";

export default function UpdateInvoiceTable({
  products = [],
  setProducts,
  readOnly = false,
}) {
  const update = (i, field, val) => {
    if (readOnly) return;

    setProducts((prev) =>
      prev.map((row, idx) =>
        idx === i
          ? {
              ...row,
              [field]:
                field === "qty" || field === "rate" || field === "gstPercent"
                  ? Number(val) || 0
                  : val,
            }
          : row
      )
    );
  };

  const remove = (i) => {
    if (readOnly) return;
    setProducts((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="rounded-lg bg-white p-2">
      <div className="max-h-[130px] overflow-y-scroll">
        <table className="w-full text-xs text-center table-fixed border-separate border-spacing-0">

          {/* 🔹 HEADER */}
          <thead className="sticky top-0 z-20 bg-slate-700">
            <tr>
              {[
                "#",
                "Item Code",
                "Description",
                "Qty",
                "Rate",
                "GST %",
                "GST Amt",
                "Total",
                "Act",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-1 text-white font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* 🔹 BODY */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="py-4 text-gray-400 italic">
                  No products added
                </td>
              </tr>
            )}

            {products.map((p, i) => {
              const base = p.qty * p.rate;
              const gstAmt = (base * (p.gstPercent || 0)) / 100;
              const total = base + gstAmt;

              return (
                <tr
                  key={p.itemCode || i}
                  className="border-b even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td>{i + 1}</td>

                  <td className="px-2 text-left truncate font-medium">
                    {p.itemCode}
                  </td>

                  <td className="px-2 text-left truncate">
                    {p.description}
                  </td>

                  {/* Qty */}
                  <td>
                    <input
                      type="number"
                      className={`w-14 border rounded px-1 py-[2px] text-center
                        focus:ring-1 focus:ring-blue-400 focus:outline-none
                        ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      value={p.qty}
                      disabled={readOnly}
                      onChange={(e) => update(i, "qty", e.target.value)}
                    />
                  </td>

                  {/* Rate */}
                  <td>
                    <input
                      type="number"
                      className={`w-20 border rounded px-1 py-[2px] text-center
                        focus:ring-1 focus:ring-blue-400 focus:outline-none
                        ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      value={p.rate}
                      disabled={readOnly}
                      onChange={(e) => update(i, "rate", e.target.value)}
                    />
                  </td>

                  {/* GST % */}
                  <td>
                    <input
                      type="number"
                      className={`w-14 border rounded px-1 py-[2px] text-center
                        focus:ring-1 focus:ring-blue-400 focus:outline-none
                        ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      value={p.gstPercent || 0}
                      disabled={readOnly}
                      onChange={(e) =>
                        update(i, "gstPercent", e.target.value)
                      }
                    />
                  </td>

                  {/* GST Amount */}
                  <td className="font-medium">
                    {gstAmt.toFixed(2)}
                  </td>

                  {/* Total */}
                  <td className="font-semibold">
                    {total.toFixed(2)}
                  </td>

                  {/* Action */}
                  <td>
                    {!readOnly && (
                      <Trash2
                        size={14}
                        className="text-red-500 hover:text-red-700 cursor-pointer mx-auto"
                        onClick={() => remove(i)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
