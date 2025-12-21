import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products, setProducts }) {
  const update = (index, field, value) => {
    setProducts((prev) =>
      prev.map((row, i) =>
        i === index
          ? { ...row, [field]: field === "itemCode" || field === "description"
              ? value
              : Number(value) || 0
            }
          : row
      )
    );
  };

  const remove = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg bg-white">
      <div className="max-h-[180px] overflow-y-auto">
        <table className="w-full text-xs text-center table-fixed border-collapse">
          {/* HEADER */}
          <thead className="sticky top-0 bg-slate-700 z-20">
            <tr>
              {[
                "#",
                "Item Code",
                "Description",
                "Qty",
                "Rate",
                "Total",
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
            {products.map((p, i) => {
              const total = p.qty * p.rate;

              return (
                <tr
                  key={i}
                  className="border-b even:bg-gray-50 hover:bg-blue-50"
                >
                  <td>{i + 1}</td>

                  {/* Item Code */}
                  <td>
                    <input
                      className="w-full border rounded px-1 py-[2px]"
                      value={p.itemCode || ""}
                      onChange={(e) =>
                        update(i, "itemCode", e.target.value)
                      }
                    />
                  </td>

                  {/* Description */}
                  <td>
                    <input
                      className="w-full border rounded px-1 py-[2px] text-left"
                      value={p.description || ""}
                      onChange={(e) =>
                        update(i, "description", e.target.value)
                      }
                    />
                  </td>

                  {/* Qty */}
                  <td>
                    <input
                      type="number"
                      className="w-16 border rounded px-1 py-[2px] text-center"
                      value={p.qty}
                      onChange={(e) =>
                        update(i, "qty", e.target.value)
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

                  {/* Total */}
                  <td className="font-semibold">
                    {total.toFixed(2)}
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
