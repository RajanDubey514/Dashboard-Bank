import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products, setProducts }) {
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
              {["#", "Item", "Return Qty", "Rate", "Amount", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-2 py-2 text-white font-semibold"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 text-gray-400 italic"
                >
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
                  <td>
                    <input
                      className="w-full border rounded px-1 py-[2px] text-left"
                      value={p.item || ""}
                      onChange={(e) =>
                        update(i, "item", e.target.value)
                      }
                    />
                  </td>

                  {/* Return Qty */}
                  <td>
                    <input
                      type="number"
                      className="w-16 border rounded px-1 py-[2px] text-center"
                      value={p.returnQty}
                      onChange={(e) =>
                        update(i, "returnQty", e.target.value)
                      }
                    />
                  </td>

                  {/* Rate */}
                  <td>
                    <input
                      type="number"
                      className="w-20 border rounded px-1 py-[2px] text-center"
                      value={p.rate}
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
                    <Trash2
                      size={14}
                      className="mx-auto text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => remove(i)}
                    />
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
