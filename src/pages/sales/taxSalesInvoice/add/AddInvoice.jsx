import { useState } from "react";
import { Plus, Printer } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";

// Product master for the modal
const productsDB = [
  { code: "ITM-001", name: "Laptop", hsn: "8471", rate: 50000, gstPct: 18 },
  { code: "ITM-002", name: "Mouse", hsn: "8471", rate: 500, gstPct: 18 },
  { code: "ITM-003", name: "Keyboard", hsn: "8471", rate: 1200, gstPct: 18 },
  { code: "ITM-004", name: "Monitor", hsn: "8528", rate: 8000, gstPct: 18 },
  { code: "ITM-005", name: "Printer", hsn: "8443", rate: 7000, gstPct: 18 },
];

export default function AddInvoice({ invoiceData, setInvoiceData, products, setProducts }) {
  const [openModal, setOpenModal] = useState(false);

  // ---------------- ADD PRODUCT ----------------
  const addProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.itemCode === product.code);
      if (exists) return prev; // avoid duplicates

      return [
        ...prev,
        {
          itemCode: product.code,
          item: product.name,
          hsn: product.hsn,
          batch: "",
          qty: 1,
          rate: product.rate,
          gstPct: product.gstPct,
          total: product.rate * 1.18, // initial total with GST
        },
      ];
    });

    setOpenModal(false);
  };

  // ---------------- UPDATE PRODUCT ----------------
  const updateProduct = (index, field, value) => {
    setProducts((prev) =>
      prev.map((p, i) => {
        if (i === index) {
          const updated = { ...p, [field]: value };

          // Recalculate total if qty, rate, or gstPct changed
          if (["qty", "rate", "gstPct"].includes(field)) {
            const qty = Number(updated.qty) || 0;
            const rate = Number(updated.rate) || 0;
            const gst = Number(updated.gstPct) || 0;
            updated.total = +(qty * rate * (1 + gst / 100)).toFixed(2);
          }

          return updated;
        }
        return p;
      })
    );
  };

  return (
    <div className="h-full flex flex-col gap-3 p-2">

      {/* ===== INVOICE DETAILS ===== */}
      <InvoiceDetails onChange={setInvoiceData} />

      {/* ===== ACTION BAR ===== */}
      <div className="flex justify-end gap-2">
        <button
          className="flex items-center gap-1 rounded-md bg-blue-600
                     px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={12} /> Add Product
        </button>

        <button
          className="flex items-center gap-1 rounded-md bg-green-600
                     px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
          onClick={() => window.print()}
        >
          <Printer size={12} /> Print
        </button>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <InvoiceTable
        products={products}
        setProducts={updateProduct} // pass updated handler for recalculation
      />

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
