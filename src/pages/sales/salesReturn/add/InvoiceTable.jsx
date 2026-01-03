import { Trash2 } from "lucide-react";

export default function ReturnTable({ products = [], setProducts }) {
  // Update a field
  const update = (i, field, value) => {
    setProducts((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [field]: value } : row))
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
              {["#", "Item", "Batch", "Qty Sold", "Qty Returned", "Rework / Scrap", "Act"].map(
                (h) => (
                  <th key={h} className="px-2 py-1 text-white font-semibold">
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
                <td colSpan={7} className="py-4 text-gray-400 italic">
                  No products added
                </td>
              </tr>
            )}

            {products.map((p, i) => (
              <tr key={i} className="border-b even:bg-gray-50 hover:bg-blue-50">
                <td>{i + 1}</td>

                {/* Item */}
                <td className="text-left px-2 truncate">{p.item || p.productName}</td>

                {/* Batch */}
                <td>
                  <input
                    type="text"
                    className="w-20 border rounded px-1 py-[2px] text-center"
                    value={p.batch || ""}
                    onChange={(e) => update(i, "batch", e.target.value)}
                  />
                </td>

                {/* Qty Sold */}
                <td>
                  <input
                    type="number"
                    min={0}
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.qtySold || 0}
                    onChange={(e) => update(i, "qtySold", Number(e.target.value))}
                  />
                </td>

                {/* Qty Returned */}
                <td>
                  <input
                    type="number"
                    min={0}
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.qtyReturned || 0}
                    onChange={(e) => update(i, "qtyReturned", Number(e.target.value))}
                  />
                </td>

                {/* Rework / Scrap */}
                <td>
                  <input
                    type="text"
                    className="w-24 border rounded px-1 py-[2px] text-center"
                    value={p.reworkScrap || ""}
                    onChange={(e) => update(i, "reworkScrap", e.target.value)}
                  />
                </td>

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
