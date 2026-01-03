import { Trash2 } from "lucide-react";

export default function InvoiceTable({ products, setProducts }) {
  const update = (i, field, val) => {
    setProducts((p) =>
      p.map((row, idx) =>
        idx === i ? { ...row, [field]: val } : row
      )
    );
  };

  const remove = (i) =>
    setProducts((p) => p.filter((_, idx) => idx !== i));

  return (
    <div className="rounded-lg bg-white">

      {/* 🔹 SCROLL CONTAINER */}
      <div className="max-h-[200px] overflow-y-scroll">

        <table className="w-full text-xs text-center table-fixed border-separate border-spacing-0">

          {/* 🔹 STICKY HEADER */}
          <thead className="sticky top-0 z-20 bg-slate-700">
            <tr>
              {[
                "#",
                "Item",
                "Batch No",
                "Lot No",
                "QC Status",
                "Qty Dispatched",
                "Act",
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
            {products.map((p, i) => (
              <tr
                key={i}
                className="border-b even:bg-gray-50 hover:bg-blue-50 transition"
              >
                <td className="py-1">{i + 1}</td>

                {/* Item Name */}
                <td className="px-2 text-left truncate font-medium">
                  {p.name}
                </td>

                {/* Batch No */}
                <td>
                  <input
                    type="text"
                    className="w-20 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.batchNo || ""}
                    onChange={(e) => update(i, "batchNo", e.target.value)}
                  />
                </td>

                {/* Lot No */}
                <td>
                  <input
                    type="text"
                    className="w-20 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.lotNo || ""}
                    onChange={(e) => update(i, "lotNo", e.target.value)}
                  />
                </td>

                {/* ✅ QC Status (SELECT) */}
                <td>
                  <select
                    className="w-24 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.qcStatus || ""}
                    onChange={(e) => update(i, "qcStatus", e.target.value)}
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
                    className="w-16 border rounded px-1 py-[2px] text-center
                               focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    value={p.qty || 0}
                    onChange={(e) =>
                      update(i, "qty", Number(e.target.value))
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
