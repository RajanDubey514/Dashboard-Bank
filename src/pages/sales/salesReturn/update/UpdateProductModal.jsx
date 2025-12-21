import { useState } from "react";
import Select from "react-select";
import { X, Plus } from "lucide-react";

export default function UpdateProductModal({
  open,
  onClose,
  productsDB,
  onAdd,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!open) return null;

  const handleAdd = () => {
    if (!selectedProduct) return;
    onAdd(selectedProduct);
    setSelectedProduct(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[360px] p-4 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Add Product</h3>
          <X className="cursor-pointer" size={18} onClick={onClose} />
        </div>

        {/* PRODUCT SELECT */}
        <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
          Select Product
        </label>

        <Select
          value={
            selectedProduct
              ? { value: selectedProduct, label: `${selectedProduct.name} (${selectedProduct.code})` }
              : null
          }
          options={productsDB.map((p) => ({
            value: p,
            label: `${p.name} (${p.code})`,
          }))}
          onChange={(opt) => setSelectedProduct(opt.value)}
          placeholder="Choose product..."
        />

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-blue-600 text-white py-1.5 rounded
              flex items-center justify-center gap-1 text-xs font-medium
              hover:bg-blue-700 transition"
            onClick={handleAdd}
            disabled={!selectedProduct}
          >
            <Plus size={14} /> Add
          </button>

          <button
            className="flex-1 bg-red-500 text-white py-1.5 rounded
              text-xs font-medium hover:bg-red-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

