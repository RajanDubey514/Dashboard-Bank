import { useState } from "react";
import { Plus , Printer} from "lucide-react";

import UpdateInvoiceDetails from "./UpdateInvoiceDetails";
import UpdateInvoiceTable from "./UpdateInvoiceTable";
import UpdateProductModal from "../add/AddProductModal";

// Only required product master
const productsDB = [
  { code: "P001", name: "Laptop" },
  { code: "P002", name: "Mouse" },
  { code: "P003", name: "Keyboard" },
  { code: "P004", name: "Monitor" },
  { code: "P005", name: "Printer" },
];

export default function UpdateInvoice({
  upinvoiceData,
  setUpInvoiceData,
  upproducts,
  setUpProducts,
}) {
  const [openModal, setOpenModal] = useState(false);

  // ================= ADD PRODUCT =================
  const addProduct = (product) => {
    setUpProducts((prev) => {
      const exists = prev.find((p) => p.code === product.code);
      if (exists) return prev;

      return [
        ...prev,
        {
          code: product.code,
          name: product.name,
          batchNo: "",
          lotNo: "",
          qcStatus: "",
          qtyDispatched: 1,
        },
      ];
    });
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== INVOICE / DC DETAILS ===== */}
      <UpdateInvoiceDetails
        value={upinvoiceData}
        onChange={setUpInvoiceData}
      />

      {/* ===== ACTION BAR ===== */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-1 rounded-md bg-blue-600
            px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={12} />
          Add Item
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
      <UpdateInvoiceTable
        products={upproducts}
        setProducts={setUpProducts}
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
