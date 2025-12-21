import { Trash2 } from "lucide-react";

export default function UpdateInvoiceTable({
  products = [],
  setProducts,
  readOnly = false,
}) {
  const update = (index, field, value) => {
    if (readOnly) return;

    setProducts((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]:
                field === "item"
                  ? value
                  : field === "accepted" || field === "rejected"
                  ? value
                  : Number(value) || 0,
            }
          : row
      )
    );
  };

  const remove = (index) => {
    if (readOnly) return;
    setProducts((prev) => prev.filter((_, i) => i !== index));
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
                "Item",
                "PO Qty",
                "Received",
                "Accepted",
                "Rejected",
                "Action",
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
                <td colSpan={7} className="py-4 text-gray-400 italic">
                  No items added
                </td>
              </tr>
            )}

            {products.map((p, i) => (
              <tr
                key={i}
                className="border-b even:bg-gray-50 hover:bg-blue-50 transition"
              >
                <td>{i + 1}</td>

                {/* Item */}
                <td className="px-2 text-left">
                  <input
                    className={`w-full border rounded px-1 py-[2px]
                      ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    value={p.item || ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "item", e.target.value)
                    }
                  />
                </td>

                {/* PO Qty */}
                <td>
                  <input
                    type="number"
                    className={`w-16 border rounded px-1 py-[2px] text-center
                      ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    value={p.poQty}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "poQty", e.target.value)
                    }
                  />
                </td>

                {/* Received */}
                <td>
                  <input
                    type="number"
                    className={`w-16 border rounded px-1 py-[2px] text-center
                      ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    value={p.received}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "received", e.target.value)
                    }
                  />
                </td>

                {/* Accepted */}
                <td>
                  <input
                    type="checkbox"
                    checked={!!p.accepted}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "accepted", e.target.checked)
                    }
                  />
                </td>

                {/* Rejected */}
                <td>
                  <input
                    type="checkbox"
                    checked={!!p.rejected}
                    disabled={readOnly}
                    onChange={(e) =>
                      update(i, "rejected", e.target.checked)
                    }
                  />
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
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
