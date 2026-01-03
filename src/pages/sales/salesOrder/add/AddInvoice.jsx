import { useState } from "react";
import { Plus, Printer } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";

// Only required product master fields
const productsDB = [
  { code: "P001", name: "Laptop", uom: "Nos" },
  { code: "P002", name: "Mouse", uom: "Nos" },
  { code: "P003", name: "Keyboard", uom: "Nos" },
  { code: "P004", name: "Monitor", uom: "Nos" },
  { code: "P005", name: "Printer", uom: "Nos" },
];

export default function AddInvoice({
  invoiceData,
  setInvoiceData,
  products,
  setProducts,
}) {
  const [openModal, setOpenModal] = useState(false);

  // ---------------- ADD PRODUCT ----------------
  const addProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.code === product.code);
      if (exists) return prev;

      return [
        ...prev,
        {
          itemCode: product.code,
          productName: product.name,
          uom: product.uom,
          orderQty: 1,
          productionLine: "",
          requiredDate: "",
        },
      ];
    });

    setOpenModal(false);
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
          <Plus size={12} />
          Add Product
        </button>

        <button
          className="flex items-center gap-1 rounded-md bg-green-600
                     px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
          onClick={() => window.print()}
        >
          <Printer size={12} />
          Print
        </button>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <InvoiceTable
        products={products}
        setProducts={setProducts}
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
