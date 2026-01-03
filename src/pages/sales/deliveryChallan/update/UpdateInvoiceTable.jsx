import { Trash2 } from "lucide-react";

export default function UpdateInvoiceTable({
  products = [],
  setProducts,
  readOnly = false,
}) {

  console.log(products)
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
    <div className="rounded-lg bg-white ">
      <div className="max-h-[200px] overflow-y-auto">
        <table className="w-full text-xs table-fixed border-collapse">

          {/* HEADER */}
          <thead className="sticky top-0 bg-slate-700 z-10">
            <tr>
              {[
                "#",
                "Item",
                "Batch No",
                "Lot No",
                "QC Status",
                "Qty Dispatched",
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

          {/* BODY */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={7}
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

                {/* Item */}
                <td className="px-2 text-left font-medium truncate">
                  {p.name}
                </td>

                {/* Batch No */}
                <td>
                  <input
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.batchNo || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "batchNo", e.target.value)
                    }
                  />
                </td>

                {/* Lot No */}
                <td>
                  <input
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.lotNo || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "lotNo", e.target.value)
                    }
                  />
                </td>

                {/* QC Status */}
                <td>
                  <select
                    className="w-full border rounded px-1 py-1 text-xs"
                    value={p.qcStatus || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "qcStatus", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Approved">Approved</option>
                    <option value="Hold">Hold</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                {/* Qty Dispatched */}
                <td>
                  <input
                    type="number"
                    min={1}
                    className="w-20 border rounded px-1 py-1 text-center text-xs"
                    value={p.qtyDispatched || 1}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "qtyDispatched", Number(e.target.value))
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
