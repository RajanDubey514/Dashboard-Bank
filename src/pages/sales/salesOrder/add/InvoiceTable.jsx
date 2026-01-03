import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products = [], setProducts }) {
  const update = (i, field, val) => {
    setProducts((prev) =>
      prev.map((row, idx) =>
        idx === i ? { ...row, [field]: val } : row
      )
    );
  };

  const remove = (i) => {
    setProducts((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="rounded-lg bg-white">

      {/* 🔹 SCROLL CONTAINER */}
      <div className="max-h-[220px] overflow-y-auto">

        <table className="w-full text-xs text-center border-separate border-spacing-0">

          {/* 🔹 HEADER */}
          <thead className="sticky top-0 bg-slate-700 z-20">
            <tr>
              {[
                "#",
                "Item Code",
                "Product Name",
                "UOM",
                "Order Qty",
                "Production Line",
                "Required Date",
                "Act",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-1 text-white font-semibold"
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
                <td colSpan={8} className="py-4 text-gray-400 italic">
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

                {/* Item Code */}
                <td className="font-medium">{p.itemCode}</td>

                {/* Product Name */}
                <td className="text-left px-2 truncate">
                  {p.productName}
                </td>

                {/* UOM */}
                <td>{p.uom}</td>

                {/* Order Qty */}
                <td>
                  <input
                    type="number"
                    min="1"
                    className="w-16 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.orderQty}
                    onChange={(e) =>
                      update(i, "orderQty", Number(e.target.value))
                    }
                  />
                </td>

                {/* Production Line */}
                <td>
                  <input
                    type="text"
                    className="w-24 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.productionLine}
                    onChange={(e) =>
                      update(i, "productionLine", e.target.value)
                    }
                  />
                </td>

                {/* Required Date */}
                <td>
                  <input
                    type="date"
                    className="border rounded px-1 py-[2px]
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.requiredDate}
                    onChange={(e) =>
                      update(i, "requiredDate", e.target.value)
                    }
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
