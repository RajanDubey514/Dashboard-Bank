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
                field === "item"
                  ? val
                  : Number(val) || 0,
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
      <div className="max-h-[130px] overflow-y-auto">
        <table className="w-full text-xs text-center table-fixed border-collapse">

          {/* HEADER */}
          <thead className="sticky top-0 bg-slate-700 z-20">
            <tr>
              {[
                "#",
                "Item",
                "Return Qty",
                "Rate",
                "Amount",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-2 text-white font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-gray-400 italic">
                  No items added
                </td>
              </tr>
            )}

            {products.map((p, i) => {
              const amount = p.returnQty * p.rate;

              return (
                <tr
                  key={i}
                  className="border-b even:bg-gray-50 hover:bg-blue-50"
                >
                  <td>{i + 1}</td>

                  {/* Item */}
                  <td className="text-left px-2">
                    <input
                      className="w-full border rounded px-1 py-[2px]
                        focus:ring-1 focus:ring-blue-400 focus:outline-none
                        ${readOnly ? "
                      value={p.item || ""}
                      disabled={readOnly}
                      onChange={(e) =>
                        update(i, "item", e.target.value)
                      }
                    />
                  </td>

                  {/* Return Qty */}
                  <td>
                    <input
                      type="number"
                      min={1}
                      className={`w-16 border rounded px-1 py-[2px] text-center
                        focus:ring-1 focus:ring-blue-400 focus:outline-none
                        ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      value={p.returnQty}
                      disabled={readOnly}
                      onChange={(e) =>
                        update(i, "returnQty", e.target.value)
                      }
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
                      onChange={(e) =>
                        update(i, "rate", e.target.value)
                      }
                    />
                  </td>

                  {/* Amount */}
                  <td className="font-semibold">
                    {amount.toFixed(2)}
                  </td>

                  {/* Action */}
                  <td>
                    {!readOnly && (
                      <Trash2
                        size={14}
                        className="mx-auto text-red-500 hover:text-red-700 cursor-pointer"
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
