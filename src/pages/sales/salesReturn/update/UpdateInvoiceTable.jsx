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
        idx === i ? { ...row, [field]: val } : row
      )
    );
  };

  const remove = (i) => {
    if (readOnly) return;
    setProducts((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="rounded-lg bg-white">
      <div className="max-h-[250px] overflow-y-auto">
        <table className="w-full text-xs table-fixed border-collapse">

          {/* ===== HEADER ===== */}
          <thead className="sticky top-0 bg-slate-700 z-10">
            <tr>
              {[
                "#",
                "Item Code",
                "Product Name",
                "UOM",
                "Order Qty",
                "Production Line",
                "Required Date",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-2 text-white font-semibold text-xs"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* ===== BODY ===== */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-4 text-center text-gray-400 italic"
                >
                  No items added
                </td>
              </tr>
            )}

            {products.map((p, i) => (
              <tr
                key={p.code || i}
                className="border-b even:bg-gray-50 hover:bg-blue-50"
              >
                {/* Index */}
                <td className="text-center">{i + 1}</td>

                {/* Item Code */}
                <td className="px-2 font-medium">{p.code}</td>

                {/* Product Name */}
                <td className="px-2 truncate">{p.name}</td>

                {/* UOM */}
                <td>
                  <input
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.uom || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "uom", e.target.value)
                    }
                  />
                </td>

                {/* Order Qty */}
                <td>
                  <input
                    type="number"
                    min={1}
                    className="w-20 border rounded px-1 py-1 text-center text-xs"
                    value={p.orderQty || 1}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "orderQty", Number(e.target.value))
                    }
                  />
                </td>

                {/* Production Line */}
                <td>
                  <input
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.productionLine || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "productionLine", e.target.value)
                    }
                  />
                </td>

                {/* Required Date */}
                <td>
                  <input
                    type="date"
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.requiredDate || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "requiredDate", e.target.value)
                    }
                  />
                </td>

                {/* Action */}
                <td className="text-center">
                  {!readOnly && (
                    <Trash2
                      size={14}
                      className="text-red-500 cursor-pointer hover:text-red-700 mx-auto"
                      onClick={() => remove(i)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
