import { Trash2 } from "lucide-react";

export default function UpdateInvoiceTable({
  products = [],
  setProducts,
  readOnly = false, // ✅ NEW (for future use)
}) {
  const update = (i, field, val) => {
    if (readOnly) return;

    setProducts((p) =>
      p.map((row, idx) =>
        idx === i ? { ...row, [field]: Number(val) || 0 } : row
      )
    );
  };

  const remove = (i) => {
    if (readOnly) return;
    setProducts((p) => p.filter((_, idx) => idx !== i));
  };

  return (
    <div className="rounded-lg bg-white">

      {/* 🔹 SCROLL CONTAINER */}
      <div className="max-h-[150px] overflow-y-scroll">

        <table className="w-full text-xs text-center table-fixed border-separate border-spacing-0">

          {/* 🔹 HEADER */}
          <thead className="sticky top-0 z-20 bg-slate-700">
            <tr>
              {[
                "#",
                "Product",
                "Qty",
                "Rate",
                "SGST",
                "CGST",
                "IGST",
                "Disc %",
                "Disc Amt",
                "Total",
                "Act",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-1 text-white font-semibold text-xs"
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
                <td
                  colSpan={11}
                  className="py-4 text-gray-400 italic"
                >
                  No products added
                </td>
              </tr>
            )}

            {products.map((p, i) => {
              const base = p.qty * p.rate;
              const tax =
                (base * (p.sgst + p.cgst + p.igst)) / 100;
              const disc =
                p.discountPct > 0
                  ? (base * p.discountPct) / 100
                  : p.discountAmt;
              const total = base + tax - disc;

              return (
                <tr
                  key={p.code || i}
                  className="border-b even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td>{i + 1}</td>

                  <td className="px-2 text-left truncate font-medium">
                    {p.name}
                  </td>

                  {[
                    "qty",
                    "rate",
                    "sgst",
                    "cgst",
                    "igst",
                    "discountPct",
                    "discountAmt",
                  ].map((f) => (
                    <td key={f}>
                      <input
                        type="number"
                        className={`w-14 border rounded px-1 py-[2px] text-center
                          focus:ring-1 focus:ring-blue-400 focus:outline-none
                          ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        value={p[f]}
                        disabled={readOnly}
                        onChange={(e) =>
                          update(i, f, e.target.value)
                        }
                      />
                    </td>
                  ))}

                  <td className="font-semibold">
                    {total.toFixed(2)}
                  </td>

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
