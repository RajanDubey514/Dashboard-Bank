import { useState } from "react";

export default function UpdateProductTable({ open, onClose, productsDB, onAdd }) {
  const [selectedCode, setSelectedCode] = useState("");
  const [qty, setQty] = useState(1);

  if (!open) return null;

  const product = productsDB.find((p) => p.itemCode === selectedCode);

  const handleAdd = () => {
    if (!product || qty <= 0) return;
    onAdd({ product, qty });
    setSelectedCode("");
    setQty(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-80 space-y-3">
        <h2 className="font-semibold text-lg">Add Product</h2>

        {/* PRODUCT SELECT */}
        <div>
          <label className="text-sm font-semibold mb-1 block">Product</label>
          <select
            className="w-full border rounded-md px-2 py-1"
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
          >
            <option value="">Select product</option>
            {productsDB.map((p) => (
              <option key={p.itemCode} value={p.itemCode}>
                {p.name} — ₹ {p.rate}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        <div>
          <label className="text-sm font-semibold mb-1 block">Quantity</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border rounded-md px-2 py-1"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-3 py-1 text-sm border rounded-md">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
    