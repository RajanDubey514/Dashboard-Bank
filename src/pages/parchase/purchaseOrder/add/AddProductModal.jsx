import { useState } from "react";
import Select from "react-select";
import { X, Plus } from "lucide-react";

export default function AddProductModal({ open, onClose, productsDB, onAdd }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);

  if (!open) return null;

  const handleAdd = () => {
    if (!selectedProduct || qty <= 0) return;

    // Add product with qty
    onAdd({ ...selectedProduct, qty, discountPct: 0, discountAmt: 0 });

    // Reset
    setSelectedProduct(null);
    setQty(1);
    onClose();
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setQty(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[360px] p-4 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Add Product</h3>
          <X className="cursor-pointer" size={18} onClick={handleClose} />
        </div>

        {/* PRODUCT SELECT */}
        <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
          Select Product
        </label>
        <Select
          value={
            selectedProduct
              ? { value: selectedProduct, label: `${selectedProduct.description} (${selectedProduct.itemCode})` }
              : null
          }
          options={productsDB.map((p) => ({
            value: p,
            label: `${p.description} (${p.itemCode})`,
          }))}
          onChange={(opt) => setSelectedProduct(opt.value)}
          placeholder="Choose product..."
        />

        {/* QTY INPUT */}
        {selectedProduct && (
          <div className="mt-3">
            <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-blue-600 text-white py-1.5 rounded flex items-center justify-center gap-1 text-xs font-medium hover:bg-blue-700 transition"
            onClick={handleAdd}
            disabled={!selectedProduct || qty <= 0}
          >
            <Plus size={14} /> Add
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-1.5 rounded text-xs font-medium hover:bg-red-600 transition"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
