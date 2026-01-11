import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products = [], setProducts }) {
  console.log(products)
  const update = (index, field, value) => {
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
    setProducts((prev) => prev.filter((_, i) => i !== index));
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
                "PO Qty",
                "Received",
                "Accepted",
                "Rejected",
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
            {products.map((p, i) => (
              <tr
                key={i}
                className="border-b even:bg-gray-50 hover:bg-blue-50"
              >
                <td>{i + 1}</td>

                {/* Item */}
                <td>
                  <input
                    className="w-full border rounded px-1 py-[2px]"
                    value={p.item || ""}
                    onChange={(e) =>
                      update(i, "item", e.target.value)
                    }
                  />
                </td>

                {/* PO Qty */}
                <td>
                  <input
                    type="number"
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.poQty || 0}
                    onChange={(e) =>
                      update(i, "poQty", e.target.value)
                    }
                  />
                </td>

                {/* Received */}
                <td>
                  <input
                    type="number"
                    className="w-16 border rounded px-1 py-[2px] text-center"
                    value={p.received || 0}
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
                    onChange={(e) =>
                      update(i, "rejected", e.target.checked)
                    }
                  />
                </td>

                {/* Action */}
                <td>
                  <Trash2
                    size={14}
                    className="mx-auto text-red-500 hover:text-red-700 cursor-pointer"
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
