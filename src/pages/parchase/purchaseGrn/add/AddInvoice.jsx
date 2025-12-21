import { useState } from "react";
import { Printer, Plus } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";

/* ---------------- PRODUCT MASTER ---------------- */
const productsDB = [
  { item: "Laptop" },
  { item: "Mouse" },
  { item: "Keyboard" },
  { item: "Monitor" },
];

export default function AddInvoice({
  invoiceData,
  setInvoiceData,
  products,
  setProducts,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [scanValue, setScanValue] = useState("");

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        item: product.item,
        poQty: 0,
        received: 0,
        accepted: false,
        rejected: false,
      },
    ]);

    setScanValue("");
  };

  /* ---------------- SCAN HANDLER ---------------- */
  const handleScanChange = (e) => {
    const value = e.target.value;
    setScanValue(value);

    const found = productsDB.find(
      (p) => p.item.toLowerCase() === value.toLowerCase()
    );

    if (found) addProduct(found);
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== INVOICE DETAILS ===== */}
      <InvoiceDetails onChange={setInvoiceData} />

      {/* ===== SCAN + ACTION BAR ===== */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-gray-600 mb-1">
            Scan / Enter Item
          </label>
          <input
            className="h-8 w-60 rounded-md border border-gray-300 px-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Scan / Enter Item"
            value={scanValue}
            onChange={handleScanChange}
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            className="flex items-center gap-1 rounded-md bg-blue-600
              px-2 text-xs font-medium text-white hover:bg-blue-700"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={12} />
            Add Product
          </button>

          <button
            className="flex items-center gap-1 rounded-md bg-green-600
              px-2 text-xs font-medium text-white hover:bg-green-700"
            onClick={() => window.print()}
          >
            <Printer size={12} />
            Print
          </button>
        </div>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <InvoiceTable products={products} setProducts={setProducts} />

      {/* ===== ADD PRODUCT MODAL ===== */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}
