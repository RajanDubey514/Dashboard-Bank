import { useState } from "react";
import { Printer, Plus } from "lucide-react";

import UpdateInvoiceDetails from "./UpdateInvoiceDetails";
import UpdateInvoiceTable from "./UpdateInvoiceTable"; // Updated table for return items
import UpdateProductModal from "./UpdateProductModal"; // Updated modal
import UpdateInvoiceSummary from "./UpdateInvoiceSummary";

// Sample products DB
const productsDB = [
  { item: "Laptop", rate: 50000 },
  { item: "Mouse", rate: 500 },
  { item: "Laptop1", rate: 52000 },
  { item: "Mouse1", rate: 550 },
  { item: "Laptop2", rate: 51000 },
  { item: "Mouse2", rate: 600 },
];

export default function UpdateInvoice({
  upinvoiceData,
  setUpInvoiceData,
  upproducts,
  setUpProducts,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [amountPaid, setAmountPaid] = useState("");

  /* ================= ADD PRODUCT ================= */
  const addProduct = (product) => {
    setUpProducts((prev) => {
      const exist = prev.find((p) => p.item === product.item);
      if (exist) {
        return prev.map((p) =>
          p.item === product.item
            ? { ...p, returnQty: p.returnQty + product.returnQty }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const printInvoice = () => window.print();

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* ===== INVOICE DETAILS ===== */}
      <UpdateInvoiceDetails
        value={upinvoiceData}
        onChange={setUpInvoiceData}
      />

      {/* ===== ACTION BAR ===== */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <button
          className="flex items-center gap-1 rounded-md bg-blue-600
            px-2 text-xs font-medium text-white hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={12} />
          Add Item
        </button>

        <button
          className="flex items-center gap-1 rounded-md bg-green-600
            px-2 text-xs font-medium text-white hover:bg-green-700"
          onClick={printInvoice}
        >
          <Printer size={12} />
          Print
        </button>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <UpdateInvoiceTable
        products={upproducts}
        setProducts={setUpProducts}
      />

      {/* ===== SUMMARY ===== */}
      <UpdateInvoiceSummary
        products={upproducts}
        amountPaid={amountPaid}
        setAmountPaid={setAmountPaid}
      />

      {/* ===== ADD PRODUCT MODAL ===== */}
      <UpdateProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}
