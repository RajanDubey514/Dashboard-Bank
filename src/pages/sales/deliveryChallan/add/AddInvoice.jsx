import { useState } from "react";
import { Plus , Printer} from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";

// Only the fields needed for your table
const productsDB = [
  { code: "P001", name: "Laptop" },
  { code: "P002", name: "Mouse" },
  { code: "P003", name: "Keyboard" },
  { code: "P004", name: "Monitor" },
  { code: "P005", name: "Printer" },
  { code: "P006", name: "Scanner" },
  { code: "P007", name: "Laptop Bag" },
  { code: "P008", name: "Mouse Pad" },
  { code: "P009", name: "Headset" },
  { code: "P010", name: "Webcam" },
];

export default function AddInvoice({ invoiceData, setInvoiceData, products, setProducts }) {
  const [openModal, setOpenModal] = useState(false);

  // ---------------- ADD PRODUCT ----------------
  const addProduct = (product) => {
    setProducts((prev) => {
      const exist = prev.find((p) => p.code === product.code);
      if (exist) return prev; // Avoid duplicates
      return [
        ...prev,
        {
          ...product,
          batchNo: "",
          lotNo: "",
          qcStatus: "",
          qty: 1,
        },
      ];
    });
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== INVOICE DETAILS ===== */}
      <InvoiceDetails onChange={setInvoiceData} />

      {/* ===== ACTION BAR ===== */}
      <div className="flex justify-end gap-2 flex-wrap">
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
