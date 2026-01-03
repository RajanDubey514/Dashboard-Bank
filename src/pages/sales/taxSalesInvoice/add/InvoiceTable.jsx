import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products = [], setProducts }) {
  // Update a field and recalc total
  const update = (i, field, value) => {
    setProducts((prev) =>
      prev.map((row, idx) => {
        if (idx === i) {
          const updated = { ...row, [field]: value };

          // Recalculate total if qty, rate, or gstPct changed
          if (["qty", "rate", "gstPct"].includes(field)) {
            const qty = Number(updated.qty) || 0;
            const rate = Number(updated.rate) || 0;
            const gst = Number(updated.gstPct || updated.gst || 0);
            updated.total = +(qty * rate * (1 + gst / 100)).toFixed(2);
          }

          return updated;
        }
        return row;
      })
    );
  };

  // Remove a product
  const remove = (i) => {
    setProducts((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="rounded-lg bg-white">

      {/* Scrollable table */}
      <div className="max-h-[250px] overflow-y-auto">
        <table className="w-full text-xs text-center border-separate border-spacing-0">

          {/* Header */}
          <thead className="sticky top-0 bg-slate-700 z-20">
            <tr>
              {["#", "Item", "HSN", "Batch", "Qty", "Rate", "GST %", "Total", "Act"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-2 py-1 text-white font-semibold"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="py-4 text-gray-400 italic">
                  No products added
                </td>
              </tr>
            )}

            {products.map((p, i) => (
              <tr
                key={i}
                className="border-b even:bg-gray-50 hover:bg-blue-50"
              >
                <td>{i + 1}</td>

                {/* Item */}
                <td className="text-left px-2 truncate">{p.item || p.itemCode || p.productName}</td>

                {/* HSN */}
                <td>
                  <input
                    type="text"
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.hsn || ""}
                    onChange={(e) => update(i, "hsn", e.target.value)}
                  />
                </td>

                {/* Batch */}
                <td>
                  <input
                    type="text"
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.batch || ""}
                    onChange={(e) => update(i, "batch", e.target.value)}
                  />
                </td>

                {/* Qty */}
                <td>
                  <input
                    type="number"
                    min={1}
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.qty || 1}
                    onChange={(e) => update(i, "qty", Number(e.target.value))}
                  />
                </td>

                {/* Rate */}
                <td>
                  <input
                    type="number"
                    min={0}
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.rate || 0}
                    onChange={(e) => update(i, "rate", Number(e.target.value))}
                  />
                </td>

                {/* GST % */}
                <td>
                  <input
                    type="number"
                    min={0}
                    className="w-12 border rounded px-1 py-[2px] text-center"
                    value={p.gstPct || p.gst || 0}
                    onChange={(e) => update(i, "gstPct", Number(e.target.value))}
                  />
                </td>

                {/* Total */}
                <td>{(p.total || (p.qty * p.rate * (1 + (p.gstPct || p.gst || 0) / 100))).toFixed(2)}</td>

                {/* Action */}
                <td>
                  <Trash2
                    size={14}
                    className="text-red-500 hover:text-red-700 cursor-pointer mx-auto"
                    onClick={() => remove(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
